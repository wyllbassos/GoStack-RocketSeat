import React from 'react'
import RepositoryItem from './RepositoryItem'

export default function Repositories({ repositories, handles }) {
    return (
        <div id="main-list" data-testid="repository-list">
            {repositories.map(repository => (
                <RepositoryItem
                    key={repository.id}
                    repository={repository}
                    handles={handles}
                />
            ))}
      </div>
    )
}