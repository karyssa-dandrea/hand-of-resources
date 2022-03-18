const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Shrek = require('../lib/models/Shrek');

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
    const res = await request(app).post('/api/v1/shrek').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets list of shrek characters', async () => {
    const expected = await Shrek.findAll();
    const res = await request(app).get('/api/v1/shrek');

    expect(res.body).toEqual(expected);
  });

  it('gets a shrek character by id', async () => {
    const expected = await Shrek.findById(1);
    const res = await request(app).get(`/api/v1/shrek/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates shrek character by id', async () => {
    const initial = {
      id: expect.any(String),
      name: 'Shrek',
      type: 'ogre',
    };
    const shrekChar = await request(app).post('/api/v1/shrek').send(initial);
    const expected = {
      id: expect.any(String),
      name: 'Shrek',
      type: 'monster',
    };
    const res = await request(app)
      .patch(`/api/v1/shrek/${shrekChar.body.id}`)
      .send({ type: 'monster' });

    expect(res.body).toEqual(expected);
  });
});
