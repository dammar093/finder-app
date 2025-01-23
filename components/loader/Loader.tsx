import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import color from "@/constants/Colors";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF5A5F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: color.white,
  },
});

export default Loader;
