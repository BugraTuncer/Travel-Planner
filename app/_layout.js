import { Stack } from "expo-router";
import React from "react";

export default function Root() {
  return (
    <Stack>
      <Stack.Screen name="planner" />
    </Stack>
  );
}
