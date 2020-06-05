import React, { useState, useEffect} from 'react';

function DevForm({ onSubmit, onCancelClick, dev }){
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    //função que pegar a geolocation do navegador do usuário
    if(dev){
      const {name, bio, techs, location, github_username} = dev;
      setName(name);
      setBio(bio);
      setTechs(techs.join(', '));
      setLatitude(location.coordinates[1]);
      setLongitude(location.coordinates[0]);
      setGithubUsername(github_username);
    }else{
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
  
  
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.log(error);
        },
        { timeout: 30000, } );
        setName('');
        setBio('');
        setTechs('');
        setGithubUsername('');
    }
  }, [dev]);


  async function handleSubmit(e){
    e.preventDefault();

    if(dev){
      await onSubmit(dev._id, {
        name,
        bio,
        techs,
        latitude,
        longitude,
      });
    }else{
      await onSubmit({
        github_username,
        techs,
        latitude,
        longitude,
      });

    }

    onCancelClick('');
    setGithubUsername('');
    setTechs('');
    setName('');
    setBio('');
    setTechs('');
  }

  function handleCancel(e){
    e.preventDefault();

    onCancelClick('');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      { dev ? (
        <>
          <div className="input-block">
            <label>Usuário do Github: {github_username}</label>
          </div>
          <div className="input-block">
            <label htmlFor="nome">Nome</label>
            <input 
              name="name" 
              id="name" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="bio">Bio</label>
            <textarea 
              name="bio" 
              id="bio" 
              required
              value={bio}
              rows={4}
              onChange={e => setBio(e.target.value)}
            />
          </div>
        </>
        ) : (
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>
        )
      }

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          name="techs" 
          id="techs" 
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">           
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            name="latitude" 
            type="number" 
            id="latitude" 
            required 
            value={latitude}
            onChange={ e => setLatitude(e.target.value) }/> 
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            name="longitude" 
            type="number" 
            id="longitude" 
            required 
            value={longitude}
            onChange={e => setLongitude(e.target.value)}/>
        </div>
      </div>

      {
        dev? (
          <div className="button-group">
            <button type="submit">Atualizar</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </div>
          ) : (
            <button type="submit">Salvar</button>
        )
      }
    </form>
  )
}

export default DevForm;