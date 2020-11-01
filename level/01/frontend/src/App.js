import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import api from './services/api'



function App(){
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    async function handleAddProject(){
        //projects.push(`Novo Projeto ${Date.now()}`)
        //const newProjects = [...projects, `Novo Projeto ${Date.now()}`]
        //setProjects(newProjects)
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Wylliam Bassos"
        })
        const project = response.data
        setProjects([...projects, project])
        
    }

    return(
        <>
            <Header title="Home Page"/>

            <ul>
                {projects.map(projects => (
                    <li key={projects.id}>{projects.title}</li>
                ))}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    )
}

export default App