import React, { useState, useEffect } from "react";

import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Repositories from "./components/Repositories";

export default function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      const apiRepositpries = response.data;
      setRepositories(apiRepositpries)
    })
  }, [])

  async function handleAddLike(id) {
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

  async function handleAddRepository(repository) {
    const now = Date.now()
    if(!repository)
      repository = {
        title: `Novo Repositprio ${now}`,
        url: `https://github.com/wyllbassos/${now}`,
        techs: ["NodeJS", "ReactJS", "ReactNative"]
      }
    console.log(repository)
    const response = await api.post('repositories', repository)
    setRepositories([...repositories, response.data])
  }

  return (
    <View style={styles.body}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Repositories 
        repositories={repositories}
        handles={{handleRemoveRepository, handleAddLike}}
      />
      <TouchableOpacity 
        onPress={e => handleAddRepository()}
        style={styles.buttonAddRepo}
      >
        <Text style={styles.buttonAddRepoText} >Adicionar Repositório</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: "#7159c1",
  },
  container: {
    flex: 1,
    width: "100%",
    padding: 0,
    backgroundColor: "#7159c1",
    alignItems: "center",
  },
  buttonAddRepo: {
    width: "100%",
    padding: 10,
    backgroundColor: "#04d361",
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonAddRepoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  }

});
