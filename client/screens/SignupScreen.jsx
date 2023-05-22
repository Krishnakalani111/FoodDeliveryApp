import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {StyleSheet,Text,TextInput,TouchableOpacity,View,Alert,ImageBackground} from "react-native";
import { setUser } from "../store/userSlice";
import * as yup from "yup";
import CircularJSON from 'circular-json';
import { host } from "../api";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const registerSchema = yup.object().shape({
  //   username: yup.string().required(),
  //   email: yup.string().email().required(),
  //   password: yup.string().min(6).required(),
  // });

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${host}/user/registerUser`, {
        userName,
        email,
        password,
      });
      console.log(response.data);

      Alert.alert('Registration successful!');
      dispatch(setUser(response.data.newUser))
      navigation.navigate("Login")
      setEmail("");
      setPassword("")
      setUserName("")
    } catch (error) {
      console.error(error);
      Alert.alert('Error registering user');
    }
  };

  return (
    // <ImageBackground
    //     source={require("../assets/home-bg.jpg")}
    //     style={styles.imageBackground}
    //   >
    <View style={styles.container}>
      <Text style={styles.heading}>Register as User</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate("AdminRegister")}>
          <Text style={styles.linkText}>Register as an Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already registered? Log in</Text>
        </TouchableOpacity>
      </View>
      </View>
      // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
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
    margin:5,
    color: 'blue',
    fontSize: 16,
  }
});

export default RegisterScreen;


