import { View, Text } from "react-native";
import React from "react";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";

const CustomErrorText = ({ error }: { error: string }) => {
  return (
    <Text style={{ color: color.red, fontSize: fontsizes.span }}>{error}</Text>
  );
};

export default CustomErrorText;
