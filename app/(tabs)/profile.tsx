import { View, Text, Button } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { removeTokenFromStorage } from "@/utils/asyncStorage";
import { useRouter } from "expo-router";

const Profile = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  return (
    <View>
      <Text>{user?.fullName}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.role}</Text>
      <Button
        title="Logout"
        onPress={() => {
          removeTokenFromStorage().then(() => {
            router.replace("/(auth)/sign-in");
          });
        }}
      />
    </View>
  );
};

export default Profile;
