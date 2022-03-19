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

  static async findById(id) {
    const { rows } = await pool.query(' SELECT * FROM sanrio WHERE id=$1 ', [
      id,
    ]);
    return new Sanrio(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingCharacter = await Sanrio.findById(id);
    const updatedAttributes = { ...existingCharacter, ...attributes };
    const { name, type } = updatedAttributes;
    const { rows } = await pool.query(
      `
          UPDATE
          sanrio
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
    return new Sanrio(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
          sanrio
          WHERE
          id=$1
          RETURNING
          *
          `,
      [id]
    );
    return new Sanrio(rows[0]);
  }
};
