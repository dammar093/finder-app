import { KeyboardAvoidingView, StyleSheet, Keyboard, View } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import color from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import iconsizes from "@/constants/IconSizes";
import FontAwesome6 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import fontsizes from "@/constants/Fontsizes";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const icons: { [key: string]: JSX.Element } = {
    index: (
      <Feather name="search" size={iconsizes.lg} color={color.lightBlack} />
    ),
    wishlist: (
      <FontAwesome6 name="heart" size={iconsizes.lg} color={color.lightBlack} />
    ),
    post: (
      <AntDesign
        name="pluscircleo"
        size={iconsizes.lg}
        color={color.lightBlack}
      />
    ),
    message: (
      <Feather
        name="message-square"
        size={iconsizes.lg}
        color={color.lightBlack}
      />
    ),
    profile: (
      <AntDesign name="user" size={iconsizes.lg} color={color.lightBlack} />
    ),
  };

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <KeyboardAvoidingView style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        if (["_sitemap", "+not_font"].includes(route.name)) return null;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBarItem]}
          >
            {React.cloneElement(icons[route.name as keyof typeof icons], {
              color: isFocused ? color.primary : color.lightBlack,
            })}
            <Text
              style={{
                color: isFocused ? color.primary : color.lightBlack,
                fontSize: fontsizes.span,
                textTransform: "capitalize",
                fontWeight: "semibold",
              }}
            >
              {label === "index" ? "Explore" : label}
            </Text>
          </PlatformPressable>
        );
      })}
    </KeyboardAvoidingView>
  );
}
export default MyTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 6,
    borderRadius: 10,
    borderCurve: "continuous",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    elevation: 0.5,
    shadowOpacity: 0.1,
    backgroundColor: color.white,
    boxShadow: "0px -1px 0px rgba(0, 0, 0, 0.1)",
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
