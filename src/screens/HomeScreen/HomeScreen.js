import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Text, Button } from "react-native";
import styles from "./styles";

import firebase from "firebase/app";
import "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [numServings, setNumServings] = useState(1);
  const [totalCalories, setTotalCalories] = useState(0);

  const [recipeName, setRecipeName] = useState("");
  const [recipeArray, setRecipeArray] = useState([]);

  // Firestore object
  const db = firebase.firestore();

  const incrementServings = () => {
    setNumServings(numServings + 1);
    console.log("Servings: " + (numServings + 1));
  };

  const decrementServings = () => {
    setNumServings(numServings - 1);
    if (numServings <= 0) {
      setNumServings(0);
    }
    console.log("Servings: " + (numServings - 1));
  };

  async function getFoods(foodsRetrieved) {
    var foodList = [];

    var snapshot = await firebase
      .firestore()
      .collection("Foods")
      .orderBy("createdAt")
      .get();

    snapshot.forEach((doc) => {
      foodList.push(doc.data());
    });

    foodsRetrieved(foodList);
  }

  const addRecipe = () => {
    setRecipeArray([
      ...recipeName,
      {
        id: recipeArray.length,
        value: recipeName,
      },
    ]);
  };

  const storeAndNavigate = (numServings) => {
    db.collection("DATA").doc("numServings").set({ numServings: numServings });
    navigation.navigate("Barcode");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginTop: 50, marginBottom: 50 }}>
        Total Calories: {totalCalories}
      </Text>

      <Text style={{ fontSize: 30, marginBottom: 10 }}>Add a Food</Text>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20, marginBottom: -10 }}>
          Number of Servings:{" "}
        </Text>
        <Button
          style={{ marginBottom: 20 }}
          onPress={decrementServings}
          title="-"
        />
        <Text style={{ fontSize: 20, marginBottom: -10 }}>{numServings}</Text>
        <Button
          style={{ marginBottom: 20 }}
          onPress={incrementServings}
          title="+"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => storeAndNavigate(numServings)}
      >
        <Text style={styles.buttonTitle}>Add With Barcode</Text>
      </TouchableOpacity>

      <Text>Search for Food:</Text>

      <TextInput
        style={styles.input}
        placeholder="Mac and Cheese"
        onChangeText={(val) => setRecipeName(val)}
      />

      <Text>Enter Recipe Name (leave blank if a la carte):</Text>

      <TextInput
        style={styles.input}
        placeholder="Mac and Cheese"
        onChangeText={(val) => setRecipeName(val)}
      />

      <Button title="Enter" />

      <Text>Recent Foods:</Text>
    </View>
  );
}
