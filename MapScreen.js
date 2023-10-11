import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function MapScreen({ navigation }) {
  const [locations, setLocations] = useState([]);
  const backendUrl = "https://location-tracker-rtl.onrender.com"; // Replace with your actual backend URL

  useEffect(() => {
    // Fetch location data from the API endpoint
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error.message);
      }
    };

    // Fetch location data initially and then at regular intervals
    fetchLocationData();

    // Set an interval to fetch location data every 10 seconds
    const intervalId = setInterval(() => {
      fetchLocationData();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude:
            locations.length > 0 ? locations[locations.length - 1].latitude : 0, // Use the latitude from the first location
          longitude:
            locations.length > 0
              ? locations[locations.length - 1].longitude
              : 0, // Use the longitude from the first location
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.length > 0 && (
          <Marker
            coordinate={{
              latitude: locations[locations.length - 1].latitude,
              longitude: locations[locations.length - 1].longitude,
            }}
            title="User Location"
          />
        )}
      </MapView>

      <Button
        title="My Details"
        onPress={() => navigation.navigate("MyDetails")}
      />
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
