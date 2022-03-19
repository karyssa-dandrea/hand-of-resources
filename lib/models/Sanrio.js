const pool = require('../utils/pool');

module.exports = class Sanrio {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async insert({ name, type }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
            sanrio (name, type)
            VALUES
            ($1, $2)
            RETURNING
            *
            `,
      [name, type]
    );
    return new Sanrio(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT * FROM sanrio
          `
    );
    return rows.map((row) => new Sanrio(row));
  }
};
