CREATE TABLE users(
    id UUID PRIMARY KEY,
    username VARCHAR(32),
    email VARCHAR(255),
    password_hash CHAR(64)
);

CREATE TABLE inventory(
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id)
);

CREATE TABLE items(
    id UUID PRIMARY KEY,
    item_name VARCHAR(32),
    rarity INTEGER CHECK (rarity >= 0 AND rarity <= 4),
    item_weight INTEGER,
    image_url TEXT
);

CREATE TABLE inventory_items(
    inventory_id UUID REFERENCES inventory(id),
    item_id UUID REFERENCES items(id),
    quantity INTEGER,
    PRIMARY KEY (inventory_id, item_id)
);

CREATE TABLE banners(
    id UUID PRIMARY KEY,
    item_id UUID REFERENCES items(id)
);

CREATE TABLE banner_dates(
    id SERIAL PRIMARY KEY,
    banner_start_date TIMESTAMP,
    banner_end_date TIMESTAMP
);

INSERT INTO users (id, username, email, password_hash) VALUES
('a6b10e9e-65ac-4a51-a184-47c73a06a9f1', 'user1', 'user1@example.com', '1'),
('4f370483-68e1-4d7e-85a2-2f673b2dd5c5', 'user2', 'user2@example.com', '2'),
('2ae5723e-b91a-4325-bf7d-8f27473564e4', 'user3', 'user3@example.com', '3');

INSERT INTO items (id, item_name, rarity, item_weight, image_url) VALUES
('c4e8a1f1-914e-43d0-b116-b7c85d6c6a69', 'Squirtle', 1, 70, '/pokemon/squirtle.jpg'),
('c3a1f2c2-6f47-4c32-96fc-27bbf956daba', 'Wartortle', 2, 35, '/pokemon/wartortle.jpg'),
('7812c73e-7d94-4b42-86d2-9bc1470b76f1', 'Blastoise', 3, 5, '/pokemon/blastoise.jpg');
('e4f4h4i4-8i9o-9p41-4b42-86d2-9bc1470b76f1', 'Mega Blastoise', 4, 1, '/pokemon/blastoise-mega.jpg'),
('f5g5j5k5-2l3m-4n51-4b42-86d2-9bc1470b76f1', 'Charmander', 1, 70, '/pokemon/charmander.jpg'),
('o6p6q6r6-8s9t-0u71-4b42-86d2-9bc1470b76f1', 'Charmeleon', 2, 35, '/pokemon/charmeleon.jpg'),
('v7w7x7y7-3z4a-5b81-4b42-86d2-9bc1470b76f1', 'Charizard', 3, 5, '/pokemon/charizard.jpg'),
('c8d8e8f8-6g7h-9i91-4b42-86d2-9bc1470b76f1', 'Mega Charizard X', 4, 1, '/pokemon/charizard-mega-x.jpg'),
('j9k9l9m9-1n2o-3p01-4b42-86d2-9bc1470b76f1', 'Mega Charizard Y', 4, 1, '/pokemon/charizard-mega-y.jpg'),
('q1r1s1t1-4u5v-6w11-4b42-86d2-9bc1470b76f1', 'Bulbasaur', 1, 70, '/pokemon/bulbasaur.jpg'),
('u2v2w2x2-7y8z-0a21-4b42-86d2-9bc1470b76f1', 'Ivysaur', 2, 35, '/pokemon/ivysaur.jpg'),
('b3c3d3e3-9f0g-1h31-4b42-86d2-9bc1470b76f1', 'Venusaur', 3, 5, '/pokemon/venusaur.jpg'),
('i4j4k4l4-2m3n-5o41-4b42-86d2-9bc1470b76f1', 'Mega Venusaur', 4, 1, '/pokemon/venusaur-mega.jpg');

INSERT INTO inventory (id, user_id) VALUES
('dbeff26d-6a44-4959-8fc8-b0c4652068ff', 'a6b10e9e-65ac-4a51-a184-47c73a06a9f1'),
('7250d159-9d1d-4bbd-bad8-f0b8903087d8', '4f370483-68e1-4d7e-85a2-2f673b2dd5c5'),
('b39d7762-daf2-4f24-b42b-94d49d38315e', '2ae5723e-b91a-4325-bf7d-8f27473564e4');

INSERT INTO inventory_items (inventory_id, item_id, quantity) VALUES
('dbeff26d-6a44-4959-8fc8-b0c4652068ff', 'c3a1f2c2-6f47-4c32-96fc-27bbf956daba', 5),
('7250d159-9d1d-4bbd-bad8-f0b8903087d8', '7812c73e-7d94-4b42-86d2-9bc1470b76f1', 2),
('b39d7762-daf2-4f24-b42b-94d49d38315e', 'c4e8a1f1-914e-43d0-b116-b7c85d6c6a69', 3);

INSERT INTO banners (id, item_id) VALUES
('903e0a0b-f9ff-4544-9c8d-8de9d9342288', 'c3a1f2c2-6f47-4c32-96fc-27bbf956daba'),
('54863b38-f9a3-40cb-8237-c175b9a6be9a', '7812c73e-7d94-4b42-86d2-9bc1470b76f1');

INSERT INTO banner_dates (banner_start_date, banner_end_date) VALUES
('2023-01-01 00:00:00', '2023-01-31 23:59:59'),
('2023-02-01 00:00:00', '2023-02-28 23:59:59');