import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(post)" />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
