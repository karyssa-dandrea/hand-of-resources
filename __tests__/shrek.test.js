const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a shrek character', async () => {
    const expected = {
      name: 'Fiona',
      type: 'ogre',
    };
    const res = await (
      await request(app).post('/api/v1/shrek')
    ).setEncoding(expected);

    expect(res.body).toEqual(expected);
  });
});
