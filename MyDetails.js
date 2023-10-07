import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function MyDetails() {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/dev.jpg")} style={styles.image} />
      <Text style={styles.contactText}>Contact Details:</Text>
      <Text style={styles.text}>Name: Asif </Text>
      <Text style={styles.text}>Email: asifaminisonline@gmail.com</Text>
      <Text style={styles.text}>Phone: +91 7780879289</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 20,
  },
  contactText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 20,
  },
  text: {
    color: "green",
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 10,
  },
});
