const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sanrio = require('../lib/models/Sanrio');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new sanrio member', async () => {
    const expected = {
      name: 'Melody',
      type: 'rabbit',
    };
    const res = await request(app).post('/api/v1/sanrio').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets list of characters', async () => {
    const expected = await Sanrio.findAll();
    const res = await request(app).get('/api/v1/sanrio');

    expect(res.body).toEqual(expected);
  });

  it('gets character by id', async () => {
    const expected = await Sanrio.findById(1);
    const res = await request(app).get(`/api/v1/sanrio/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates character by id', async () => {
    const initial = {
      id: expect.any(String),
      name: 'Kuromi',
      type: 'rabbit',
    };
    const characters = await request(app).post('/api/v1/sanrio').send(initial);
    const expected = {
      id: expect.any(String),
      name: 'Kuromi',
      type: 'kitty',
    };
    const res = await request(app)
      .patch(`/api/v1/sanrio/${characters.body.id}`)
      .send({ type: 'kitty' });

    expect(res.body).toEqual(expected);
  });

  it('deletes characters by id', async () => {
    const expected = await Sanrio.findById(1);
    const res = await request(app).delete(`/api/v1/sanrio/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
