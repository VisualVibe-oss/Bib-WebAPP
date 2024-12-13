use library ; 

-- Insertion des données dans la table Bibliothecaire
INSERT INTO Bibliothecaire (tel, nom, categorie, dateDebut, email, motDePasse)
VALUES
('0645678901', 'Imane', 'Principal', '2019-05-10', 'imane@example.com', 'password101'),
('0656789012', 'Mouad', 'Stagiaire', '2023-01-20', 'mouad@example.com', 'password202');


-- Insertion des données dans la table Utilisateur
INSERT INTO Utilisateur (nom, prenom, emailClient, adresseClient, etatClient, Id_bib)
VALUES
('Rachid', 'Brahim', 'rachid@example.com', 'Marrakech', 'Actif', 1),
('Leila', 'Sami', 'leila@example.com', 'Agadir', 'Inactif', 2),
('Omar', 'Tariq', 'omar@example.com', 'Oujda', 'Actif', 3);


-- Insertion des données dans la table Document
INSERT INTO Document (anneePublication, nombreExemplaire, editeur, titreDocument, referenceDocument)
VALUES
(2022, 4, 'Albin Michel', 'Le Comte de Monte-Cristo', 'REF005'),
(2023, 6, 'Pocket', 'Les Misérables', 'REF006');

-- Insertion des données dans la table Exemplaire
INSERT INTO Exemplaire (dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument)
VALUES
('2022-06-10', 'Très bon', 'En rayon', NULL, NULL, NULL, 5),
('2022-07-15', 'Bon', 'En prêt', 3, '2024-12-10', '2024-12-24', 6);


-- Insertion des données dans la table Livre
INSERT INTO Livre (ISBN, auteur, idDocument)
VALUES
('9782253004011', 'Alexandre Dumas', 5),
('9782070135277', 'Victor Hugo', 6);


-- Insertion des données dans la table Periodique
INSERT INTO Periodique (ISSN, numeroPeriodique, volumePeriodique, idDocument)
VALUES
('45678901', 4, 48, 5),
('56789012', 2, 50, 6);
