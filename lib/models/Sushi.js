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

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT * FROM sushi
          `
    );
    return rows.map((row) => new Sushi(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT * FROM sushi WHERE id=$1
          `,
      [id]
    );
    return new Sushi(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingSushi = await Sushi.findById(id);
    const { type, raw } = { ...existingSushi, ...attributes };
    const { rows } = await pool.query(
      `
          UPDATE
          sushi
          SET
          type=$1,
          raw=$2
          WHERE
          id=$3
          RETURNING
          *
          `,
      [type, raw, id]
    );
    return new Sushi(rows[0]);
  }
};
