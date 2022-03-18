const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sushi = require('../lib/models/Sushi');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates new sushi', async () => {
    const expected = {
      type: 'Hamachi',
      raw: 'yes',
    };
    const res = await request(app).post('/api/v1/sushi').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of all sushi', async () => {
    const expected = await Sushi.findAll();
    const res = await request(app).get('/api/v1/sushi');

    expect(res.body).toEqual(expected);
  });

  it('gets sushi by id', async () => {
    const expected = await Sushi.findById(1);
    const res = await request(app).get(`/api/v1/sushi/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates sushi by id', async () => {
    const initial = {
      id: expect.any(String),
      type: 'Yellowtail',
      raw: 'yes',
    };
    const sushi = await request(app).post('/api/v1/sushi').send(initial);
    const expected = {
      id: expect.any(String),
      type: 'Yellowtail',
      raw: 'no',
    };
    const res = await request(app)
      .patch(`/api/v1/sushi/${sushi.body.id}`)
      .send({ raw: 'no' });

    expect(res.body).toEqual(expected);
  });
});
