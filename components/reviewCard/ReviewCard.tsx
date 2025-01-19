import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import { ReviewsProps } from "@/app/(user)/[id]";
import fontsizes from "@/constants/Fontsizes";
import color from "@/constants/Colors";

const ReviewCard: FC<ReviewsProps> = (data) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontSize: fontsizes.paragraph,
            fontWeight: "semibold",
            color: color.lightBlack,
          }}
        >
          “{data?.review.substring(0, 150)}”
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
            marginVertical: 10,
          }}
        >
          <Image
            width={50}
            height={50}
            source={{
              uri: data?.profile,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: fontsizes.paragraph,
              fontWeight: "semibold",
              color: color?.balck,
            }}
          >
            {data?.fullname?.split(" ")[0]}
          </Text>
          <Text
            style={{
              fontSize: fontsizes.span,
              color: color?.lightBlack,
            }}
          >
            {data?.date.toDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: 320,
    height: 200,
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
  },
});
