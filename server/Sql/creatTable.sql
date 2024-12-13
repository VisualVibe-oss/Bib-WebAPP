use library ;



-- Table des bibliothécaires
CREATE TABLE Bibliothecaire (
    Id_bib INT AUTO_INCREMENT PRIMARY KEY,
    tel VARCHAR(15) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    categorie ENUM('Stagiaire', 'Principal') NOT NULL,
    dateDebut DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    motDePasse VARCHAR(255) NOT NULL
);

-- Table des utilisateurs
CREATE TABLE Utilisateur (
    id_Utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    emailClient VARCHAR(255) NOT NULL UNIQUE,
    adresseClient TEXT NOT NULL,
    etatClient ENUM('Actif', 'Inactif') NOT NULL,
    Id_bib INT NOT NULL,
    FOREIGN KEY (Id_bib) REFERENCES Bibliothecaire(Id_bib)
);

-- Table des documents
CREATE TABLE Document (
    idDocument INT AUTO_INCREMENT PRIMARY KEY,
    anneePublication YEAR NOT NULL,
    nombreExemplaire INT NOT NULL,
    editeur VARCHAR(255) NOT NULL,
    titreDocument VARCHAR(255) NOT NULL,
    referenceDocument VARCHAR(255) NOT NULL UNIQUE
);

-- Table des exemplaires
CREATE TABLE Exemplaire (
    numeroDordreExemplaire INT AUTO_INCREMENT PRIMARY KEY,
    dateAchat DATE NOT NULL,
    etatExemplaire ENUM('Très bon', 'Bon', 'Usagé', 'Endommagé') NOT NULL,
    statusExemplaire ENUM('En rayon', 'En prêt', 'En retard', 'En réserve', 'En travaux') NOT NULL,
    id_Utilisateur INT,
    dateDebut DATE,
    dateFin DATE,
    idDocument INT NOT NULL,
    FOREIGN KEY (id_Utilisateur) REFERENCES Utilisateur(id_Utilisateur),
    FOREIGN KEY (idDocument) REFERENCES Document(idDocument)
);

-- Table des livres
CREATE TABLE Livre (
    ISBN VARCHAR(13) PRIMARY KEY,
    auteur VARCHAR(255) NOT NULL,
    idDocument INT NOT NULL,
    FOREIGN KEY (idDocument) REFERENCES Document(idDocument)
);

-- Table des périodiques
CREATE TABLE Periodique (
    ISSN VARCHAR(8) PRIMARY KEY,
    numeroPeriodique INT NOT NULL,
    volumePeriodique INT NOT NULL,
    idDocument INT NOT NULL,
    FOREIGN KEY (idDocument) REFERENCES Document(idDocument)
);


