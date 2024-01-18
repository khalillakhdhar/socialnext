import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InscriptionForm = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    prenom,
                    email,
                    mdp,
                    age: Number(age),
                }),
            });
            if (response.ok) {
                const user = await response.json();
                console.log(user);
                window.location.reload();
                // Handle successful user creation
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <div className="d-flex justify-content-center"> {/* BEGIN: Center content */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" className="form-control" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="mdp">Mot de passe</label>
                    <input type="password" className="form-control" id="mdp" value={mdp} onChange={(e) => setMdp(e.target.value)} placeholder="Mot de passe" />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Âge</label>
                    <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Âge" />
                </div>
                <button type="submit" className="btn btn-primary">Inscription</button>
            </form>
        </div> 
    );
};

export default InscriptionForm;
