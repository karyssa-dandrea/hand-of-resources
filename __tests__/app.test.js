const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Avatar = require('../lib/models/Avatar');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});

it('creates an avatar character', async () => {
  const expected = {
    name: 'Toph',
    abilities: 'earthbending',
  };
  const res = await (
    await request(app).post('/api/v1/avatar')
  ).setEncoding(expected);

  expect(res.body).toEqual({ id: expect.any(String), ...expected });
});
