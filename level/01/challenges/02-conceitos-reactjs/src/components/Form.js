import React, { useState } from 'react'

export default function Form({ handles }) {
    const { handleAddRepository } = handles
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [tech, setTech] = useState("")
    const [techs, setTechs] = useState([])
    

    function handleAddTech(e){
        e.preventDefault()
        if(tech === "")
            return
        setTechs([...techs, tech])
        setTech("")
    }

    function handleRemoveTech(index){
        const newTechs = [...techs]
        newTechs.splice(index, 1)
        setTechs(newTechs)
    }

    function submitForm(e){
        e.preventDefault()
        if(title === "" || url === "")
            handleAddRepository()
        else{
            const repository = {
                title,
                url,
                techs
            }
            setTitle("")
            setUrl("")
            setTech("")
            setTechs([])
            handleAddRepository(repository)
        }
    }

    return (
        <form>
            <button onClick={submitForm}>Adicionar</button>
            <div>
                <label htmlFor="title">Titulo</label>
                <input 
                    onChange={e=>setTitle(e.target.value)} 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={title}
                />
            </div>
            <div>
                <label htmlFor="url">Url</label>
                <input 
                    onChange={e=>setUrl(e.target.value)} 
                    type="text" 
                    name="url" 
                    id="url" 
                    value={url}
                />
            </div>
            <div>
                <label htmlFor="url">Tecnologias</label>
                <ul>
                    {techs.map((tech, index) => 
                        <li
                            onClick={e => handleRemoveTech(index)}
                        >{tech}</li>
                    )}
                </ul>
                <input 
                    onChange={e=>setTech(e.target.value)}
                    type="text"
                    name="tech"
                    id="tech"
                    value={tech}
                />
                <button onClick={handleAddTech} >Adicionar Tecnologia</button>
            </div>
        </form>
    )
}
