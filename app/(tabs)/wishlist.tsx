import { View, Text, FlatList, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { posts } from ".";
import PostCard from "@/components/postCard/PostCard";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";

const Wishlist = () => {
  return (
    <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: fontsizes.subTitle,
            fontWeight: "semibold",
            color: color.balck,
          }}
        >
          WishList
        </Text>
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
    </SafeAreaView>
  );
};

export default Wishlist;
