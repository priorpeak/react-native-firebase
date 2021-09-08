import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import { Navigation } from "selenium-webdriver";
// import { user } from "../LoginScreen/LoginScreen";
// import Scanner from "../../scanner";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function HomeScreen() {
  // export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const Http = new XMLHttpRequest();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    data = data.substring(1);
    const url =
      "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=xHd15jjwT1zhv7PRQ5foh0OeL4lWf1Yesjvy3TnS&query=" +
      data;
    Http.open("GET", url);

    Http.send();

    Http.onreadystatechange = (e) => {
      if (Http.readyState == 4 && Http.status == 200) {
        const foodJSON = JSON.parse(Http.responseText);
        // console.log(foodJSON);

        console.log("FOOD:");
        const foodName = foodJSON.foods[0].description;
        console.log(foodName);

        console.log("CALORIES:");
        const calories = foodJSON.foods[0].foodNutrients[3].value;
        console.log(calories);
      }
    };
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
