import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function MapScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const backendUrl = "https://location-tracker-rtl.onrender.com"; // Replace with your actual backend URL

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/locations`);
        // Assuming the response contains an array of location data
        // You can modify this part to extract the desired location
        const latestLocation = response.data[response.data.length - 1];
        if (latestLocation) {
          setCurrentLocation({
            latitude: latestLocation.latitude,
            longitude: latestLocation.longitude,
          });
        }
      } catch (error) {
        console.error("Error fetching location data:", error.message);
      }
    };

    fetchLocationData();
  }, []);

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
          <Marker coordinate={currentLocation} title="User Location" />
        )}
      </MapView>
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
});
