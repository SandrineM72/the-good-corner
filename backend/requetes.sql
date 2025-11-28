CREATE TABLE adscategory(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryname VARCHAR(20) NOT NULL
);

CREATE TABLE ads(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    price REAL NOT NULL,
    picture VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    creationdate DATE DEFAULT CURRENT_DATE,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES adscategory(id)
);

CREATE TABLE tags(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE ads_to_tags (
    ads_id INTEGER,
    tags_id INTEGER,
    FOREIGN KEY (ads_id) REFERENCES ads(id),
    FOREIGN KEY (tags_id) REFERENCES tags(id),
    PRIMARY KEY (ads_id, tags_id)
);


INSERT INTO ads (title, price, picture, city, description, category_id) VALUES 
('RENAULT 5', 2000, 'R5.jpg', 'Paris 12', 'Excellent état, 1995', 1),
('RENAULT 19', 1000, NULL, 'Paris 10', 'Très bon état, 1996', 1),
('PEUGEOT 205', 2500, NULL, 'Paris 09', 'Excellent état, 1992', 1),
('FORD FIESTA', 500, NULL, 'Paris 20', 'Pour pièces, 1990', 1),
('RENAULT TWINGO', 3000, NULL, 'Paris 12', 'Excellent état, 1995', 1),
('OPEN CORSA', 1000, NULL, 'Paris 20', 'Etat moyen, 1991', 1);


INSERT INTO adscategory (categoryname) VALUES 
('Renault vintage'),
('Peugeot vintage'),
('Opel vintage'),
('Ford vintage');

INSERT INTO tags (name) VALUES
('CT à vérifier'),
('Faire offre');

INSERT INTO ads_to_tags (ads_id, tags_id) VALUES
(1,1),
(2,2),
(4,1),
(5,1),
(5,2),
(6,2);



DROP TABLE ads_to_tags;

SELECT * FROM ads;

# Requête pour récupérer toutes les annonces d'une catégorie

SELECT a.title, c.categoryname AS 'categoryname'
FROM ads as a 
JOIN adscategory AS c 
ON a.category_id = c.id 
WHERE c.categoryname = 'Renault vintage';


# Requête pour afficher toutes les annonces avec leurs nombres de tags

SELECT a.title, count(t.id) as 'nb tags'
FROM ads AS a
LEFT JOIN ads_to_tags AS att ON a.id = att.ads_id
LEFT JOIN TAGS as t ON t.id = att.tags_id
GROUP BY a.id;

SELECT * FROM ads_to_tags;

