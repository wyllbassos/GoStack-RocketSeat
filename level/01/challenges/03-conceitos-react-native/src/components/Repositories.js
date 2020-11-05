import React from 'react'
import RepositoryItem from './RepositoryItem'
import { FlatList } from "react-native";

export default function Repositories({ repositories, handles }) {
  return (
    <FlatList
      data={repositories}
      keyExtractor={repository => repository.id}
      renderItem={({ item }) => (
        <RepositoryItem
          repository={item}
          handles={handles}
        />
      )}
    />
  )
}