const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  // LISTAGEM
  return response.json( repositories );
});

/*Rota Principal do Projeto*/
app.post("/repositories", (request, response) => {
  // TODO
  // CRIAÇÃO
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  
  repositories.push( repository );

  return response.json( repository );

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  // MODIFICAÇÃO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: "Repositório não encontrado" });
  }

  const repository = repositories[findRepositoryIndex];


  if (title) {
    repository.title = title;
  }

  if (url) {
    repository.url = url;
  }

  if (techs) {
    repository.techs = techs;
  }

  repositories[findRepositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  // REMOÇÃO
  const { id } = request.params;
  
  /*ele compara o id postado aqui com o id postado no array repositories lá em cima*/
  const findRepositoryIndex = repositories.findIndex( 
    repository => repository.id == id );

  /*aqui saberemos se o id vai ou não remover, ou seja se existir ele vai remover*/
  if( findRepositoryIndex >= 0 ){
    repositories.splice( findRepositoryIndex, 1 )
  }
  else {
    return response.status( 400 ).json( {error: 'Repositório inexistente!'} );
  }
  
  return response.status( 204 ).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: "Repositório não encontrado" });
  }

  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
