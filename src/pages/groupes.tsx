import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './elements/navbar';

export default function Groupes() {
    const [groupes, setGroupes] = useState([]);
    const [titre, setTitre] = useState('');
    const [sujet, setSujet] = useState('');

    // Récupérer les groupes depuis l'API
    const getGroupes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/groupe');
            setGroupes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Ajouter un groupe via l'API
    const ajouterGroupe = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/groupe', { titre, sujet });
            setTitre('');
            setSujet('');
            getGroupes();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getGroupes();
    }, []);

    return (
       <div> <Navbar></Navbar>
        <div className="container">
            <h2>Groupes</h2>

            {/* Formulaire pour ajouter un groupe */}
            <form onSubmit={ajouterGroupe}>
                <div className="form-group">
                    <label htmlFor="titre">Titre</label>
                    <input type="text" className="form-control" id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="sujet">Sujet</label>
                    <input type="text" className="form-control" id="sujet" value={sujet} onChange={(e) => setSujet(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter Groupe</button>
            </form>

            {/* Affichage des groupes */}
            <div className="mt-4">
                <h3>Liste des Groupes</h3>
                <ul>
                    {groupes.map(groupe => (
                        <li key={groupe.id}>{groupe.titre} - {groupe.sujet}</li>
                    ))}
                </ul>
            </div>
        </div></div>
    );
}
