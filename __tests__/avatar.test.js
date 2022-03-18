const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Avatar = require('../lib/models/Avatar');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a character row', async () => {
    const expected = {
      name: 'Toph',
      abilities: 'earthbending',
    };
    const res = await request(app).post('/api/v1/avatar').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of avatar characters characters', async () => {
    const expected = await Avatar.findAll();
    const res = await request(app).get('/api/v1/avatar');

    expect(res.body).toEqual(expected);
  });

  it('gets an avatar character by id', async () => {
    const expected = await Avatar.findById(1);
    const res = await request(app).get(`/api/v1/avatar/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates an avatar character by id', async () => {
    const initial = {
      id: expect.any(String),
      name: 'Aang',
      abilities: 'all',
    };
    const avatars = await request(app).post('/api/v1/avatar').send(initial);
    const expected = {
      id: expect.any(String),
      name: 'Aang',
      abilities: 'everything',
    };
    const res = await request(app)
      .patch(`/api/v1/avatar/${avatars.body.id}`)
      .send({ abilities: 'everything' });

    expect(res.body).toEqual(expected);
  });

  it('deletes an avatar character by id', async () => {
    const expected = await Avatar.findById(1);
    const res = await request(app).delete(`/api/v1/avatar/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
