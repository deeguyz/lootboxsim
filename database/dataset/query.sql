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
('c3a1f2c2-6f47-4c32-96fc-27bbf956daba', 'item1', 2, 10, 'image_url_1'),
('7812c73e-7d94-4b42-86d2-9bc1470b76f1', 'item2', 3, 5, 'image_url_2'),
('c4e8a1f1-914e-43d0-b116-b7c85d6c6a69', 'item3', 1, 15, 'image_url_3');

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

INSERT INTO inventory_items (inventory_id, item_id, quantity)
VALUES ('dbeff26d-6a44-4959-8fc8-b0c4652068ff', '7812c73e-7d94-4b42-86d2-9bc1470b76f1', 2)
ON CONFLICT (inventory_id, item_id)
DO UPDATE SET quantity = 3;