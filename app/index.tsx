import CustomButton from "@/components/customButton/CustomButton";
import color from "@/constants/Colors";
import fontsizes from "@/constants/Fontsizes";
import { AppDispatch, RootState, selectToken } from "@/redux/store";
import { getToken } from "@/utils/asyncStorage";
import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setToken as settingToken } from "@/redux/slices/tokenSlice";
import atuh from "@/api/auth";
import { setUser } from "@/redux/slices/userSlice";

export default function App() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector(selectToken);
  useEffect(() => {
    getToken().then((res) => {
      //@ts-ignore
      dispatch(settingToken(res));
      if (token) getLoggedInUser();
    });
  }, [token]);

  const getLoggedInUser = async () => {
    atuh.loggedInUser(token).then((res) => {
      console.log(res.data.data);

      dispatch(setUser(res.data.data));
    });
  };
  if (token) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View>
          <Image
            source={require("../assets/images/logo-large.png")}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>FINDER</Text>
        <Text style={styles.subTitle}>SEARCH WHAT YOU WANT</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={() => {
            router.replace("/(auth)/sign-in");
          }}
          title="Get Started"
        />
      </View>
      <StatusBar backgroundColor={color.white} barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  logoContainer: {
    gap: 10,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontsizes.title,
    fontWeight: "bold",
    letterSpacing: 20,
  },
  subTitle: {
    fontSize: fontsizes.subTitle,
    fontWeight: "semibold",
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
});
