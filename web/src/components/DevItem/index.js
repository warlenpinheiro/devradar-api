import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import './styles.css';

function DevItem({ dev, onUpdateClick, onDeleteClick }){

  async function handleFormEdit(){
    await onUpdateClick(dev)
  }

  async function handleDelete(){
    await onDeleteClick(dev._id)
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>

        <div className="action-buttons">
          <button className="edit" onClick={handleFormEdit}>
            <MdEdit size={20} color="#FFFFFF" />
          </button>
          <button className="delete" onClick={handleDelete}>
            <MdDelete size={20} color="#FFFFFF" />
          </button>
        </div>
      </header>

      <p>{dev.bio}</p>

      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
    </li>
  )
}

export default DevItem;
