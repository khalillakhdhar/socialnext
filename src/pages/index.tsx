import { User } from "@prisma/client";
import axios from "axios";
import { useState} from "react";
import jwt from "jsonwebtoken";
// authentification with email mdp variables

const Auth: React.FC = () => {
    const [email, setEmail] = useState("");
const [mdp, setMdp] = useState("");
 const authentification =async () => {

try
{
    const response = await axios.post("http://localhost:3000/api/auth", {
        email,
        mdp,
    });
    console.log(response.data);
    // check if token is not null
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", JSON.stringify(response.data.id));
        const decodedToken = jwt.decode(response.data.token);
        console.log(decodedToken.id);
        // redirect to home page
       // window.location.href = "/";
       alert("bienvenu")
    }
    else
    {
        alert("login ou mot de passe incorrects")
    }


}
catch (error)
{
    console.log(error);

}

}
return (
<div>
    <h1>Authentification</h1>
    Email:<input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br></br>
    Mot de passe<input type="password" placeholder="mdp" onChange={(e) => setMdp(e.target.value)} /><br></br>
    <button onClick={authentification}>Se connecter</button>
</div>


); 
}
export default Auth;
