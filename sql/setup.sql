-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS avatar;

CREATE TABLE avatar (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    abilities TEXT NOT NULL
);

INSERT INTO
avatar (name, abilities)
VALUES
('Zuko', 'firebending'),
('Katara', 'waterbending');


DROP TABLE IF EXISTS sushi;

CREATE Table sushi (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    raw TEXT NOT NULL

);

INSERT INTO
sushi (type, raw)
VALUES
('Spicy Tuna', 'yes'),
('Yellowtail', 'yes');