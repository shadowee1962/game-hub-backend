import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'privatechat.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (req.method === 'GET') {
    // Get chat between two users: ?chatId=amani_israel
    const { chatId } = req.query;
    if (!chatId) return res.status(400).json({ error: "chatId query param required" });

    const chat = data.privateChats[chatId] || [];
    return res.status(200).json(chat);
  }

  if (req.method === 'POST') {
    const { chatId, sender, text, time } = req.body;

    if (!chatId || !sender || !text) {
      return res.status(400).json({ error: "chatId, sender and text are required" });
    }

    if (!data.privateChats[chatId]) {
      data.privateChats[chatId] = [];
    }

    data.privateChats[chatId].push({ sender, text, time: time || new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(201).json({ message: "Message sent" });
  }

  res.status(405).end(); // Method not allowed
}
