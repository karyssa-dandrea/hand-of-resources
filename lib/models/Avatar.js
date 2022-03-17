const pool = require('../utils/pool');

module.exports = class Avatar {
  id;
  name;
  abilities;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.abilities = row.abilities;
  }

  static async insert({ name, abilities }) {
    const { rows } = await pool.query(
      ` INSERT INTO
       avatar (name, abilities)
       VALUES
       ($1, $2)
       RETURNING
       *
        `,
      [name, abilities]
    );
    return new Avatar(rows[0]);
  }
};
