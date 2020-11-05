import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function RepositoryItem({ repository, handles }) {
  const { id, title, url, techs, likes } = repository
  const { handleRemoveRepository, handleAddLike } = handles
  return (
    <View style={styles.repositoryContainer}>
      <View style={styles.repositoryHeader}>
        <Text style={styles.repository}>{title}</Text>
        <TouchableOpacity
          onPress={() => handleRemoveRepository(id)}
          style={styles.buttonRemove}
        >
          <Text style={styles.buttonRemoveText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.techsContainer}>
        {techs.map((tech, i) => (
          <Text key={tech + id} style={styles.tech}>
            {tech}
          </Text>
        ))}
      </View>
      <View style={styles.likesContainer}>
        <Text
          style={styles.likeText}
          // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
          testID={`repository-likes-${id}`}
        >
          {`${likes} curtidas`}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddLike(id)}
        // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
        testID={`like-button-${id}`}
      >
        <Text style={styles.buttonText}>Curtir</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  repositoryContainer: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
  repositoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    paddingHorizontal: 0,
  },
  repository: {
    width: "90%",
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonRemove: {
    backgroundColor: 'red',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRemoveText: {
    color: '#fff'
  }
});
