import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const newUser = req.body;
    users.users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return res.status(201).json({ message: "User added!" });
  }

  res.status(405).end();
}
