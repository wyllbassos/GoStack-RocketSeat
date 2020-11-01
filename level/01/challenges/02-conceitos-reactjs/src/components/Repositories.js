import React from 'react'
import RepositoryIten from './RepositoryIten'

export default function Repositories({ repositories, handles }) {
    return (
        <ul data-testid="repository-list">
            {repositories.map(repository => (
                <RepositoryIten
                    key={repository.id}
                    repository={repository}
                    handles={handles}
                />
            ))}
      </ul>
    )
}