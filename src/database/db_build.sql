BEGIN;

DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS powers CASCADE;


CREATE TABLE powers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(30)
);

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    powers_id INTEGER REFERENCES powers(id),
    talisman VARCHAR(30) NOT NULL,
    battle_cry VARCHAR(200) NOT NULL
);

INSERT INTO powers (name, description, image_path) VALUES 
('Electricity', 'Description here...', 'electricity.png'),
('Radiation', 'Description here...', 'radiation.png'),
('Punch', 'Description here...', 'punch.png'),
('Clairvoyant', 'Description here...', 'clairvoyant.png'),
('Telekinesis', 'Description here...', 'telekinesis.png'),
('Shape shifting', 'Description here...', 'shape-shifting.png'),
('Time manipulation', 'Description here...', 'time-manipulation.png');

COMMIT;