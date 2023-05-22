import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { host } from "../api";

const AddDishScreen = ({ navigate, route }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
     const [successMessage, setSuccessMessage] = useState('');
  const admin = useSelector((state) => state.admin.adminDetails);

  const handleAddDish = async () => {
    try {
      const response = await axios.post(
        `${host}/admin/${admin._id}`,
        {
          name,
          description,
          price,
        }
      );
      // Handle success response
      console.log(response.data);
      // Reset form fields
      setName("");
      setDescription("");
        setPrice("");
        setSuccessMessage('Dish added successfully!');
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Add a Dish</Text>
          {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Dish" onPress={handleAddDish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    },
  successMessage: {
    color: 'green',
    marginBottom: 16,
  },
});

export default AddDishScreen;
