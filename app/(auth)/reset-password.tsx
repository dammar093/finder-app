import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import React, { useState } from "react";
import color from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/custiomInput/CustomInput";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import iconsizes from "@/constants/IconSizes";
import CustomButton from "@/components/customButton/CustomButton";
import fontsizes from "@/constants/Fontsizes";
import validationMessages from "@/constants/validationMessages";
import passwordValidation from "@/utils/passwordValidation";
import CustomErrorText from "@/components/customErrorText/CustomErrorText";
import { useLocalSearchParams, useRouter } from "expo-router";
import atuh from "@/api/auth";
import { setToken } from "@/utils/asyncStorage";

const SignIn = () => {
  const [formValue, setFormValue] = useState({ password: "", confirm: "" });
  const [formError, setFormError] = useState({
    passwordError: "",
    confirmError: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { email, otp } = useLocalSearchParams();

  const handlePassword = (value: string) => {
    setError("");
    setFormValue((prev) => ({ ...prev, password: value }));
    const validPassword = passwordValidation(value);
    if (validPassword) {
      setFormError((prev) => ({
        ...prev,
        passwordError: validationMessages.password.length,
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        passwordError: "",
      }));
    }
  };

  const handleConfirmPassword = (value: string) => {
    setError("");
    setFormValue((prev) => ({ ...prev, confirm: value }));
    if (value !== formValue?.password) {
      setFormError((prev) => ({
        ...prev,
        confirmError: "Confirm password does not match",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        confirmError: "",
      }));
    }
  };
  const handleSumbit = () => {
    if (formValue?.password.trim() === "") {
      setFormError((prev) => ({
        ...prev,
        passwordError: validationMessages?.email?.required,
      }));
    }
    if (formValue?.confirm.trim() === "") {
      setFormError((prev) => ({
        ...prev,
        confirmError: "Confirm password is required",
      }));
    }
    if (
      formError?.passwordError === "" &&
      formError?.confirmError == "" &&
      formValue?.password !== "" &&
      formValue?.confirm !== ""
    ) {
      setLoading(true);
      atuh
        .resetPassword(otp.toString(), email.toString(), formValue?.password)
        .then((res) => {
          setToken(res.data.data).then(() => {
            console.log(res.data);
            router.replace("/(auth)/sign-in");
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
          Reset Password
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
          <CustomInput
            secureTextEntry={true}
            placeholder="Enter your password"
            onChangeText={handlePassword}
            value={formValue?.password}
            icon={
              <MaterialIcons
                name="lock"
                size={iconsizes.md}
                color={color.lightBlack}
              />
            }
          />
          {formError?.passwordError && (
            <CustomErrorText error={formError?.passwordError} />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <CustomInput
            secureTextEntry={true}
            placeholder="Confirm your password"
            onChangeText={handleConfirmPassword}
            value={formValue?.confirm}
            icon={
              <MaterialIcons
                name="lock"
                size={iconsizes.md}
                color={color.lightBlack}
              />
            }
          />
          {formError?.confirmError && (
            <CustomErrorText error={formError?.confirmError} />
          )}
        </View>

        <View style={[styles.inputWrapper]}>
          <CustomButton
            loading={loading}
            onPress={handleSumbit}
            title="Reset Password"
          />
        </View>
      </View>
      <StatusBar backgroundColor={color.white} barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default SignIn;

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
