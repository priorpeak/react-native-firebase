import React from "react";
import { Text, View } from "react-native";
// import { Navigation } from "selenium-webdriver";
import { user } from "../LoginScreen/LoginScreen";
import Scanner from "../../scanner";

export default function HomeScreen() {
  //   const authCheck = (user) => {
  //     if (user != "") {
  //       navigation.navigate("Login");
  //     } else {
  //       console.log("AUTHENTICATED");
  //     }
  //   };

  //   authCheck(user);

  const result = Scanner()
  console.log('SCANNER RESULT: ' + result)

  return (
    <View>
      <Text>{ result }</Text>
    </View>
  );
}