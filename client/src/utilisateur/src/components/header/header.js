import React, { useState } from 'react';
import './header.css';

const Header = ({ onSearch, onSearchById }) => {
    const [searchValues, setSearchValues] = useState({
        nom: '',
        prenom: '',
        categorie: '',
        etat: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setSearchValues(prev => {
            const updatedValues = { ...prev, [name]: value };
            
            // Create a search object with only the current field
            const searchObject = {
                [name]: value.trim()
            };

            // Only trigger search if the value is not empty and not the default option
            if (value.trim() && value !== 'default') {
                onSearch(searchObject);
            } else {
                // If the field is cleared or default is selected, reset the search
                onSearch({});
            }
            
            return updatedValues;
        });
    };

    return (
        <div className="navbar">
            <div className="d-flex">
                <div className="input-group">
                    <input
                        type="text"
                        name="nom"
                        value={searchValues.nom}
                        onChange={handleInputChange}
                        placeholder=" Search Nom"
                        className="search-input"
                    />
                    <input
                        type="text"
                        name="prenom"
                        value={searchValues.prenom}
                        onChange={handleInputChange}
                        placeholder=" Search Prénom"
                        className="search-input"
                    />
                    <select
                        name="categorie"
                        value={searchValues.categorie}
                        onChange={handleInputChange}
                        className="search-input"
                    >
                        <option disabled hidden >Select Catégorie</option>
                        <option value="abonnes">Abonnés</option>
                        <option value="privilige">Privilège</option>
                        <option value="occasionnel">Occasionnel</option>
                    </select>
                    <select
                        name="etat"
                        value={searchValues.etat}
                        onChange={handleInputChange}
                        className="search-input"
                    >
                        <option disabled hidden >Select État</option>
                        <option value="bloque">Bloqué</option>
                        <option value="pasBloque">Pas Bloqué</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Header;