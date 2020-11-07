import React from 'react'

export default function RepositoryItem({ repository, handles }) {
    const { id, title, url, techs, likes } = repository
    const { handleRemoveRepository, handleAddLike } = handles
    return (
        <div id="RepositoryItems">
            <div id="RepositoryItems-title"><a href={url} target="blank">{title}</a></div>
            <div id="listTechs">
                {techs.map(tech => <div id="divTechs">{tech}</div>)}
            </div>
            <div>{likes} Curtidas</div>
            <div id="divButtons" >
                <button className="btLike" onClick={() => handleAddLike(id)}>
                    Curtir
                </button>
                <button className="btRemove" onClick={() => handleRemoveRepository(id)}>
                    Remover
                </button>
            </div>
        </div>
    )
}
