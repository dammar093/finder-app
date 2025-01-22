import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import iconsizes from "@/constants/IconSizes";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { AppDispatch, RootState, selectToken } from "@/redux/store";
import { togglePost } from "@/redux/slices/wishlist";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";
import Devider from "@/components/divider/Devider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Property } from "@/redux/slices/propertySlice";
import property from "@/api/peroperty";

const Post = () => {
  const [propertyData, setPropertyData] = useState<Property>();
  const { id } = useLocalSearchParams();
  const wishlist = useSelector((state: RootState) => state.wishlist.posts);
  const { token } = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    property.getProperty(token, id.toString()).then((res) => {
      console.log(res.data.data);

      setPropertyData(res.data?.data);
    });
  }, [id]);

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
          {propertyData?.images.map((image, index) => (
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
          {propertyData?.title}
        </Text>
        <Text
          style={{
            color: color.balck,
            fontSize: fontsizes.paragraph,
            fontWeight: "semibold",
          }}
        >
          {propertyData?.location}
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
            params: { id: propertyData?.user?._id! },
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
              {propertyData?.user?.profile ? (
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: propertyData?.user?.profile,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Text
                  style={{
                    fontSize: fontsizes.title,
                    color: color.primary,
                    fontWeight: "bold",
                  }}
                >
                  {String(propertyData?.user?.fullName[0])}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: fontsizes.paragraph,
                  fontWeight: "bold",
                  color: color.balck,
                }}
              >
                {propertyData?.user?.fullName}
              </Text>
              <Text
                style={{ fontSize: fontsizes.span, color: color.lightBlack }}
              >
                Host ● 7 years hosting
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
                `whatsapp://send?phone=${propertyData?.user?.phoneNumber}`
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
          {propertyData?.services?.map((service) => (
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
          {propertyData?.description}
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
              latitude: propertyData?.latitude!,
              longitude: propertyData?.longitude!,
              latitudeDelta: 0.0045,
              longitudeDelta: 0.0045,
            }}
          >
            <Marker
              coordinate={{
                latitude: propertyData?.latitude!,
                longitude: propertyData?.longitude!,
              }}
              title={propertyData?.title}
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
    borderWidth: 2,
    borderColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
});
