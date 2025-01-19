import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { FC } from "react";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";
interface buttonProps {
  onPress: () => void;
  onLongPress?: () => void;
  buttonStyle?: any;
  title: string;
  textStyle?: any;
  loading?: boolean;
}

const CustomButton: FC<buttonProps> = ({
  onPress,
  onLongPress,
  buttonStyle,
  title,
  textStyle,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[buttonStyle, styles.button, { opacity: loading ? 0.7 : 1 }]}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={color.white} size={30} />
      ) : (
        <Text style={[textStyle, styles.title]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: color.primary,
    borderRadius: 10,
    height: 60,
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    fontSize: fontsizes.button,
    fontWeight: "900",
    color: color.white,
  },
});
