const pool = require('../utils/pool');

module.exports = class Sushi {
  id;
  type;
  raw;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.raw = row.raw;
  }

  static async insert({ type, raw }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
          sushi (type, raw)
          VALUES
          ($1, $2)
          RETURNING
          *
          `,
      [type, raw]
    );
    return new Sushi(rows[0]);
  }
};
