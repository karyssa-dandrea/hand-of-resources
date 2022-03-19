const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const HarryPotter = require('../lib/models/HarryPotter');

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

  it('gets list of harry potter characters', async () => {
    const expected = await HarryPotter.findAll();
    const res = await request(app).get('/api/v1/harrypotter');

    expect(res.body).toEqual(expected);
  });

  it('gets harry potter characters by id', async () => {
    const expected = await HarryPotter.findById(1);
    const res = await request(app).get(`/api/v1/harrypotter/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });
});
