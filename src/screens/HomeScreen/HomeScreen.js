import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Text, Button } from "react-native";
import styles from "./styles";
// import * as firebase from "firebase";
// import "firebase/firestore";

export default function HomeScreen({ navigation }) {
  
  const [numServings, setNumServings] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const [recipeName, setRecipeName] = useState("");
  const [recipeArray, setRecipeArray] = useState([]);
  
 
  const incrementServings = () => {
      setNumServings(numServings + 1)
      console.log("Servings: " + (numServings + 1))
  }

  const decrementServings = () => {
      setNumServings(numServings - 1)
      if(numServings <= 0) {
        setNumServings(0)
      }
      console.log("Servings: " + (numServings - 1))
      
  }

  const addRecipe = () => {
    setRecipeArray([...recipeName, {
      id: recipeArray.length,
      value: recipeName
    }])
  }

  // const documentQuery = await getDocs(collection(db, "Foods"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, marginTop: 20, marginBottom: 50}}>Total Calories: 0</Text>
      
      <Text style={{fontSize: 30, marginBottom: 10}}>Add a Food</Text>

      <View style = {{flexDirection: 'row'}}>
        <Text style={{fontSize: 20, marginBottom: -10}}>Number of Servings: </Text>
        <Button style = {{marginBottom: 20}} onPress={decrementServings} title="-" />
        <Text style={{fontSize: 20, marginBottom: -10}}>{numServings}</Text>
        <Button style = {{marginBottom: 20}} onPress={incrementServings} title="+" />
      </View>

      {/* <Text>Number of Servings:</Text> 
      <TextInput
        style={styles.input}
        placeholder="1"
        onChangeText={(val) => setNumServings(val)}
      />

      <TouchableOpacity 
        style={styles.button} 
      >
        <Text style={styles.buttonTitle}>Enter</Text>
        </TouchableOpacity>
      */}

      


      <Text>Enter Recipe Name (leave blank if a la carte):</Text>

      <TextInput
        style={styles.input}
        placeholder="Mac and Cheese"
        onChangeText={(val) => setRecipeName(val)}
      />

      <Button title = "Enter"/>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Barcode")}
      >
        <Text style={styles.buttonTitle}>Barcode Scanner</Text>
      </TouchableOpacity>
      <Text>Total Calories: {totalCalories}</Text>
    </View>
  );
}
