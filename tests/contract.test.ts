import { Pact } from '@pact-foundation/pact';
import axios from 'axios';
import path from 'path';

const provider = new Pact({
  consumer: 'UserServiceClient',
  provider: 'UserServiceAPI',
  port: 4002,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info',
});

describe('Pact Contract Test', () => {
  beforeAll(async () => {
    await provider.setup();
    provider.addInteraction({
      state: 'Users exist',
      uponReceiving: 'a request for users',
      withRequest: {
        method: 'GET',
        path: '/api/users',
      },
      willRespondWith: {
        status: 200,
        body: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
      },
    });
  });

  beforeEach(async () => {
    // Reset the state of the users array
    await axios.post('http://localhost:3000/api/reset');
  });

  it('should validate a contract for GET /api/users', async () => {
    const response = await axios.get('http://localhost:3000/api/users');
    expect(response.status).toBe(200);
    expect(response.data).toEqual(
      expect.arrayContaining([{ id: 1, name: 'John Doe', email: 'john@example.com' }])
    );
  });

  afterAll(async () => {
    await provider.finalize();
  });
});
