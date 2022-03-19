const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new character', async () => {
    const expected = {
      name: 'Dumbledore',
      type: 'halfblood',
      patronus: 'pheonix',
    };
    const res = await request(app).post('/api/v1/harrypotter').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
