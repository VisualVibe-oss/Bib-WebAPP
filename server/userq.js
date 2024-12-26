const { query } = require('express');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nevada@2004tajine12',
    database: 'library'
});
 
// insert a user
function insertuser({ nom, prenom, emailClient, adresseClient, etatClient, categorieClient, Id_bib }) {
    return con.promise().query(`
      INSERT INTO library.utilisateur (nom, prenom, emailClient, adresseClient, etatClient, categorieClient, Id_bib)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [nom, prenom, emailClient, adresseClient, etatClient, categorieClient, Id_bib])
      .then(([result]) => result)
      .catch(err => {
        console.error("SQL Error:", err.message);
        console.error("SQL Stack Trace:", err.stack);
        throw err;
      });
}


// update a user
function updateuser(id, { nom, prenom, emailClient, adresseClient, etatClient, categorieClient }) {
    return con.promise().query(`
        UPDATE library.Utilisateur
        SET
            nom = ?,
            prenom = ?,
            emailClient = ?,
            adresseClient = ?,
            etatClient = ?,
            categorieClient = ?
        WHERE id_Utilisateur = ?
    `, [nom, prenom, emailClient, adresseClient, etatClient, categorieClient, id])
    .then(([result]) => result)
    .catch(err => { throw err });
}

// delete a user
function deleteuser(id_utilisateur) {
    return con.promise().query(`
        DELETE FROM library.Utilisateur
        WHERE id_Utilisateur = ?
    `, [id_utilisateur])
    .then(([result]) => result)
    .catch(err => { throw err });
}



// delete a user
function exmpbyid(id_Utilisateur) {
    
    return con.promise().query(`
       select 
        numeroDordreExemplaire ,
        dateAchat,
        etatExemplaire ,
        statusExemplaire  ,
        dateDebut,
        dateFin,
        idDocument 
      from
       library.exemplaire
      where
        id_Utilisateur = ?;
    `, [id_Utilisateur])
    .then(([result]) => result)
    .catch(err => { throw err });
}
function listuser() {
    return con.promise().query(`
        SELECT 
            id_Utilisateur AS id_utilisateur,
            nom,
            prenom,
            emailClient AS email,
            adresseClient AS adresse,
            etatClient AS etat,
            categorieClient AS categorie,
            id_bib
        FROM 
            library.utilisateur
    `)
    .then(([result]) => result)
    .catch(err => { throw err });
}

function getUserById(id) {
    return con.promise().query(`
        SELECT 
            id_Utilisateur AS id_utilisateur,
            nom,
            prenom,
            emailClient AS email,
            adresseClient AS adresse,
            etatClient AS etat,
            categorieClient AS categorie,
            id_bib
        FROM 
            library.utilisateur
        WHERE 
            id_Utilisateur = ?
    `, [id])
    .then(([result]) => result)
    .catch(err => { throw err });
}

// nbr of users by 'categorie'
function listusercat()
{
    return con.promise().query(`
        SELECT 
            categorieClient , count(id_Utilisateur) as nbr_user  
        FROM 
            library.utilisateur 
        group by 
            categorieClient 
     `)
     .then(([result]) => result)
     .catch(err => { throw err });
}
// nbr of users by 'etat'
function listuseretat()
{
    return con.promise().query(`
        SELECT 
            etatClient , count(id_Utilisateur) as nbr_user  
        FROM 
            library.utilisateur 
        group by 
            etatClient;
     `)
     .then(([result]) => result)
     .catch(err => { throw err });
}
//list of the users who they are banned from the app
function listuserban()
{
    return con.promise().query(`
        SELECT 
            id_Utilisateur AS id,
            nom,
            prenom,
            etatClient AS etat_du_client
        FROM
            utilisateur
        WHERE
            etatClient = 'Bloque'
                `)
                .then(([rows]) => rows) 
                .catch(err => { throw err });
}

function nbrcat()
{
    return con.promise().query(`
        select 
            categorieClient , 
            count(id_Utilisateur) as nbr_utilisatuer
        from 
            utilisateur 
        group by 
            categorieClient;
                `)
                .then(([rows]) => rows) 
                .catch(err => { throw err });
}


function insertexemplaire({ dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument }) {
    return con.promise().query(`
      INSERT INTO library.exemplaire (dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut || null, dateFin || null, idDocument])
    .then(([rows]) => rows) 
    .catch(err => { throw err });
  }

function updateExemplaire(id, { dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument }) {
    return con.promise().query(`
      UPDATE library.exemplaire
      SET
        dateAchat = ?,
        etatExemplaire = ?,
        statusExemplaire = ?,
        id_Utilisateur = ?,
        dateDebut = ?,
        dateFin = ?,
        idDocument = ?
      WHERE numeroDordreExemplaire = ?
    `, [dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut || null, dateFin || null, idDocument, id])
    .then(([result]) => result)
    .catch(err => { throw err });
}
  

async function searchUsers(query) {
    try {
        let sql = `
            SELECT
                id_Utilisateur AS id_utilisateur,
                nom,
                prenom,
                emailClient AS email,
                adresseClient AS adresse,
                etatClient AS etat,
                categorieClient AS categorie
            FROM
                library.utilisateur
            WHERE 1=1
        `;
        const queryParams = [];

        if (query.nom) {
            sql += " AND LOWER(nom) LIKE LOWER(?)";
            queryParams.push(`%${query.nom}%`);
        }
        if (query.prenom) {
            sql += " AND LOWER(prenom) LIKE LOWER(?)";
            queryParams.push(`%${query.prenom}%`);
        }
        if (query.categorie) {
            sql += " AND LOWER(categorieClient) LIKE LOWER(?)";
            queryParams.push(`%${query.categorie}%`);
        }
        if (query.etat) {
            // Use exact match for etat with case-insensitive comparison
            sql += " AND LOWER(etatClient) = LOWER(?)";
            queryParams.push(query.etat);
        }

        console.log('Final SQL:', sql);
        console.log('Query parameters:', queryParams);
        
        const [result] = await con.promise().query(sql, queryParams);
        return Array.isArray(result) ? result : [];
    } catch (err) {
        console.error("Error in searchUsers:", err);
        throw err;
    }
}


module.exports={
    insertuser,
    insertexemplaire,
    updateuser,
    deleteuser,
    listuser,
    searchUsers,
    getUserById,
    listusercat,
    listuseretat,
    listuserban,
    nbrcat,
    exmpbyid,
    updateExemplaire
}