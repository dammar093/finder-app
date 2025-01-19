import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useState } from "react";
import { Posts } from "@/app/(tabs)";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";
import AntDesign from "@expo/vector-icons/AntDesign";
import iconsizes from "@/constants/IconSizes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { togglePost } from "@/redux/slices/wishlist";
import { Link } from "expo-router";

const PostCard = (props: Posts) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.wishlist.posts);

  //function to handle scroll image
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / 372);
    setCurrentIndex(index);
  };
  const handleToggleWishlist = (id: string) => {
    dispatch(togglePost(id));
  };
  return (
    <View style={styles.postCard}>
      <View style={{ width: "100%", height: 300, position: "relative" }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            height: 300,
            flexDirection: "row",
            position: "relative",
          }}
        >
          {props?.images.map((image, index) => (
            <Link
              href={{
                pathname: "/(post)/[id]",
                params: { id: props?.id },
              }}
              key={index}
              style={{
                height: 300,
                width: 372,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                resizeMode="cover"
              />
            </Link>
          ))}
        </ScrollView>
        <View style={styles.dotsContainer}>
          {props?.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: index === currentIndex ? 1 : 0.5 },
              ]}
            />
          ))}
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View style={{ flex: 2 }}>
          <Text
            style={{
              color: color.lightBlack,
              fontSize: fontsizes.paragraph,
              fontWeight: "bold",
            }}
          >
            {props?.location}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end", flexDirection: "row" }}>
          <Text
            style={{
              color: color.balck,
              fontSize: fontsizes.paragraph,
              fontWeight: "bold",
            }}
          >
            Rs. {props?.price}
          </Text>
          <Text>/Month</Text>
        </View>
      </View>
      <Pressable
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: 5,
          borderRadius: 50,
          opacity: 0.8,
        }}
        onPress={() => handleToggleWishlist(props?.id)}
      >
        <AntDesign
          name="heart"
          size={iconsizes.md}
          color={wishlist?.includes(props?.id) ? color.primary : color.balck}
        />
      </Pressable>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postCard: {
    width: "100%",
    height: 350,
    marginTop: 20,
    position: "relative",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
    zIndex: 100,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: color.primary,
    marginHorizontal: 4,
  },
});
