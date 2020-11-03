import React from 'react'
import RepositoryItem from './RepositoryItem'

export default function Repositories({ repositories, handles }) {
    return (
        <ul data-testid="repository-list">
            {repositories.map(repository => (
                <RepositoryItem
                    key={repository.id}
                    repository={repository}
                    handles={handles}
                />
            ))}
      </ul>
    )
}