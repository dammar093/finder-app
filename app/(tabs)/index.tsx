import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import iconsizes from "@/constants/IconSizes";
import Ionicons from "@expo/vector-icons/Ionicons";
import fontsizes from "@/constants/Fontsizes";
import PostCard from "@/components/postCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, selectToken } from "@/redux/store";
import { setCateGories } from "@/redux/slices/categorySlice";
import category from "@/api/category";
import property from "@/api/peroperty";
import { setProperties } from "@/redux/slices/propertySlice";
import Loader from "@/components/loader/Loader";

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { token } = useSelector(selectToken);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const properties = useSelector(
    (state: RootState) => state.properties.properties
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // fetch categories from api
    setLoading(true);
    category
      .getCategories(token)
      .then((res) => {
        dispatch(setCateGories(res.data?.data));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    property
      .getProperties(token)
      .then((res) => {
        dispatch(setProperties(res.data?.data));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

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
              gap: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {categories.length > 0 &&
              categories.map((category, i) => (
                <TouchableOpacity
                  onPress={() => setIndex(i)}
                  key={category._id}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      padding: 3,
                      backgroundColor:
                        i === index ? color.lightPrimary : color.garyWhite,
                    }}
                  >
                    <Text
                      style={{
                        color: i === index ? color.primary : color.lightBlack,
                        fontSize: fontsizes.span,
                        textTransform: "capitalize",
                        padding: 6,
                        fontWeight: "bold",
                      }}
                    >
                      {category?.name}
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
            data={properties}
            renderItem={({ item }) => <PostCard {...item} key={item._id} />}
            keyExtractor={(item) => item._id}
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
    shadowColor: color.balck,
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
