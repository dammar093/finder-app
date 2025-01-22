import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";
import Devider from "@/components/divider/Devider";
import Fontisto from "@expo/vector-icons/Fontisto";
import iconsizes from "@/constants/IconSizes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ReviewCard from "@/components/reviewCard/ReviewCard";
import PostCard from "@/components/postCard/PostCard";
import { UserState } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const User = () => {
  const properties = useSelector(
    (state: RootState) => state.properties.properties
  );
  const { id } = useLocalSearchParams();
  const property = properties.find((property) => property?.user._id === id);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: color.white,
        paddingHorizontal: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={styles.boxContainer}>
          <View
            style={{
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                borderWidth: 2,
                borderColor: color.primary,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {property?.user?.profile ? (
                <Image
                  width={120}
                  height={120}
                  source={{
                    uri: property?.user?.profile,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Text
                  style={{
                    fontSize: 50,
                    color: color.primary,
                    fontWeight: "bold",
                  }}
                >
                  {String(property?.user?.fullName[0])}
                </Text>
              )}
            </View>
            <Text
              style={{
                fontSize: fontsizes.title,
                fontWeight: "bold",
                color: color.balck,
              }}
            >
              {property?.user?.fullName.split(" ")[0]}
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <View style={{ width: "100%", paddingVertical: 10 }}>
              <Text
                style={{
                  fontSize: fontsizes.subTitle,
                  color: color.balck,
                  fontWeight: "bold",
                }}
              >
                12
              </Text>
              <Text
                style={{
                  fontSize: fontsizes.span,
                  color: color.lightBlack,
                }}
              >
                Reviews
              </Text>
            </View>
            <Devider />
            <View style={{ width: "100%", paddingVertical: 10 }}>
              <Text
                style={{
                  fontSize: fontsizes.subTitle,
                  color: color.balck,
                  fontWeight: "bold",
                }}
              >
                4.5★
              </Text>
              <Text
                style={{
                  fontSize: fontsizes.span,
                  color: color.lightBlack,
                }}
              >
                Reviews
              </Text>
            </View>
            <Devider />
            <View style={{ width: "100%", paddingVertical: 10 }}>
              <Text
                style={{
                  fontSize: fontsizes.subTitle,
                  color: color.balck,
                  fontWeight: "bold",
                }}
              >
                3
              </Text>
              <Text
                style={{
                  fontSize: fontsizes.span,
                  color: color.lightBlack,
                }}
              >
                Years of hosting
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <View style={{ flexDirection: "row", padding: 10, gap: 10 }}>
          <Fontisto name="date" color={color.lightBlack} size={iconsizes.md} />
          <Text
            style={{ fontSize: fontsizes.paragraph, fontWeight: "semibold" }}
          >
            Born in 2000
          </Text>
        </View>
        <View style={{ flexDirection: "row", padding: 10, gap: 10 }}>
          <FontAwesome
            name="language"
            color={color.lightBlack}
            size={iconsizes.md}
          />
          <Text
            style={{ fontSize: fontsizes.paragraph, fontWeight: "semibold" }}
          >
            Nepali and English
          </Text>
        </View>
        <View style={{ flexDirection: "row", padding: 10, gap: 10 }}>
          <Entypo
            name="location"
            color={color.lightBlack}
            size={iconsizes.md}
          />
          <Text
            style={{ fontSize: fontsizes.paragraph, fontWeight: "semibold" }}
          >
            {property?.location}
          </Text>
        </View>
      </View>
      <Devider />
      <View style={{ marginVertical: 20 }}>
        <Text
          style={{
            fontSize: fontsizes.subTitle,
            fontWeight: "semibold",
            color: color.balck,
          }}
        >
          {property?.user?.fullName?.split(" ")[0]}'s reviews
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            marginVertical: 20,
            gap: 20,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* {reviews.map(({ id, review, fullname, profile, date }) => (
            <ReviewCard
              key={id}
              id={id}
              review={review}
              fullname={fullname}
              profile={profile}
              date={date}
            />
          ))} */}
        </ScrollView>
      </View>
      <Devider />
      <View style={{ marginVertical: 20 }}>
        <Text
          style={{
            fontSize: fontsizes.subTitle,
            fontWeight: "semibold",
            color: color.balck,
          }}
        >
          {property?.user?.fullName?.split(" ")[0]}'s available assets
        </Text>
        <View style={{ flex: 1, position: "relative" }}>
          {/* {property.map((post) => (
            <PostCard key={post?.id} {...post} />
          ))} */}
        </View>
      </View>
      <StatusBar barStyle="dark-content" />
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  boxContainer: {
    width: "100%",
    height: 250,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    boxShadow:
      "-1px -1px 2px 2px rgba(0,0,0,0.1), 1px 1px 2px 2px rgba(0,0,0,0.1)",
    borderRadius: 10,
    flexDirection: "row",
  },
});
