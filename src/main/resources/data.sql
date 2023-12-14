INSERT INTO company (wkn, name, description, category)
VALUES ('123456', 'Allianz', 'Versicherungsgesellschaft', 'Aktie');

INSERT INTO company (wkn, name, description, category)
VALUES ('987654', 'BASF', 'Chemie Unternehmen', 'Aktie');

INSERT INTO company (wkn, name, description, category)
VALUES ('BTC', 'BITCOIN', 'Kryptowährung', 'Crypto');

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('123456', '2023-11-01', 100, 100);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('123456', '2023-11-02', 200, 200);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('987654', '2023-11-02', 50, 50);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('987654', '2023-11-02', 100, 40);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('987654', '2023-11-03', 200, 30);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('BTC', '2023-11-03', 1, 32000);

INSERT INTO users (name, password, username)
VALUES ('John Doe', 'mypassword', 'john.doe');

INSERT INTO users (name, password, username)
VALUES ('Person 2', 'mypassword', 'jonas');