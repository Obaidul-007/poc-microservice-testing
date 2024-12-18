import request from 'supertest';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { User } from '../src/index'; 

const app = express();
app.use(bodyParser.json());

// Sample in-memory user data
const users: User[] = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

// Mock routes for testing
app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.post('/api/users', (req: Request, res: Response) => {
  const newUser: User = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

describe('User API Tests', () => {
  it('should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('John Doe');
  });

  it('should add a new user', async () => {
    const newUser = { name: 'Jane Doe', email: 'jane@example.com' };
    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Jane Doe');
    expect(response.body.email).toBe('jane@example.com');
  });
});
