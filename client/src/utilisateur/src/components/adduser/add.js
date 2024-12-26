import React, { useState } from 'react';
import './add.css';

const InputModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    emailClient: '',
    adresseClient: '',
    etatClient: 'pasBloque',
    categorieClient: 'occasionnel',
    Id_bib: 1, 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom) {
      alert("Please enter a Nom.");
      return; 
    }

    try {
      console.log('Form data being sent:', formData);

      const response = await fetch('api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log('Success:', result);
        alert("User added successfully!");
        onClose(); 
      } else {
        console.error('Error:', result);
        alert(`Error: ${result.message || 'Failed to add user'}`);
      }
    } catch (err) {
      console.error("Error inserting user:", err);
      alert("Failed to add user. Please check the console for details.");
    }
  };

  return (
    <div className="add">
      <div className="add-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Enter Data</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom:</label>
          <input 
            type="text" 
            id="nom" 
            name="nom" 
            value={formData.nom} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="prenom">Prenom:</label>
          <input 
            type="text" 
            id="prenom" 
            name="prenom" 
            value={formData.prenom} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="emailClient">Email:</label>
          <input 
            type="email" 
            id="emailClient" 
            name="emailClient" 
            value={formData.emailClient} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="adresseClient">Adresse:</label>
          <input 
            type="text" 
            id="adresseClient" 
            name="adresseClient" 
            value={formData.adresseClient} 
            onChange={handleChange} 
          />

          <label htmlFor="etatClient">Etat:</label>
          <select 
            id="etatClient" 
            name="etatClient" 
            value={formData.etatClient} 
            onChange={handleChange}
          >
            <option value="pasBloque">pasBloque</option>
            <option value="bloque">bloque</option>
          </select>

          <label htmlFor="categorieClient">categorie:</label>
          <select 
            id="categorieClient" 
            name="categorieClient" 
            value={formData.categorieClient} 
            onChange={handleChange}
          >
            <option value="occasionnel">occasionnel</option>
            <option value="abonnes">abonnes</option>
            <option value="privilige">privilige</option>
          </select>

          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
};

const AddUser = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <button className="open-modal-button" onClick={() => setShowModal(true)}>
        Add a User
      </button>
      {showModal && <InputModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AddUser;