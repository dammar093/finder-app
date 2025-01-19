import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { posts } from "../(tabs)";
import AntDesign from "@expo/vector-icons/AntDesign";
import iconsizes from "@/constants/IconSizes";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { AppDispatch, RootState } from "@/redux/store";
import { togglePost } from "@/redux/slices/wishlist";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";
import Devider from "@/components/divider/Devider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Post = () => {
  const { id } = useLocalSearchParams();
  const wishlist = useSelector((state: RootState) => state.wishlist.posts);
  const post = posts.find((post) => post.id == id);
  const dispatch = useDispatch<AppDispatch>();

  //function to handle toggle wishlist
  const handleToggleWishlist = (id: string) => {
    dispatch(togglePost(id));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.cotainer}>
      <View style={{ width: "100%", height: 300, position: "relative" }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            height: 300,
            flexDirection: "row",
            position: "relative",
          }}
        >
          {post?.images.map((image, index) => (
            <View
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
            </View>
          ))}
        </ScrollView>
        <Pressable
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: 5,
            borderRadius: 50,
            opacity: 0.8,
          }}
          onPress={() => handleToggleWishlist(id.toString())}
        >
          <AntDesign
            name="heart"
            size={iconsizes.md}
            color={
              wishlist?.includes(id.toString()) ? color.primary : color.balck
            }
          />
        </Pressable>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: fontsizes.subTitle,
            fontWeight: "bold",
            color: color.balck,
          }}
        >
          {post?.title}
        </Text>
        <Text
          style={{
            color: color.balck,
            fontSize: fontsizes.paragraph,
            fontWeight: "semibold",
          }}
        >
          {post?.location}
        </Text>
      </View>
      <Devider />
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href={{
            pathname: "/(user)/[id]",
            params: { id: post?.user?.id! },
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "75%",
            }}
          >
            <View style={styles.profileContainer}>
              <Image
                style={{ width: 70, height: 70 }}
                source={{
                  uri: post?.user?.profile,
                }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: fontsizes.paragraph,
                  fontWeight: "bold",
                  color: color.balck,
                }}
              >
                {post?.user?.fullName}
              </Text>
              <Text
                style={{ fontSize: fontsizes.span, color: color.lightBlack }}
              >
                Host ● {post?.user?.year} years hosting
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <AntDesign name="star" color={color.balck} size={16} />
                <Text
                  style={{ fontSize: fontsizes.paragraph, fontWeight: "bold" }}
                >
                  5
                </Text>
              </View>
            </View>
          </View>
        </Link>
        <View
          style={{
            width: "16%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={() =>
              Linking.openURL(
                `whatsapp://send?phone=${post?.user?.phoneNumber}`
              )
            }
          >
            <FontAwesome5
              name="whatsapp"
              color={color.balck}
              size={iconsizes.xl}
            />
          </Pressable>
        </View>
      </View>
      <Devider />
      <View style={{ gap: 5, paddingVertical: 10 }}>
        <Text
          style={{
            fontSize: fontsizes.paragraph,
            fontWeight: "bold",
            color: color.balck,
          }}
        >
          Services:
        </Text>
        <View>
          {post?.sevices?.map((service) => (
            <Text
              style={{
                fontSize: fontsizes.span,
                fontWeight: "semibold",
                color: color.lightBlack,
              }}
              key={service}
            >
              ● {service}
            </Text>
          ))}
        </View>
      </View>
      <Devider />

      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: fontsizes.paragraph,
            color: color.balck,
            textAlign: "justify",
          }}
        >
          {post?.description}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: fontsizes.subTitle,
            fontWeight: "semibold",
            color: color.balck,
            marginVertical: 10,
          }}
        >
          Find me by the location
        </Text>
        <View
          style={{
            height: 450,
            width: "100%",
            paddingBottom: 20,
            borderRadius: 10,
          }}
        >
          <MapView
            style={{ flex: 1, borderRadius: 20 }}
            initialRegion={{
              latitude: post?.latitude!,
              longitude: post?.longitude!,
              latitudeDelta: 0.0045,
              longitudeDelta: 0.0045,
            }}
          >
            <Marker
              coordinate={{
                latitude: post?.latitude!,
                longitude: post?.longitude!,
              }}
              title={post?.title}
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Post;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 8,
    backgroundColor: color.white,
  },
  profileContainer: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    overflow: "hidden",
  },
});
