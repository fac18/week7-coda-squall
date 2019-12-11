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
    hashed_password VARCHAR(50) NOT NULL,
    powers_id INTEGER REFERENCES powers(id),
    talisman VARCHAR(30) NOT NULL,
    battle_cry VARCHAR(200) NOT NULL,
    score INTEGER DEFAULT 0 NOT NULL
);

INSERT INTO powers (name, description, image_path) VALUES
('Electricity', 'Description here...', 'electricity.png'),
('Radiation', 'Description here...', 'radiation.png'),
('Punch', 'Description here...', 'punch.png'),
('Clairvoyance', 'Description here...', 'clairvoyance.png'),
('Telekinesis', 'Description here...', 'telekinesis.png'),
('Shape shifting', 'Description here...', 'shape-shifting.png'),
('Time manipulation', 'Description here...', 'time-manipulation.png');

INSERT INTO characters (name, powers_id, talisman, battle_cry) VALUES
('Travis', '$2a$10$mCNfqtPuPnUv1XsTZNlUku6AB1/6XEypARY5vkL63O2Am7dHZQ7EG', 4, 'golden moustache', 'Your build is not passing');

COMMIT;
