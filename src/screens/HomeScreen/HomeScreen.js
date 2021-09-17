import { NavigationContainer, useScrollToTop } from "@react-navigation/native";
import React, { useState, useEffect, Component } from "react";
import { TextInput, View, TouchableOpacity, Text, Button } from "react-native";
import styles from "./styles";

import firebase from "firebase/app";
import firestore from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [numServings, setNumServings] = useState(1);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodData, setFoodData] = useState([]);

  const [recipeName, setRecipeName] = useState("");
  const [recipeArray, setRecipeArray] = useState([]);

  var foodArray = [];
  var totalCaloriesTemp = 0;

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

  /*state = {
    foods: []
  }
  constructor(props) {
    super(props);
    this.food = 
      firestore()
      .collection("Foods")
      .onSnapshot(docs => {
        let foods = []
        docs.forEach(doc => {
          foods.push(doc.data())
        })
        this.setState({foods})
        console.log(foods)
      })
  }

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

    console.log(foodList);

    foodsRetrieved(foodList);
  }
  async function QuerySnapshot() {
     try { 
      const querySnapshot = await getDocs(collection(db, "Foods"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
     }catch (e) {
      return { error: true };
    }
  }

  function onResult(querySnapshot) {
    console.log('Got collection result.');
  }
  
  function onError(error) {
    console.error(error);
  }  
  
  firestore().collection('Foods').onSnapshot(onResult, onError);
  */

  const dbQuery = () => {
    console.log("running function");
    db.collection("Foods")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          foodArray.push(doc.id + " " + JSON.stringify(doc.data()));
          totalCaloriesTemp += doc.data().totalCals;
          setTotalCalories(totalCaloriesTemp);
        });
        setFoodData(foodArray);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

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

      {/* <Text>Search for Food:</Text>

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
      /> */}

      <TouchableOpacity style={styles.button} onPress={() => dbQuery()}>
        <Text style={styles.buttonTitle}>Display Recent Foods</Text>
      </TouchableOpacity>

      <Text>Recent Foods:</Text>
      <Text>{foodData}</Text>
    </View>
  );
}
