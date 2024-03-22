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
('7812c73e-7d94-4b42-86d2-9bc1470b76f1', 'Blastoise', 3, 5, '/pokemon/blastoise.jpg'),
('e4685c3e-6107-4e86-891b-0a2e01f4f2b1', 'Mega Blastoise', 4, 1, '/pokemon/blastoise-mega.jpg'),
('0f2ff3cb-03fb-42d3-a84a-f3c3825c3a3b', 'Charmander', 1, 70, '/pokemon/charmander.jpg'),
('ad2cf94c-3d8c-4bcb-9328-b9f512fb6fa0', 'Charmeleon', 2, 35, '/pokemon/charmeleon.jpg'),
('e120b890-8813-4a91-89a3-8d8a88d71d0d', 'Charizard', 3, 5, '/pokemon/charizard.jpg'),
('8db69c0d-3e1b-4f8a-bc9b-3e8f3725d8bb', 'Mega Charizard X', 4, 1, '/pokemon/charizard-mega-x.jpg'),
('b22200aa-22e4-4311-859b-65a7f43f86dc', 'Mega Charizard Y', 4, 1, '/pokemon/charizard-mega-y.jpg'),
('57a46c39-400b-43a4-89c8-fc3e80a126c7', 'Bulbasaur', 1, 70, '/pokemon/bulbasaur.jpg'),
('a36c2ae8-3eef-4c96-8c1f-92d0f64a758e', 'Ivysaur', 2, 35, '/pokemon/ivysaur.jpg'),
('45aa8eb3-d494-4f21-888a-0f2c6a9fc1d1', 'Venusaur', 3, 5, '/pokemon/venusaur.jpg'),
('a7a08c9d-199d-4be5-a085-177d6d9260fb', 'Mega Venusaur', 4, 1, '/pokemon/venusaur-mega.jpg');

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