import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import iconsizes from "@/constants/IconSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import fontsizes from "@/constants/Fontsizes";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import PostCard from "@/components/postCard/PostCard";
interface Categories {
  id: string;
  name: string;
  icon: React.ReactNode;
}
const categories: Categories[] = [
  {
    id: "1",
    name: "Room",
    icon: <Ionicons name="home" size={iconsizes.lg} color={color.lightBlack} />,
  },
  {
    id: "2",
    name: "Land",
    icon: (
      <MaterialCommunityIcons
        name="island"
        size={iconsizes.lg}
        color={color.lightBlack}
      />
    ),
  },
  {
    id: "3",
    name: "Car",
    icon: <AntDesign name="car" size={iconsizes.lg} color={color.lightBlack} />,
  },
  {
    id: "4",
    name: "Bike",
    icon: (
      <MaterialCommunityIcons
        name="motorbike-electric"
        size={iconsizes.lg}
        color={color.lightBlack}
      />
    ),
  },
  {
    id: "5",
    name: "Mobile",
    icon: (
      <AntDesign name="mobile1" size={iconsizes.lg} color={color.lightBlack} />
    ),
  },
  {
    id: "6",
    name: "Animal",
    icon: (
      <MaterialCommunityIcons
        name="cow"
        size={iconsizes.lg}
        color={color.lightBlack}
      />
    ),
  },
];
export interface User {
  fullName: string;
  role: string;
  id: string;
  profile: string;
  year: number;
  phoneNumber: string;
}
export interface Posts {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  price: number;
  user: User;
  sevices: string[];
  latitude: number;
  longitude: number;
}

export const posts: Posts[] = [
  {
    id: "1",
    title: "Marvel Boys Hostel",
    description:
      "We always love to extend a pleasurable stay and will be more than happy to show you around the area, for which tours & transportation can be arranged. We can also help to customise your trip based on your plan. Extra meals along with additional services like Laundry, Dry Cleaning, Photocopying, and Grocery deliveries can be arranged for on request. Customers are requested to respect the property and the rules of the BnB, the hotel staff will always be at your service. Thank You!",
    images: [
      "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
      "https://www.hotelcontractbeds.co.uk/media/3183/hotel-room.jpg",
    ],
    location: "Kathmandu, Koteshwor",
    latitude: 27.679976726701263,
    longitude: 85.34573817370716,
    price: 10000,
    sevices: ["Free Wifi", "Free Water", "Free Electricity"],
    user: {
      id: "1",
      fullName: "Dammar Singh Rana",
      role: "user",
      profile:
        "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp",
      year: 10,
      phoneNumber: "+9779824659193",
    },
  },
  {
    id: "2",
    title: "Salon de Kathmandu B&B - Room",
    description:
      "Stay at safe and clean place during your stay in Kathmandu! Lazimpat is popular residential area for both foreign and wealthy local people because of its very clean, convenient and safe environment. The city center, Durbar Marg and Thamel, is all located in walking distance. Convenient location, safe area, super clean house with beautiful garden and good foods, any reason to hesitate? :)",
    images: [
      "https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOwKx7dPv6Q8WkA3ZmEnDFab0hNV1Q35MGQ&s",
    ],
    location: "Latitpur, Balkumari",
    latitude: 27.679976726701263,
    longitude: 85.34573817370716,
    price: 12000,
    sevices: ["Free Wifi", "Free Water", "Free Electricity"],
    user: {
      id: "2",
      fullName: "Deepak Raj Pandey",
      role: "user",
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTacBEOxzVt2idhxO0WXyuPKzHanDF8qupFBJSWQAuy0dk324BY92xqKOgh17AdWsx4-tk&usqp=CAU",
      year: 8,
      phoneNumber: "+9779862460349",
    },
  },
  {
    id: "3",
    title: "Room",
    description: "Room for rent in Kathmandu",
    images: [
      "https://gladstonehouse.agencydominion.net/uploads/2024/07/Book-Direct-rect-2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUowi73UzREwbLtZw0Q26rkbfwj40IGy3IJg&s",
    ],
    location: "Kathmandu, New Baneshwor",
    latitude: 27.679976726701263,
    longitude: 85.34573817370716,
    price: 20000,
    sevices: ["Free Wifi", "Free Water", "Free Electricity"],
    user: {
      id: "3",
      fullName: "Birendra Singh Rana",
      role: "user",
      profile:
        "https://pics.craiyon.com/2024-07-09/HoDtX3s0SQefffp4FG5-3w.webp",
      year: 5,
      phoneNumber: "+9779824659193",
    },
  },
];
const Home = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.topContainer}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.inputWrapper}>
              <Feather name="search" size={iconsizes.md} color={color.balck} />
              <TextInput style={styles.search} placeholder="Search here." />
            </View>
            <View style={{ padding: 10 }}>
              <Ionicons
                name="notifications"
                size={iconsizes.lg}
                color={color.balck}
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  width: 25,
                  height: 25,
                  right: 0,
                  borderRadius: 50,
                  backgroundColor: color.red,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Text
                  style={{
                    color: color.white,
                    fontSize: fontsizes.span,
                    fontWeight: "semibold",
                  }}
                >
                  9+
                </Text>
              </View>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              height: 70,
              gap: 45,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {categories.map((category, i) => (
              <TouchableOpacity onPress={() => setIndex(i)} key={category?.id}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {React.cloneElement(category.icon as React.ReactElement, {
                    color: i === index ? color.primary : color.lightBlack,
                  })}
                  <Text
                    style={{
                      color: i === index ? color.primary : color.lightBlack,
                      fontSize: fontsizes.span,
                    }}
                  >
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            marginBottom: 35,
          }}
        >
          <FlatList
            data={posts}
            renderItem={({ item }) => <PostCard {...item} key={item.id} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 65, gap: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <StatusBar barStyle="dark-content" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  topContainer: {
    width: "100%",
    height: 140,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 0.5,
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  inputWrapper: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: "80%",
    flexDirection: "row",
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 1,
    boxShadow:
      "-0.5 -0.5 0.5 0.5 rgba(0, 0, 0, 0.1), 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1)",
  },
  search: {
    width: "90%",
    height: "100%",
    paddingHorizontal: 5,
  },
});
