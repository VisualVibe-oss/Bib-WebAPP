import React from 'react';
import './Modal.css';

const Modal = ({ onClose, title, onUpdate, updatedData, setUpdatedData, isEditing, onNewButton }) => {
    const handleChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    if (!updatedData) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <p>(for bib only)</p>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <label htmlFor="id_utilisateur">ID:</label>
                    <input type="text" id="id_utilisateur" name="id_utilisateur" value={updatedData.id_utilisateur} readOnly /><br />
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" id="nom" name="nom" value={updatedData.nom || ''} onChange={handleChange} disabled={!isEditing} /><br />
                    <label htmlFor="prenom">Prenom:</label>
                    <input type="text" id="prenom" name="prenom" value={updatedData.prenom || ''} onChange={handleChange} disabled={!isEditing} /><br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={updatedData.email || ''} onChange={handleChange} disabled={!isEditing} /><br />
                    <label htmlFor="adresse">Adresse:</label>
                    <input type="text" id="adresse" name="adresse" value={updatedData.adresse || ''} onChange={handleChange} disabled={!isEditing} /><br />
                    <label htmlFor="etat">Etat:</label>
                    <input type="text" id="etat" name="etat" value={updatedData.etat || ''} onChange={handleChange} disabled={!isEditing} /><br />
                    <label htmlFor="categorie">Categorie:</label>
                    <input type="text" id="categorie" name="categorie" value={updatedData.categorie || ''} onChange={handleChange} disabled={!isEditing} /><br />
                    <div className="exemplaires-container">
                        <h2>Exemplaires empruntés</h2>
                        {updatedData.exemplaires && updatedData.exemplaires.length > 0 ? (
                            updatedData.exemplaires.map((exemplaire) => (
                                <div key={exemplaire.numeroDOrdreExemplaire} className="exemplaire-item">
                                    <label>Numéro:</label><span>{exemplaire.numeroDordreExemplaire}</span><br />
                                    <label>Date_ach:</label><span>{exemplaire.dateAchat}</span><br />
                                    <label>Etat :</label><span>{exemplaire.etatExemplaire}</span><br />
                                    <label>Status :</label><span>{exemplaire.statusExemplaire}</span><br />
                                    <label>Date_D:</label><span>{exemplaire.dateDebut}</span><br />
                                    <label>Date_F:</label><span>{exemplaire.dateFin}</span><br />
                                    <label>ID_Doc:</label><span>{exemplaire.idDocument}</span><br />
                                </div>
                            ))
                        ) : (
                            <p>Aucun exemplaire emprunté.</p>
                        )}
                    </div>
                </div>
                <div className="modal-footer">
                    {isEditing ? (
                        <button className="save-button" onClick={onUpdate}>Save</button>
                    ) : (
                        <button className="update-button" onClick={onUpdate}>Update</button>
                    )}
                    <button className="addex" onClick={onNewButton}>New book</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;