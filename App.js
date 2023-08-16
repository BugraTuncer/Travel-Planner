import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Travel Planner Eko-Bubu</Text>
      <Entypo
        name="add-to-list"
        size={36}
        color="black"
        onPress={(e) => router.push("/planner")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: "30px",
    marginBottom: "30px",
  },
});
