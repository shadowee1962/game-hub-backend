import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'worldchat.json');
  const chat = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (req.method === 'GET') {
    return res.status(200).json(chat);
  }

  if (req.method === 'POST') {
    const newMsg = req.body;
    chat.messages.push(newMsg);
    fs.writeFileSync(filePath, JSON.stringify(chat, null, 2));
    return res.status(201).json({ message: "Message sent!" });
  }

  res.status(405).end();
}
