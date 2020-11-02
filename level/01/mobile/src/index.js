import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  })

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Wylliam Bassos"
    })
    const project = response.data
    setProjects([...projects, project])
    
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <SafeAreaView style={styles.container}>
          <FlatList
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({ item }) => (
              <Text style={styles.project}>
                {item.title}
              </Text>
            )}
          >
        </FlatList>
        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',

  },
  project: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',

  }

})