-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS avatar;

CREATE TABLE avatar (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    abilities TEXT NOT NULL,
);

INSERT INTO
avatar (name, abilities, ethnicity)
VALUES
('Zuko', 'firebending'),
('Katara', 'waterbending')