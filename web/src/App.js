import React, { useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() {
  const [currentDev, setCurrentDev] = useState('');
  const [devs, setDevs] = useState([]);
  const [title, setTitle] = useState('Cadastrar');

  useEffect(()=> {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    
    setDevs([...devs, response.data]);
  }

  async function handleUpdateDev(id, data){
    const response = await api.put(`/devs/${id}`, data);

    setDevs(devs.map(dev => dev._id === id ? response.data.devUpdated : dev));
  }

  async function handleDeleteDev(id){
    await api.delete(`/devs/${id}`);

    setDevs(devs.filter(dev => dev._id !== id));
  }

  function setForm(data){
    if(data){
      setTitle('Editar'); 
      setCurrentDev(data);
    }else{
      setTitle('Cadastrar');
      setCurrentDev(null);
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>{title}</strong>
        <DevForm 
          onSubmit={ currentDev ? handleUpdateDev : handleAddDev } 
          onCancelClick={setForm} 
          dev={currentDev}
        />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem 
              key={dev._id} 
              dev={dev} 
              onUpdateClick={setForm} 
              onDeleteClick={handleDeleteDev} 
            />
          ))} 
        </ul>
      </main>
    </div>
  );
}

export default App;
