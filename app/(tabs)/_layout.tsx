import React from "react";
import { Tabs } from "expo-router";
import MyTabBar from "@/components/myTabar/MyTabBar";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="wishlist" />
      <Tabs.Screen name="post" />
      <Tabs.Screen name="message" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabLayout;
