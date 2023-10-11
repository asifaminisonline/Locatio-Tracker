import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "./MapScreen";
import { Stack } from "./App";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="My Location👇" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
