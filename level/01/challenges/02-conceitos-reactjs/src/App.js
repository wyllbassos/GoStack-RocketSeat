import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Repositories from "./components/Repositories";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    api.get('repositories').then(response => {
      const apiRepositpries = response.data;
      setRepositories(apiRepositpries)
      setTimeout(() => setUpdate(!update), 1000)
    })
  }, [update])

  async function handleAddRepository(repository) {
    const now = Date.now()
    if(!repository)
      repository = {
        title: `Novo Repositprio ${now}`,
        url: `https://github.com/wyllbassos/${now}`,
        techs: ["NodeJS", "ReactJS", "ReactNative"]
      }
    const response = await api.post('repositories', repository)
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if(repositoryIndex >= 0){
      const response = await api.delete(`repositories/${id}`)
      if(response.status === 204){
        const newRepositories = repositories.filter(repository => repository.id !== id)
        console.log(newRepositories)
        setRepositories(newRepositories)
      }
    }
  }

  async function handleAddLike(id){
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if(repositoryIndex >= 0){
      const response = await api.post(`repositories/${id}/like`)
      if(response.data){
        const newRepositories = [...repositories]
        newRepositories[repositoryIndex].likes = response.data.likes
        setRepositories(newRepositories)
      }
    }
  }

  return (
    <div>
      <Repositories 
        repositories={repositories}
        handles={{handleRemoveRepository, handleAddLike}}
      />
      <Form
        handles={{ handleAddRepository }}
      />
    </div>
  );
}

export default App;
