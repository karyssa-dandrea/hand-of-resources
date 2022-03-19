const pool = require('../utils/pool');

module.exports = class HarryPotter {
  id;
  name;
  type;
  patronus;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.patronus = row.patronus;
  }

  static async insert({ name, type, patronus }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
            harrypotter (name, type, patronus)
            VALUES
            ($1, $2, $3)
            RETURNING
            *
            `,
      [name, type, patronus]
    );
    return new HarryPotter(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM harrypotter
      `
    );
    return rows.map((row) => new HarryPotter(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      ' SELECT * FROM harrypotter WHERE id=$1 ',
      [id]
    );
    return new HarryPotter(rows[0]);
  }
};
