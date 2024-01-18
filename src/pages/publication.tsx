import React from 'react'
import jwt from "jsonwebtoken";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import { useState,useEffect} from "react";
import Navbar from './elements/navbar';
export default function publication() {
  // le texte de la publication et le tableuax des publications
/*
model Publication {
  id          Int          @id @default(autoincrement())
  text        String
  publieurId  Int
  publieur    User         @relation(fields: [publieurId], references: [id])
  commentaires Commentaire[]
}
*/
let decodedToken;

const [text, setText] = useState("");
const [publications, setPublications] = useState([]);



//const [publieurId, setPublieurId] = useState(decodedToken.id);
// lecture des publications
const getPublications = async () => {
    console.log("getPublications");
    try {
        const response = await axios.get("http://localhost:3000/api/publication");
        setPublications(response.data);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }


}
// ajout d'une publication
const ajouterPublication = async () => {
    try {
        const response = await axios.post("http://localhost:3000/api/publication", {
            text,
            publieurId:Number(jwt.decode(localStorage.getItem("token")).id|| 0),
        });
        console.log(response.data);
        getPublications();

    } catch (error) {
        console.log(error);
    }
}
// appel de la fonction getPublications au chargement de la page
useEffect(() => {
    getPublications();
}
    , []);

    return (
        
        <>
        <Navbar></Navbar>
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    
                </div>
                <div className="col">
                <form onSubmit={ajouterPublication}>

<div className="form-group">

    <textarea className="form-control" id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="text">
    </textarea>
</div>
<button type="submit" className="btn btn-primary" >Ajouter</button>
</form>
                </div>
                <div className="col">
                    
                </div>
            </div>
        </div><div>
              




                <h2>Liste des publications</h2>
                <ul>
                    {publications.map((publication) => (
                        <li key={publication.id}>
                            {publication.text}
                            <br></br>
                            <a href='#'> {publication.publieur.nom} {publication.publieur.prenom}</a>
                        </li>
                    ))}
                </ul>




            </div></>
  )
}
