import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

export default function MapScreen({ navigation }) {
  const [locations, setLocations] = useState([]);
  const mapRef = useRef(null);
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

  useEffect(() => {
    if (mapRef.current && locations.length > 0) {
      mapRef.current.animateCamera({
        center: {
          latitude: locations[locations.length - 1].latitude,
          longitude: locations[locations.length - 1].longitude,
        },
      });
    }
  }, [locations]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 0, // Use default values
          longitude: 0, // Use default values
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
