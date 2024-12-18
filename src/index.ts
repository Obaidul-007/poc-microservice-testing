import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const port = 3000;

export interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Alice Brown', email: 'alice@example.com' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
];

// GET all users
app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET user by ID
app.get('/api/users/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST add user
app.post('/api/users', (req: Request, res: Response) => {
  const newUser: User = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user by ID
app.put('/api/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Add this route for test purposes only
app.post('/api/reset', (req: Request, res: Response) => {
  users.length = 0; // Clear existing users
  users.push({ id: 1, name: 'John Doe', email: 'john@example.com' }); // Reset to initial state
  res.status(200).send({ message: 'State reset successfully' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
