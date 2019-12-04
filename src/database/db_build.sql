BEGIN;

DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS powers CASCADE;

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    talisman VARCHAR(30) NOT NULL,
    battle_cry VARCHAR(200) NOT NULL,
);

CREATE TABLE powers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT NOT NULL,
    image VARBINARY(MAX)
);

INSERT INTO powers (name, description, image) VALUES 
('Electricity', 'Description here...', (SELECT * FROM OPENROWSET(BULK N'C:\img\favicon.png', SINGLE_BLOB))

COMMIT;