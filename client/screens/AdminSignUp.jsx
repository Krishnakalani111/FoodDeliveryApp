import { View, Text,Alert,TextInput,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { setAdmin } from '../store/adminSlice';
import { useDispatch } from 'react-redux';
import { host } from '../api';

const AdminSignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurant,setRestaurant]= useState("")

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${host}/admin/registerAdmin`, {
        userName,
        email,
        password,
        restaurant
      });
      
      console.log(response.data)
      Alert.alert('Registration successful!');
      dispatch(setAdmin(response.data.newAdmin))
      navigation.navigate("AdminLogIn")
      setEmail("");
      setPassword("")
      setUserName("")
      setRestaurant("")
    } catch (error) {
      console.error(error);
      Alert.alert('Error registering admin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register as Admin</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUserName(text)}
        value={userName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        
        onChangeText={text => setRestaurant(text)}
        value={restaurant}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Register as an user</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AdminLogIn")}>
          <Text style={styles.linkText}>Already registered? Log in for admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    padding:10,
    color: 'blue',
    fontSize: 16,
  }
});



export default AdminSignUp