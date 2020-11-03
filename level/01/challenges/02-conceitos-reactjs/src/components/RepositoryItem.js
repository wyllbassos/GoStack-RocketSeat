import React from 'react'

export default function RepositoryItem({ repository, handles }) {
    const { id, title, url, techs, likes } = repository
    const { handleRemoveRepository, handleAddLike } = handles
    return (
        <li id="RepositoryItems">
            <ul>
                <li><a href={url} target="blank">{title}</a></li>
                <li>
                    <div>
                        Tecnologias
                    </div>
                    <ul>
                        {techs.map(tech => <li>{tech}</li>)}
                    </ul>
                </li>
                <li>Likes: {likes}</li>
            </ul>
            <div id="divButtons" >
                <button className="btLike" onClick={() => handleAddLike(id)}>
                    Like
                </button>
                <button className="btRemove" onClick={() => handleRemoveRepository(id)}>
                    Remover
                </button>
            </div>
        </li>
    )
}
