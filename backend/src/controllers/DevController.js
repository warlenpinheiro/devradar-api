const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

  async index(req, res){
    const devs = await Dev.find();
    res.json(devs);
  },

  async store(req, res){

    const { github_username, techs, latitude, longitude} = req.body;
  
    let dev = await Dev.findOne({ github_username });

    if (!dev){
      const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
      const {name = login, avatar_url, bio} = response.data;
      
      const techsArray = parseStringAsArray(techs);
      
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })

      // Filtrar as conexões que estão há no máximo 10km de distância,
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev);

    }
  
    return res.json(dev);
  },

  async update(req, res) {

    const { id } = req.params;
    const { techs, latitude, longitude, bio, name} = req.body;

    const dev = await Dev.findById(id);

    if (!dev){
      return res.status(400).json({error: 'Dev não foi encontrado!'})
    }

    const techsArray = parseStringAsArray(techs);
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    await dev.updateOne({
      name,
      bio,
      techs: techsArray,
      location
    })
    
    const devUpdated = await Dev.findById(id);

    return res.json({ devUpdated })
  },

  async destroy(req, res){
    const {id} = req.params;

    const dev = await Dev.findById(id);
    
    if(!dev){
      return res.status(400).json({error: 'Dev não foi encontrado!'});
    }
    
    await dev.remove();

    res.json({message: "Dev removido com sucesso!"})
  }
}
