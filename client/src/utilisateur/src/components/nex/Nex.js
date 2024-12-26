import React, { useState, useEffect } from 'react';
import './Nex.css';

const NewExemplaireModal = ({ onClose, onSave, exemplaire }) => {
    const [newExemplaire, setNewExemplaire] = useState({
        numeroDOrdreExemplaire: '',
        dateAchat: '',
        etatExemplaire: '',
        statusExemplaire: '',
        dateDebut: '',
        dateFin: '',
        idDocument: '',
        id_Utilisateur: ''
    });

    useEffect(() => {
        if (exemplaire) {
            // Format the dates for input fields
            const formattedDates = {
                ...exemplaire,
                dateAchat: exemplaire.dateAchat ? new Date(exemplaire.dateAchat).toISOString().split('T')[0] : '',
                dateDebut: exemplaire.dateDebut ? new Date(exemplaire.dateDebut).toISOString().split('T')[0] : '',
                dateFin: exemplaire.dateFin ? new Date(exemplaire.dateFin).toISOString().split('T')[0] : ''
            };
            setNewExemplaire(formattedDates);
        }
    }, [exemplaire]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExemplaire(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Prepare the data for sending to the server
        const formattedData = {
            numeroDOrdreExemplaire: newExemplaire.numeroDOrdreExemplaire,
            dateAchat: newExemplaire.dateAchat,
            etatExemplaire: newExemplaire.etatExemplaire,
            statusExemplaire: newExemplaire.statusExemplaire,
            id_Utilisateur: parseInt(newExemplaire.id_Utilisateur) || null,
            dateDebut: newExemplaire.dateDebut,
            dateFin: newExemplaire.dateFin,
            idDocument: parseInt(newExemplaire.idDocument) || null
        };

        onSave(formattedData);
    };

    return (
        <div className="new-exemplaire-modal">
            <div className="new-exemplaire-modal-content">
                <div className="new-exemplaire-modal-header">
                    <h2>Modifier Exemplaire</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="new-exemplaire-modal-body">
                    <label>Date d'achat:</label>
                    <input 
                        type="date" 
                        name="dateAchat" 
                        value={newExemplaire.dateAchat} 
                        onChange={handleChange} 
                    /><br />

                    <label>Etat exemplaire:</label>
                    <input 
                        type="text" 
                        name="etatExemplaire" 
                        value={newExemplaire.etatExemplaire} 
                        onChange={handleChange} 
                    /><br />

                    <label>Status exemplaire:</label>
                    <input 
                        type="text" 
                        name="statusExemplaire" 
                        value={newExemplaire.statusExemplaire} 
                        onChange={handleChange} 
                    /><br />

                    <label>Date de Début:</label>
                    <input 
                        type="date" 
                        name="dateDebut" 
                        value={newExemplaire.dateDebut} 
                        onChange={handleChange} 
                    /><br />

                    <label>Date de Fin:</label>
                    <input 
                        type="date" 
                        name="dateFin" 
                        value={newExemplaire.dateFin} 
                        onChange={handleChange} 
                    /><br />

                    <label>ID Document:</label>
                    <input 
                        type="number" 
                        name="idDocument" 
                        value={newExemplaire.idDocument} 
                        onChange={handleChange} 
                    /><br />

                    <label>ID utilisateur:</label>
                    <input 
                        type="number" 
                        name="id_Utilisateur" 
                        value={newExemplaire.id_Utilisateur} 
                        onChange={handleChange} 
                    /><br />
                </div>
                <div className="new-exemplaire-modal-footer">
                    <button onClick={handleSave} className='save'>Save</button>
                    <button onClick={onClose} className='cancel'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewExemplaireModal;