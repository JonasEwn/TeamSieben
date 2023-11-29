INSERT INTO company (wkn, name, description, category)
VALUES ('123456', 'Allianz', 'Versicherungsgesellschaft', 'Aktie');

INSERT INTO company (wkn, name, description, category)
VALUES ('987654', 'BASF', 'Chemie Unternehmen', 'Aktie');

INSERT INTO company (wkn, name, description, category)
VALUES ('BTC', 'BITCOIN', 'Kryptowährung', 'Crypto');

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('123456', CURRENT_DATE, 100, 100);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('123456', CURRENT_DATE, 200, 200);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('987654', CURRENT_DATE, 50, 50);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('987654', CURRENT_DATE, 100, 40);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('987654', CURRENT_DATE, 200, 30);

INSERT INTO item (wkn, purchase_date, quantity, purchase_price)
VALUES ('BTC', CURRENT_DATE, 1, 32000);
