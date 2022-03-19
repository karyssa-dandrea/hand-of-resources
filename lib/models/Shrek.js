const pool = require('../utils/pool');

module.exports = class Shrek {
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
      ` INSERT INTO
            shrek (name, type)
            VALUES
            ($1, $2)
            RETURNING
            *
          `,
      [name, type]
    );
    return new Shrek(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT * FROM shrek
          `
    );
    return rows.map((row) => new Shrek(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(' SELECT * FROM shrek WHERE id=$1', [id]);
    return new Shrek(rows[0]);
  }

  static async updateById(id, attributes) {
    const exisitingCharacters = await Shrek.findById(id);
    const updatingAttributes = { ...exisitingCharacters, ...attributes };
    const { name, type } = updatingAttributes;
    const { rows } = await pool.query(
      `
          UPDATE
          shrek
          SET
          name=$1,
          type=$2
          WHERE
          id=$3
          RETURNING
          *
          `,
      [name, type, id]
    );
    return new Shrek(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
          shrek
          WHERE
          id=$1
          RETURNING
          *
          `,
      [id]
    );
    return new Shrek(rows[0]);
  }
};
