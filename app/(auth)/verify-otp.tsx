import { View, StyleSheet, StatusBar, Image, Text } from "react-native";
import React, { useState } from "react";
import color from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomErrorText from "@/components/customErrorText/CustomErrorText";
import { OtpInput } from "react-native-otp-entry";
import { useRouter } from "expo-router";
import atuh from "@/api/auth";
import fontsizes from "@/constants/Fontsizes";
import CustomButton from "@/components/customButton/CustomButton";
import { useLocalSearchParams } from "expo-router";

const VerifyOtp = () => {
  const [formValue, setFormValue] = useState({ otp: "" });
  const [formError, setFormError] = useState({
    otpError: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const handleOtp = (value: string) => {
    setFormValue((prev) => ({ ...prev, otp: value }));
  };

  const handleSumbit = () => {
    if (formValue?.otp?.length < 6) {
      setFormError((prev) => ({
        ...prev,
        otpError: "Otp is required",
      }));
    }

    if (formError?.otpError == "" && formValue?.otp !== "") {
      setLoading(true);
      atuh
        .verifyOtp(email.toString(), formValue?.otp)
        .then((res) => {
          router.replace({
            pathname: "/(auth)/reset-password",
            params: { email, otp: formValue.otp },
          });
        })
        .catch((err) => {
          setError(err?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.image}
            source={require("../../assets/images/otp.gif")}
            width={100}
            resizeMode="contain"
            onError={(error) =>
              console.log("Image loading error: ", error.nativeEvent.error)
            }
          />
        </View>
      </View>

      <View style={styles.formContainer}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error && <CustomErrorText error={error} />}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={{ fontSize: fontsizes.span, color: color.lightBlack }}>
            Enter otp to verify your account
          </Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => handleOtp(text)}
          />
          {formError?.otpError && (
            <CustomErrorText error={formError?.otpError} />
          )}
        </View>
        <View style={[styles.inputWrapper, { marginTop: "25%" }]}>
          <CustomButton
            loading={loading}
            onPress={handleSumbit}
            title="Verify OTP"
          />
        </View>
      </View>
      <StatusBar backgroundColor={color.white} barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    gap: "10%",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logoWrapper: {
    height: 150,
    width: 150,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    flex: 1.5,
    paddingHorizontal: 20,
    gap: 25,
  },
  inputWrapper: {
    width: "100%",
    gap: 5,
  },
});
