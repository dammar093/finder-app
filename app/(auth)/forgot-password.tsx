import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import color from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/custiomInput/CustomInput";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import iconsizes from "@/constants/IconSizes";
import CustomButton from "@/components/customButton/CustomButton";
import fontsizes from "@/constants/Fontsizes";
import emailValidation from "@/utils/emailValidation";
import validationMessages from "@/constants/validationMessages";
import CustomErrorText from "@/components/customErrorText/CustomErrorText";
import { useRouter } from "expo-router";
import atuh from "@/api/auth";

const ForgotPasword = () => {
  const [formValue, setFormValue] = useState({ email: "" });
  const [formError, setFormError] = useState({
    emailError: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmail = (value: string) => {
    setError("");
    setFormValue((prev) => ({ ...prev, email: value }));
    const validEmail = emailValidation(value);
    if (!validEmail) {
      setFormError((prev) => ({
        ...prev,
        emailError: validationMessages.email.invalidEmail,
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        emailError: "",
      }));
    }
  };

  const handleSumbit = () => {
    if (formValue?.email.trim() === "") {
      setFormError((prev) => ({
        ...prev,
        emailError: validationMessages?.email?.required,
      }));
    }

    if (formError?.emailError == "" && formValue?.email !== "") {
      setLoading(true);
      atuh
        .forgotPassword(formValue?.email)
        .then((res) => {
          router.push({
            pathname: "/(auth)/verify-otp",
            params: { email: formValue.email },
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
            source={require("../../assets/images/logo-large.png")}
            resizeMode="contain"
          />
        </View>
        <Text style={{ fontSize: fontsizes.subTitle, fontWeight: "bold" }}>
          Forgot Password
        </Text>
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
            Please confirm your email address where the opt will be sent
          </Text>
          <CustomInput
            secureTextEntry={false}
            placeholder="Enter your Email"
            onChangeText={handleEmail}
            value={formValue?.email}
            icon={
              <MaterialIcons
                name="email"
                size={iconsizes.md}
                color={color.lightBlack}
              />
            }
          />
          {formError?.emailError && (
            <CustomErrorText error={formError?.emailError} />
          )}
        </View>

        <View style={[styles.inputWrapper, { marginTop: "25%" }]}>
          <CustomButton
            loading={loading}
            onPress={handleSumbit}
            title="Request Password Reset"
          />
        </View>
      </View>
      <StatusBar backgroundColor={color.white} barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default ForgotPasword;

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
    borderRadius: "50%",
    backgroundColor: color.lightGreen,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "70%",
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
