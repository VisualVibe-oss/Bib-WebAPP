const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nevada@2004tajine12',
    database: 'library'
});

con.connect((err) => {
    if (err) {
        console.log("Erreur de connexion", err);
    } else {
        console.log("Connexion réussie");

        // Exécuter la requête pour afficher les tables
        con.query('SHOW TABLES', (err, results) => {
            if (err) {
                console.log("Erreur lors de la récupération des tables", err);
            } else {
                console.log("Tables de la base de données :");
                console.log(results); // Affiche les tables dans la console
            }
        });
    }
});
