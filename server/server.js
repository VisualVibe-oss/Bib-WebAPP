const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { listuser,getUserById, listusercat, listuseretat, listuserban, insertuser, insertexemplaire , updateuser,updateExemplaire, deleteuser, nbrcat: getNbrcat ,exmpbyid,searchUsers} = require('./userq');

const app = express();
app.use(cors());
app.use(express.json());

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

        // Start the Express server after successful connection
        app.listen(5000, () => console.log("Server is running on port 5000"));
    }
});

app.get('/api', async (req, res) => {
    try {
        // Appels asynchrones aux fonctions
        const users = await listuser();
        const userparcat = await listusercat();
        const userparetat = await listuseretat();
        const userban = await listuserban();
        const nbrcatData = await getNbrcat();
        // Combiner les résultats dans un seul objet JSON
        res.status(200).json({
            success: true,
            data: {
                users,
                userparcat,
                userparetat,
                userban,
                nbrcat: nbrcatData // Use the renamed variable
            }
        });
    } catch (err) {
        console.error("Error fetching data:", err.message); // Log the error message
        console.error(err.stack); // Log the stack trace
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des données",
        });
    }
});


app.get('/api/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const exemplaires = await exmpbyid(id); // Get the exemplaires data

        res.status(200).json({ success: true, data: exemplaires }); // Send a consistent JSON response
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ success: false, message: "Error fetching data" });
    }
});
// insert into the database

app.post('/api/exemplaire', async (req, res) => {
    try {
        const { dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument } = req.body;

        const result = await insertexemplaire({
            dateAchat,
            etatExemplaire,
            statusExemplaire,
            id_Utilisateur,
            dateDebut,
            dateFin,
            idDocument
        });

        res.status(201).json({
            success: true,
            message: "Exemplaire inserted successfully",
            data: result
        });
    } catch (err) {
        console.error("Error inserting exemplaire:", err.message); // Log the error message
        console.error(err.stack); // Log the stack trace
        res.status(500).json({
            success: false,
            message: "Error inserting exemplaire"
        });
    }
});


app.post('/api/user', async (req, res) => {
    try {
      const { nom, prenom, emailClient, adresseClient, etatClient, categorieClient, Id_bib } = req.body;
  
      const insereru = await insertuser({
        nom,
        prenom,
        emailClient,
        adresseClient,
        etatClient,
        categorieClient,
        Id_bib
      });
  
      if (insereru.success) {
        res.status(201).json(insereru); // Send the success response from insertuser
      } else {
        res.status(500).json(insereru); // Send the error response from insertuser
      }
  
    } catch (err) {
      console.error("Error inserting user:", err.message);
      console.error(err.stack);
      res.status(500).json({
        success: false,
        message: "Error inserting user",
        error: err.message 
      });
    }
  });


// update a user
app.put('/api/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nom, prenom, emailClient, adresseClient, etatClient, categorieClient } = req.body;

        const updateu = await updateuser(id, {
            nom,
            prenom,
            emailClient,
            adresseClient,
            etatClient,
            categorieClient
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updateu
        });
    } catch (err) {
        console.error("Error updating user:", err.message); // Log the error message
        console.error(err.stack); // Log the stack trace
        res.status(500).json({
            success: false,
            message: "Error updating user"
        });
    }
});

app.put('/api/exemplaire/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { dateAchat, etatExemplaire, statusExemplaire, id_Utilisateur, dateDebut, dateFin, idDocument } = req.body;
        
        console.log("Received data for update:", {
            id,
            dateAchat,
            etatExemplaire,
            statusExemplaire,
            id_Utilisateur,
            dateDebut,
            dateFin,
            idDocument
        });

        if (!id) {
            throw new Error('Exemplaire ID is required');
        }

        const result = await updateExemplaire(id, {
            dateAchat,
            etatExemplaire,
            statusExemplaire,
            id_Utilisateur,
            dateDebut,
            dateFin,
            idDocument
        });

        res.status(200).json({
            success: true,
            message: "Exemplaire updated successfully",
            data: result
        });
    } catch (err) {
        console.error("Error updating exemplaire:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Error updating exemplaire",
            error: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// delete a user
app.delete('/api/user/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      const result = await deleteuser(id);
  
      if (result.affectedRows > 0) { 
        res.status(200).json({
          success: true,
          message: "User deleted successfully"
        });
      } else {
        res.status(404).json({ 
          success: false,
          message: "User not found" 
        });
      }
  
    } catch (err) {
      console.error("Error deleting user:", err.message);
      console.error(err.stack);
      res.status(500).json({
        success: false,
        message: "Error deleting user"
      });
    }
  });

  app.get('/api/users/:searchType?/:searchValue?', async (req, res) => {
    try {
        const { searchType, searchValue } = req.params;
        const searchParams = {};

        if (searchType && searchValue) {
            switch (searchType) {
                case 'nom':
                    searchParams.nom = searchValue;
                    break;
                case 'prenom':
                    searchParams.prenom = searchValue;
                    break;
                case 'categorie':
                    searchParams.categorie = searchValue;
                    break;
                case 'etat':
                    searchParams.etat = searchValue;
                    break;
            }
        }

        console.log('Search parameters:', searchParams);
        const users = await searchUsers(searchParams);

        if (!Array.isArray(users)) {
            console.error('Expected an array but got:', users);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: 'Invalid data format'
            });
        }

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        console.error('Error in /api/users:', err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
});



