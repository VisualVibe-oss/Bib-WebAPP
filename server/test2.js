const { query } = require('express');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nevada@2004tajine12',
    database: 'library'
});


//* Nombre des exemplaire emprainter cette semain 
//!  a rendre reutilisable pour une semaine choisie 

function doEmpSem() {
    
    return con.promise().query(`
        
    SELECT 
        COUNT(e.numeroDordreExemplaire) AS nombre_exemplaires_empruntes,
        YEAR(e.dateDebut) AS annee,
        WEEK(e.dateDebut) AS semaine
    FROM 
        Exemplaire e
    JOIN 
        Document d ON e.idDocument = d.idDocument
    JOIN 
        Utilisateur u ON e.id_Utilisateur = u.id_Utilisateur
    WHERE 
        e.statusExemplaire = 'En prêt'
        AND e.dateDebut BETWEEN 
            CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY 
            AND CURDATE() + INTERVAL (6 - WEEKDAY(CURDATE())) DAY
    GROUP BY 
        YEAR(e.dateDebut), WEEK(e.dateDebut)
    ORDER BY 
        annee, semaine;
`)  
        .then(([rows]) => rows) 
        .catch(err => { throw err });  
}




//*  Nombre des emprunte dans un le dernier moix
//! a rendre reutilisable 


function doEmpMois(){
    return con.promise().query(`
SELECT 
    COUNT(e.numeroDordreExemplaire) AS nombre_exemplaires_empruntes,
    MONTH(e.dateDebut) AS mois,
    YEAR(e.dateDebut) AS annee
FROM 
    Exemplaire e
JOIN 
    Document d ON e.idDocument = d.idDocument
JOIN 
    Utilisateur u ON e.id_Utilisateur = u.id_Utilisateur
WHERE 
    e.statusExemplaire = 'En prêt'
    AND MONTH(e.dateDebut) = MONTH(CURDATE())  -- Mois actuel
    AND YEAR(e.dateDebut) = YEAR(CURDATE())  -- Année actuelle
GROUP BY 
    MONTH(e.dateDebut), YEAR(e.dateDebut)
ORDER BY 
    annee, mois;

        `)
        .then(([rows]) => rows) 
        .catch(err => { throw err });       
}






//* Liste des bibliothecaire 

function employeeList(){
    return con.promise().query(`
SELECT 
    b.Id_bib AS id_employe,
    b.nom AS nom_employe,
    b.categorie AS role
FROM 
    Bibliothecaire b;

        `)
        .then(([rows]) => rows) 
        .catch(err => { throw err });   
}




//* les utilisateur dont la date fin d emprunt a depasse la date actuelle


function getutiEmpr(){
    return con.promise().query(`
SELECT 
    u.id_Utilisateur AS id_utilisateur,
    u.nom AS nom_utilisateur,
    u.prenom AS prenom_utilisateur,
    e.numeroDordreExemplaire AS numero_exemplaire,
    DATEDIFF(CURDATE(), e.dateFin) AS jours_retard
FROM 
    Exemplaire e
JOIN 
    Utilisateur u ON e.id_Utilisateur = u.id_Utilisateur
WHERE 
    e.statusExemplaire = 'En retard'
    AND e.dateFin < CURDATE();  -- Date de fin dépassée par rapport à la date actuelle

        `)
        .then(([rows]) => rows) 
        .catch(err => { throw err });   
}

// retoure le nbr des utilisateurs par categorie 
function nbrucat()
{
    return con.promise().query(`
        select count(id_Utilisateur) from utilisateur group by categorieClient;
                `)
                .then(([rows]) => rows) 
                .catch(err => { throw err });
}



function nbruserban()
{
    return con.promise().query(`
        SELECT 
            count(id_Utilisateur)
        FROM
            utilisateur
        WHERE
            etatClient = 'Inactif'
        order by 
            nom ;
                `)
                .then(([rows]) => rows) 
                .catch(err => { throw err });
}

// modifier les infos d'un element d'une table par id 


function updateBib(id, { tel, nom, categorie, dateDebut, email }) {
    return con.promise().query(`
        UPDATE Bibliothecaire
        SET 
            tel = ?,
            nom = ?,
            categorie = ?,
            dateDebut = ?,
            email = ?
        WHERE Id_bib = ?
    `, [tel, nom, categorie, dateDebut, email, id])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function updateDoc(id, { anneePublication, nombreExemplaire, editeur, titreDocument, referenceDocument }) {
    return con.promise().query(`
        UPDATE Document
        SET 
            anneePublication = ?,
            nombreExemplaire = ?,
            editeur = ?,
            titreDocument = ?,
            referenceDocument = ?
        WHERE idDocument = ?
    `, [anneePublication, nombreExemplaire, editeur, titreDocument, referenceDocument, id])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function updateExemp(id, { dateAchat, etatExemplaire, statusExemplaire, dateDebut, dateFin }) {
    return con.promise().query(`
        UPDATE Exemplaire
        SET 
            dateAchat = ?,
            etatExemplaire = ?,
            statusExemplaire = ?,
            dateDebut = ?,
            dateFin = ?
        WHERE numeroDordreExemplaire = ?
    `, [dateAchat, etatExemplaire, statusExemplaire, dateDebut, dateFin, id])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function updateLivre(isbn, { auteur }) {
    return con.promise().query(`
        UPDATE Livre
        SET 
            auteur = ?
        WHERE ISBN = ?
    `, [auteur, isbn])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function updatePer(issn, { numeroPeriodique, volumePeriodique }) {
    return con.promise().query(`
        UPDATE Periodique
        SET 
            numeroPeriodique = ?,
            volumePeriodique = ?
        WHERE ISSN = ?
    `, [numeroPeriodique, volumePeriodique, issn])
    .then(([result]) => result)
    .catch(err => { throw err });
}

//les fonctions de suppression par id

function deleteBib(id_bib) {
    return con.promise().query(`
        DELETE FROM Bibliothecaire
        WHERE Id_bib = ?
    `, [id_bib])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function deleteDoc(id_document) {
    return con.promise().query(`
        DELETE FROM Document
        WHERE idDocument = ?
    `, [id_document])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function deleteExemp(numero_dordre_exemplaire) {
    return con.promise().query(`
        DELETE FROM Exemplaire
        WHERE numeroDordreExemplaire = ?
    `, [numero_dordre_exemplaire])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function deleteLi(isbn) {
    return con.promise().query(`
        DELETE FROM Livre
        WHERE ISBN = ?
    `, [isbn])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function deletePer(issn) {
    return con.promise().query(`
        DELETE FROM Periodique
        WHERE ISSN = ?
    `, [issn])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function insertBib({ tel, nom, categorie, dateDebut, email, motDePasse }) {
    return con.promise().query(`
        INSERT INTO Bibliothecaire (tel, nom, categorie, dateDebut, email, motDePasse)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [tel, nom, categorie, dateDebut, email, motDePasse])
    .then(([result]) => result)
    .catch(err => { throw err });
}



function insertDoc({ anneePublication, nombreExemplaire, editeur, titreDocument, referenceDocument }) {
    return con.promise().query(`
        INSERT INTO Document (anneePublication, nombreExemplaire, editeur, titreDocument, referenceDocument)
        VALUES (?, ?, ?, ?, ?)
    `, [anneePublication, nombreExemplaire, editeur, titreDocument, referenceDocument])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function insertExemp({ dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument }) {
    return con.promise().query(`
        INSERT INTO Exemplaire (dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function insertLi({ ISBN, auteur, idDocument }) {
    return con.promise().query(`
        INSERT INTO Livre (ISBN, auteur, idDocument)
        VALUES (?, ?, ?)
    `, [ISBN, auteur, idDocument])
    .then(([result]) => result)
    .catch(err => { throw err });
}

function insertPer({ ISSN, numeroPeriodique, volumePeriodique, idDocument }) {
    return con.promise().query(`
        INSERT INTO Periodique (ISSN, numeroPeriodique, volumePeriodique, idDocument)
        VALUES (?, ?, ?, ?)
    `, [ISSN, numeroPeriodique, volumePeriodique, idDocument])
    .then(([result]) => result)
    .catch(err => { throw err });
}

doEmpSem()
    .then(result => {
        console.log(result)  // Affiche les livres récupérés
    })
    .catch(err => {
        
    });




module.exports = {
        doEmpSem,
        doEmpMois,
        employeeList,
        getutiEmpr,
        nbrucat,
        userban,
        nbruserban,
    // update
        updateBib,
        updateDoc,
        updateExemp,
        updateLivre,
        updatePer,
    // delete
        deleteBib,
        deleteDoc,
        deleteExemp,
        deleteLi,
        deletePer,
    // insert
        insertBib,
        insertDoc,
        insertExemp,
        insertLi,
        insertPer
};