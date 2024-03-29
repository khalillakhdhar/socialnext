import React from 'react'

export default function navbar() {
  // disconnect arrow function
  const disconnect = () => {
    localStorage.removeItem("token");
    // localstorage.clear();
    window.location.href = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="publication">Accueil</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="profile">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="groupes">Groupes</a>
            </li>
           
            <li className="nav-item">
              <a  className="nav-link" onClick={disconnect} >déconnexion</a>
            </li>
          </ul>
        
        </div>
      </div>
    </nav>
  )
}
