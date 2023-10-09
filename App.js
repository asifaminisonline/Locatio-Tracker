import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./MapScreen";
import MyDetails from "./MyDetails";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="My Current Location👇" component={MapScreen} />
        <Stack.Screen name="MyDetails" component={MyDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
