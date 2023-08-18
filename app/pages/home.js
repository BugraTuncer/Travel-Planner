import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

const Home = () => {
  return (
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
  );
};

export default Home;
