import React, { useState, useEffect } from 'react';
import './list.css';
import Modal from '../model/Modal';
import NewExemplaireModal from '../nex/Nex';
import Header from '../header/header';

const MyComponent = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [allUtilisateurs, setAllUtilisateurs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isNewExemplaireModalOpen, setIsNewExemplaireModalOpen] = useState(false);
    const [exemplaireToEditId, setExemplaireToEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users data
    useEffect(() => {
        const fetchUtilisateurs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.success) {
                    setAllUtilisateurs(result.data.users || []);
                    setUtilisateurs(result.data.users || []);
                } else {
                    setError(result.message || "Failed to fetch users.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users. Please check your network connection.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUtilisateurs();
    }, []);

    // Handle search
    const handleSearch = async (searchValues) => {
        try {
            const searchParams = new URLSearchParams();
    
            Object.entries(searchValues).forEach(([key, value]) => {
                if (value && value.toString().trim() !== '') {
                    searchParams.append(key, value.toString().trim());
                }
            });
    
            // If all search values are empty, reset to all utilisateurs
            if (!searchParams.toString()) {
                setUtilisateurs(allUtilisateurs);
                return;
            }
    
            let url = '/api';
            if (searchParams.toString()) {
                const searchType = Object.keys(searchValues)[0];
                const searchValue = searchValues[searchType];
                url = `/api/users/${searchType}/${searchValue}`;
            }
    
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            if (result.success) {
                setUtilisateurs(Array.isArray(result.data) ? result.data : []);
            } else {
                setError(result.message || "Failed to fetch users.");
                setUtilisateurs([]);
            }
        } catch (error) {
            console.error("Error in search:", error);
            setError("Failed to search users. Please check your network connection.");
            setUtilisateurs([]);
        }
    };

    // Handle search by ID
    const handleSearchById = async (id) => {
        if (id === '') {
            setUtilisateurs(allUtilisateurs);
            return;
        }

        try {
            const response = await fetch(`/api/user/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            if (result.success) {
                setUtilisateurs([result.data]);
            } else {
                setError(result.message || "Failed to fetch user by ID.");
            }
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            setError("Failed to fetch user by ID. Please check your network connection.");
        }
    };

    // Handle user click
    const handleUtilisateurClick = async (utilisateur) => {
        try {
            const userId = parseInt(utilisateur.id_utilisateur);
            const response = await fetch(`/api/${userId}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP Error ${response.status}:`, errorText);
                throw new Error(`HTTP Error ${response.status}: ${errorText}`);
            }

            const result = await response.json();

            if (result.success) {
                setModalData({ ...utilisateur, exemplaires: result.data });
                setUpdatedData({ ...utilisateur, exemplaires: result.data });
                setIsModalOpen(true);
                setIsEditing(false);
            } else {
                console.error("API returned success: false:", result.message);
                alert("Failed to fetch exemplaires (success: false). Check console.");
            }
        } catch (error) {
            console.error("Error in handleUtilisateurClick:", error);
            alert("Error fetching exemplaires. Check console.");
        }
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalData(null);
        setUpdatedData({});
        setIsEditing(false);
    };

    // Handle update
    const handleUpdate = async () => {
        if (modalData && isEditing) {
            try {
                const updatedUserData = {
                    nom: updatedData.nom,
                    prenom: updatedData.prenom,
                    emailClient: updatedData.email,
                    adresseClient: updatedData.adresse,
                    etatClient: updatedData.etat,
                    categorieClient: updatedData.categorie
                };

                const response = await fetch(`/api/user/${modalData.id_utilisateur}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedUserData),
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setUtilisateurs(utilisateurs.map(user =>
                            user.id_utilisateur === modalData.id_utilisateur ? { ...user, ...updatedData } : user
                        ));
                        setAllUtilisateurs(allUtilisateurs.map(user =>
                            user.id_utilisateur === modalData.id_utilisateur ? { ...user, ...updatedData } : user
                        ));
                        handleCloseModal();
                    } else {
                        console.error('Error updating user:', result.message);
                        alert(`Error updating user: ${result.message}`);
                    }
                } else {
                    const errorText = await response.text();
                    console.error('Error updating user:', response.status, errorText);
                    alert(`Error updating user: ${response.status} - ${errorText}`);
                }
            } catch (error) {
                console.error("Error updating user:", error);
                alert("Failed to update user. Check console for details.");
            }
        } else {
            setIsEditing(true);
        }
    };

    // Handle new button
    const handleNewButton = () => {
        const exemplaireId = prompt("Enter the ID of the exemplaire to modify:");
        if (exemplaireId) {
            setExemplaireToEditId(exemplaireId);
            setIsNewExemplaireModalOpen(true);
        }
    };

    // Close new exemplaire modal
    const handleCloseNewExemplaireModal = () => {
        setIsNewExemplaireModalOpen(false);
        setExemplaireToEditId(null);
    };

    // Handle save new exemplaire
    const handleSaveNewExemplaire = async (newExemplaireData) => {
        try {
            if (!exemplaireToEditId) {
                console.error("No Exemplaire ID to update!");
                alert("An error occurred. No Exemplaire ID found.");
                return;
            }

            const url = `/api/exemplaire/${exemplaireToEditId}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExemplaireData),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    console.log('Exemplaire updated successfully:', result.data);
                    handleCloseNewExemplaireModal();
                    handleCloseModal();
                } else {
                    console.error('Error updating exemplaire:', result.message);
                    alert(`Error updating exemplaire: ${result.message}`);
                }
            } else {
                const errorText = await response.text();
                console.error('Error updating exemplaire:', response.status, errorText);
                alert(`Error updating exemplaire: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error updating exemplaire:", error);
            alert("Failed to update exemplaire. Check console for details.");
        }
    };

    // Loading and error handling
    if (isLoading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="todo-list">
            <Header onSearch={handleSearch} onSearchById={handleSearchById} />
            <ul>
                {utilisateurs &&
                    utilisateurs.map((user) => (
                        <li key={user.id_utilisateur}>
                            <button onClick={() => handleUtilisateurClick(user)} className="todo-button">
                                {user.id_utilisateur} - {user.nom} {user.prenom} {"----"} {user.categorie} {"----"} {user.etat}
                            </button>
                        </li>
                    ))}
            </ul>
            {isModalOpen && modalData && (
                <Modal
                    onClose={handleCloseModal}
                    title={`${modalData.nom} ${modalData.prenom}`}
                    onUpdate={handleUpdate}
                    updatedData={updatedData}
                    setUpdatedData={setUpdatedData}
                    isEditing={isEditing}
                    onNewButton={handleNewButton}
                />
            )}
            {isNewExemplaireModalOpen && (
                <NewExemplaireModal
                    onClose={handleCloseNewExemplaireModal}
                    onSave={handleSaveNewExemplaire}
                    exemplaireId={exemplaireToEditId}
                />
            )}
        </div>
    );
};

export default MyComponent;
