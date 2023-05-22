import React,{useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/adminSlice";
import axios from "axios";
import { host } from "../api";

import { setAdmin } from "../store/adminSlice";

const AdminSignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async() => {
    try {
      const response = await axios.post(`${host}/admin/loginAdmin`, {
        email,
        password,
      });
      console.log(response.data);

      Alert.alert('login successful!');
      dispatch(setAdmin(response.data.admin))
      dispatch(setLoggedIn(true))
      navigation.navigate("Home")
      
    } catch (error) {
      console.error(error);
      Alert.alert('Error Logging user');
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login as Admin</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email } />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Not registered yet?</Text>
        <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
          <Text style={styles.footerLink}>Sign up as an admin</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>or</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
          <Text style={styles.footerLink}>Login as a User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
  footer: {
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    marginRight: 5,
    fontWeight:"700"
  },
  footerLink: {
    color: 'blue',
    margin:5,
    fontSize: 16,
  }
});



export default AdminSignIn