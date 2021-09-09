import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
// import * as firebase from "firebase";
// import "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [numServings, setNumServings] = useState("");
  const [recipeName, setRecipeName] = useState("");
  let totalCalories = "345";

  // const documentQuery = await getDocs(collection(db, "Foods"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <Text>Number of Servings:</Text>
      <TextInput
        style={styles.input}
        placeholder="1"
        onChangeText={(val) => setNumServings(val)}
      />

      <Text>Enter Recipe Name (leave blank if a la carte):</Text>

      <TextInput
        style={styles.input}
        style={styles.input}
        placeholder="Mac and Cheese"
        onChangeText={(val) => setRecipeName(val)}
      />
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
