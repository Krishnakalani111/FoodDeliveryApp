import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, ImageBackground } from 'react-native';

const ProfileScreen = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Krishna Kalani',
      role: 'FullStack Developer',
      photo: require('../assets/kk.png'), 
    },
    {
      id: 2,
      name: 'Divyansh Kumar',
      role: 'Frontend Developer',
      photo: require('../assets/Dev.jpeg'), 
    },
    {
      id: 3,
      name: 'Ammar Tapia',
      role: 'UI/UX Designer',
      photo: require('../assets/Ammar.png'), 
    },
    {
      id: 4,
      name: 'Sahu Chand',
      role: 'UI/UX Designer',
      photo: require('../assets/Sahu.jpeg'), 
    },
  ];

  const renderMember = ({ item }) => (
    <View style={styles.memberContainer}>
      <Image source={item.photo} style={styles.photo} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground source={require("../assets/sample2.jpg")}
        style={styles.imageBackground}>
      <FlatList
        data={teamMembers}
        renderItem={renderMember}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
        />
        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  memberContainer: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: "white",
    padding:5
  
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    
  },
  role: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ProfileScreen;
