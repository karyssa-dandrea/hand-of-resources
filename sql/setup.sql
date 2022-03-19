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

DROP TABLE IF EXISTS shrek;

CREATE TABLE shrek (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL

);

INSERT INTO
shrek (name, type)
VALUES
('Gingy', 'gingerbread'),
('Shrek', 'ogre');

DROP TABLE IF EXISTS sanrio;

CREATE TABLE sanrio (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL
);

INSERT INTO
sanrio (name, type)
VALUES
('Kuromi', 'rabbit'),
('Keroppi', 'frog');