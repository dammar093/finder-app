import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import color from "@/constants/Colors";
import { posts } from "../(tabs)";
import fontsizes from "@/constants/Fontsizes";
import Devider from "@/components/divider/Devider";
import Fontisto from "@expo/vector-icons/Fontisto";
import iconsizes from "@/constants/IconSizes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ReviewCard from "@/components/reviewCard/ReviewCard";
import PostCard from "@/components/postCard/PostCard";
export interface ReviewsProps {
  id: string;
  review: string;
  fullname: string;
  profile: string;
  date: Date;
}

const reviews: ReviewsProps[] = [
  {
    id: "1",
    fullname: "John Doe",
    profile:
      "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
    review:
      "I returned to Ba Hao Residence after staying in the same room in 2017, and it was just as wonderful as I remembered. This place truly heals my soul, and I’m so happy to be back. Bua and Note are amazing, wonderful people, and every detail of the space reflects their care and passion. Highly recommend!",
    date: new Date(new Date().getDate()),
  },
  {
    id: "2",
    fullname: "John Doe",
    profile:
      "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
    review:
      "I returned to Ba Hao Residence after staying in the same room in 2017, and it was just as wonderful as I remembered. This place truly heals my soul, and I’m so happy to be back. Bua and Note are amazing, wonderful people, and every detail of the space reflects their care and passion. Highly recommend!",
    date: new Date(new Date().getDate()),
  },
  {
    id: "3",
    fullname: "John Doe",
    profile:
      "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
    review:
      "I returned to Ba Hao Residence after staying in the same room in 2017, and it was just as wonderful as I remembered. This place truly heals my soul, and I’m so happy to be back. Bua and Note are amazing, wonderful people, and every detail of the space reflects their care and passion. Highly recommend!",
    date: new Date(new Date().getDate()),
  },
];
const User = () => {
  const { id } = useLocalSearchParams();
  const post = posts.find((post) => post?.user?.id == id);

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
              }}
            >
              <Image
                width={120}
                height={120}
                source={{
                  uri: post?.user?.profile,
                }}
                resizeMode="cover"
              />
            </View>
            <Text
              style={{
                fontSize: fontsizes.title,
                fontWeight: "bold",
                color: color.balck,
              }}
            >
              {post?.user?.fullName.split(" ")[0]}
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
            {post?.location}
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
          {post?.user?.fullName?.split(" ")[0]}'s reviews
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
          {reviews.map(({ id, review, fullname, profile, date }) => (
            <ReviewCard
              key={id}
              id={id}
              review={review}
              fullname={fullname}
              profile={profile}
              date={date}
            />
          ))}
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
          {post?.user?.fullName?.split(" ")[0]}'s available assets
        </Text>
        <View style={{ flex: 1, position: "relative" }}>
          {posts.map((post) => (
            <PostCard key={post?.id} {...post} />
          ))}
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
