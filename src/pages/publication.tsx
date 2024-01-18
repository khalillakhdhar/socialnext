import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Navbar from './elements/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Publication() {
    const [text, setText] = useState('');
    const [publications, setPublications] = useState([]);
    const [commentaireTexts, setCommentaireTexts] = useState({});

    const getPublications = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/publication');
            setPublications(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const ajouterPublication = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/publication', {
                text,
                publieurId: Number(jwt.decode(localStorage.getItem('token')).id || 0),
            });
            setText('');
            getPublications();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCommentChange = (publicationId, texte) => {
        setCommentaireTexts({ ...commentaireTexts, [publicationId]: texte });
    };

    const ajouterCommentaire = async (publicationId, event) => {
        event.preventDefault();
        try {
            const texte = commentaireTexts[publicationId];
            await axios.post('http://localhost:3000/api/commentaire', {
                text: texte,
                publieurId: Number(jwt.decode(localStorage.getItem('token')).id || 0),
                publicationId: publicationId,
            });
            setCommentaireTexts({ ...commentaireTexts, [publicationId]: '' });
            getPublications();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPublications();
    }, []);

    return (
        <>
         <Navbar />
        <div className="container mt-4">
           
            <div className="row">
                <div className="col-md-3">
                    {/* Colonne de gauche pour les liens personnels */}
                </div>
                <div className="col-md-6">
                    {/* Formulaire d'ajout de publication */}
                    <form onSubmit={ajouterPublication} className="mb-4">
                        <div className="form-group">
                            <textarea className="form-control" placeholder="Qu'avez-vous en tête ?" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Publier</button>
                    </form>
                    {/* Affichage des publications */}
                    {publications.map((publication) => (
                        <div className="card mb-4" key={publication.id}>
                            <div className="card-body">
                                <h5 className="card-title">{publication.publieur.nom} {publication.publieur.prenom}</h5>
                                <p className="card-text">{publication.text}</p>
                                {/* Affichage et ajout de commentaires */}
                                <div className="mt-4">
                                    <h6>Commentaires:</h6>
                                    <form onSubmit={(e) => ajouterCommentaire(publication.id, e)}>
                                        <div className="form-group">
                                            <textarea className="form-control mb-2" placeholder="Ajouter un commentaire..." value={commentaireTexts[publication.id] || ''} onChange={(e) => handleCommentChange(publication.id, e.target.value)}></textarea>
                                            <button type="submit" className="btn btn-outline-primary">Commenter</button>
                                        </div>
                                    </form>
                                    <ul>
                                        {publication.commentaires.map((commentaire) => (
                                            <li key={commentaire.id}>{commentaire.text} - <em>{commentaire.publieur.nom} {commentaire.publieur.prenom}</em></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-3">
                    {/* Colonne de droite pour les suggestions et publicités */}
                </div>
            </div>
        </div></>
    );
}
