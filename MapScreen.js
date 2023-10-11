// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, Button } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import axios from "axios";

// export default function MapScreen({ navigation }) {
//   const [location, setLocation] = useState(null);
//   const backendUrl = "https://location-tracker-rtl.onrender.com";

//   useEffect(() => {
//     // Request location permission and start watching for location updates
//     const startWatchingLocation = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === "granted") {
//         await sendLocationData(); // Send initial location data

//         const locationSubscriber = await Location.watchPositionAsync(
//           {
//             accuracy: Location.Accuracy.High,
//             timeInterval: 1000,
//           },
//           async (newLocation) => {
//             setLocation(newLocation.coords);

//             // Send location data to the backend
//             try {
//               console.log("Sending data to backend:", newLocation.coords);

//               await axios.post(`${backendUrl}/locations`, newLocation.coords);
//               console.log("Location data sent successfully!");
//             } catch (error) {
//               console.error("Error sending location data:", error.message);
//             }
//           }
//         );

//         // Clean up the location subscriber when the component unmounts
//         return () => {
//           if (locationSubscriber) {
//             locationSubscriber.remove();
//           }
//         };
//       }
//     };

//     startWatchingLocation();
//   }, []);

//   const sendLocationData = async () => {
//     // Function to send location data to the backend
//     if (location) {
//       try {
//         console.log("Sending data to backend:", location);

//         await axios.post(`${backendUrl}/locations`, location);
//         console.log("Location data sent successfully!");
//       } catch (error) {
//         console.error("Error sending location data:", error.message);
//       }
//     }
//   };

//   // Set an interval to send location data to the backend every 30 seconds
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       sendLocationData();
//     }, 1000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, [location]);

//   return (
//     <View style={styles.container}>
//       {location && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}
//             title="Your Location"
//           />
//         </MapView>
//       )}
//       {location && (
//         <Text style={styles.locationText}>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </Text>
//       )}
//       {location && (
//         <Button
//           title="My Details"
//           onPress={() => navigation.navigate("My Current Location👇")}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   locationText: {
//     padding: 16,
//     textAlign: "center",
//   },
// });

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function MapScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const backendUrl = "https://location-tracker-rtl.onrender.com";

  // useEffect(() => {
  //   const startWatchingLocation = async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status === "granted") {
  //       const locationSubscriber = await Location.watchPositionAsync(
  //         {
  //           accuracy: Location.Accuracy.High,
  //           timeInterval: 1000, // Update location every 1 second (adjust as needed)
  //         },
  //         async (newLocation) => {
  //           const { latitude, longitude } = newLocation.coords;
  //           setCurrentLocation({ latitude, longitude });
  //           sendLocationData({ latitude, longitude }); // Send location to the backend
  //         }
  //       );

  //       return () => {
  //         if (locationSubscriber) {
  //           locationSubscriber.remove();
  //         }
  //       };
  //     }
  //   };

  //   startWatchingLocation();
  // }, []);
  useEffect(() => {
    const startWatchingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationSubscriber = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 0.5, // Update location when the user has moved 1 meter
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
