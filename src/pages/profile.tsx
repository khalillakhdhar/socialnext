import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './elements/navbar';

export default function UserProfile() {
    const [user, setUser] = useState({});
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt.decode(token);
            return decoded?.id;
        }
        return null;
    };

    const fetchUser = async () => {
        const userId = getUserIdFromToken();
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
                setUser(response.data);
                setNom(response.data.nom);
                setPrenom(response.data.prenom);
                setEmail(response.data.email);
                setAge(response.data.age);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const updateUser = async (event) => {
        event.preventDefault();
        const userId = getUserIdFromToken();
        if (userId) {
            try {
                await axios.put(`http://localhost:3000/api/user/${userId}`, { nom, prenom, email, age: Number(age) });
                console.log('User updated');
                fetchUser();
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
        <div className="container mt-4">
            <h2 className="mb-4">Profil Utilisateur</h2>
            <form onSubmit={updateUser}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input type="text" className="form-control" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Mettre à jour</button>
            </form>
        </div>
        </div>
    );
}
