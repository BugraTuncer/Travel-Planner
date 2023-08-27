import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
const Map = () => {
  const [destination, setDestination] = useState();
  const [markers, setMarkers] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingMarkerIndex, setEditingMarkerIndex] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance * 1000; // Convert to meters
  };

  const addMarker = (coordinate) => {
    // Check if the new marker is at least 100 meters away from existing markers
    const isFarEnough = markers.every((marker) => {
      const distance = calculateDistance(
        marker.coordinate.latitude,
        marker.coordinate.longitude,
        coordinate.latitude,
        coordinate.longitude
      );
      return distance >= 50;
    });

    if (isFarEnough) {
      const newMarker = { coordinate, title: "" };
      setMarkers([...markers, newMarker]);
    } else {
      // Handle the case where the new marker is too close to existing markers
      console.log("Marker is too close to existing markers");
    }
  };

  const editMarkerTitle = () => {
    if (editingMarkerIndex !== null) {
      const updatedMarkers = [...markers];
      console.log("newTitle", newTitle);
      updatedMarkers[editingMarkerIndex].title = newTitle;
      console.log("update", updatedMarkers);
      setMarkers(updatedMarkers);
      setNewTitle("");
      setEditingMarkerIndex(null);
    }
  };

  const removeMarker = (index) => {
    setMarkers((prevMarkers) => {
      const updatedMarkers = [...prevMarkers];
      updatedMarkers.splice(index, 1);

      // Clear the title of the removed marker
      console.log("upda", updatedMarkers[index]);
      // updatedMarkers[index].title = "";

      return updatedMarkers;
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.36536726709349,
          latitudeDelta: 0.06320638126667433,
          longitude: 4.894002930352903,
          longitudeDelta: 0.06437259673464535,
        }}
        onPress={(e) => {
          addMarker(e.nativeEvent.coordinate);
        }}
        onRegionChange={(region) => console.log(region)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            onDragEnd={(e) => {
              const updatedMarkers = [...markers];
              updatedMarkers[index].coordinate = e.nativeEvent.coordinate;
              setMarkers(updatedMarkers);
            }}
            onPress={() => {
              setNewTitle("");
              setEditingMarkerIndex(index);
            }} // Remove the marker when its callout is pressed
          >
            <Callout>
              <View>
                <TextInput
                  style={styles.editMarkerInput}
                  placeholder="Enter new title"
                  value={marker.title ? marker.title : newTitle}
                  onChangeText={(text) => setNewTitle(text)}
                />

                <Button title="Save" onPress={editMarkerTitle} />
                <Button
                  title="Remove"
                  onPress={() => removeMarker(index)}
                ></Button>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  editMarkerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editMarkerInput: {
    flex: 1,
    marginRight: 10,
  },
});

export default Map;
