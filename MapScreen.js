import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function MapScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const backendUrl = "https://location-tracker-rtl.onrender.com";

  useEffect(() => {
    const startWatchingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationSubscriber = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1, // Update location when the user has moved 1 meter
          },
          async (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setCurrentLocation({ latitude, longitude });
            sendLocationData({ latitude, longitude }); // Send location to the backend
          }
        );

        return () => {
          if (locationSubscriber) {
            locationSubscriber.remove();
          }
        };
      }
    };

    startWatchingLocation();
  }, []);

  const sendLocationData = async (location) => {
    try {
      console.log("Sending data to backend:", location);

      await axios.post(`${backendUrl}/locations`, location);
      console.log("Location data sent successfully!");
    } catch (error) {
      console.error("Error sending location data:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: currentLocation ? currentLocation.latitude : 0,
          longitude: currentLocation ? currentLocation.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Your Location" />
        )}
      </MapView>
      {currentLocation && (
        <Text style={styles.locationText}>
          Latitude: {currentLocation.latitude}, Longitude:{" "}
          {currentLocation.longitude}
        </Text>
      )}
      {currentLocation && (
        <Button
          title="My Details"
          onPress={() => navigation.navigate("My Current Location👇")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationText: {
    padding: 16,
    textAlign: "center",
  },
});
