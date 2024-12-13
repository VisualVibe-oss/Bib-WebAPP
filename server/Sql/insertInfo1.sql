use library ; 
-- Insertion des données dans la table Bibliothecaire
INSERT INTO Bibliothecaire (tel, nom, categorie, dateDebut, email, motDePasse)
VALUES
('0612345678', 'Ahmed', 'Principal', '2020-01-01', 'ahmed@example.com', 'password123'),
('0623456789', 'Fatima', 'Stagiaire', '2023-06-15', 'fatima@example.com', 'password456'),
('0634567890', 'Mohammed', 'Principal', '2021-09-10', 'mohammed@example.com', 'password789');

-- Insertion des données dans la table Utilisateur
INSERT INTO Utilisateur (nom, prenom, emailClient, adresseClient, etatClient, Id_bib)
VALUES
('Ali', 'Mohammed', 'ali@example.com', 'Casablanca', 'Actif', 1),
('Sara', 'Bennani', 'sara@example.com', 'Rabat', 'Actif', 2),
('Yassine', 'El Khadraoui', 'yassine@example.com', 'Fès', 'Inactif', 1),
('Nadia', 'Amrani', 'nadia@example.com', 'Tanger', 'Actif', 3);

-- Insertion des données dans la table Document
INSERT INTO Document (anneePublication, nombreExemplaire, editeur, titreDocument, referenceDocument)
VALUES
(2019, 5, 'Hachette', 'Le Petit Prince', 'REF001'),
(2020, 3, 'Gallimard', 'L’étranger', 'REF002'),
(2018, 10, 'Seuil', '1984', 'REF003'),
(2021, 7, 'Fayard', 'La Peste', 'REF004');

-- Insertion des données dans la table Exemplaire
INSERT INTO Exemplaire (dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument)
VALUES
('2021-01-15', 'Très bon', 'En rayon', NULL, NULL, NULL, 1),
('2021-02-10', 'Bon', 'En prêt', 1, '2024-12-01', '2024-12-15', 2),
('2021-03-20', 'Usagé', 'En retard', 2, '2024-11-01', '2024-11-20', 3),
('2021-04-25', 'Endommagé', 'En travaux', NULL, NULL, NULL, 4);

-- Insertion des données dans la table Livre
INSERT INTO Livre (ISBN, auteur, idDocument)
VALUES
('9783161484100', 'Antoine de Saint-Exupéry', 1),
('9782070116746', 'Albert Camus', 2),
('9782253003090', 'George Orwell', 3),
('9782253004004', 'Albert Camus', 4);

-- Insertion des données dans la table Periodique
INSERT INTO Periodique (ISSN, numeroPeriodique, volumePeriodique, idDocument)
VALUES
('12345678', 1, 45, 2),
('23456789', 3, 47, 3),
('34567890', 2, 46, 4);

