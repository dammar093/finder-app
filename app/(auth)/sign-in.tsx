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
import passwordValidation from "@/utils/passwordValidation";
import CustomErrorText from "@/components/customErrorText/CustomErrorText";
import { Link, useRouter } from "expo-router";
import atuh from "@/api/auth";
import { setToken } from "@/utils/asyncStorage";

const SignIn = () => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({
    emailError: "",
    passwordError: "",
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

  const handleSumbit = () => {
    if (formValue?.email.trim() === "") {
      setFormError((prev) => ({
        ...prev,
        emailError: validationMessages?.email?.required,
      }));
    }
    if (formValue?.password.trim() === "") {
      setFormError((prev) => ({
        ...prev,
        passwordError: validationMessages?.password?.required,
      }));
    }
    if (
      formError?.passwordError === "" &&
      formError?.emailError == "" &&
      formValue?.email !== "" &&
      formValue?.password !== ""
    ) {
      setLoading(true);
      atuh
        .singIn(formValue)
        .then((res) => {
          setToken(res.data.data).then(() => {
            router.replace("/(tabs)");
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
          Welcome Back!
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
        <View style={[styles.inputWrapper, { alignItems: "flex-end" }]}>
          <Pressable
            style={{ width: 160 }}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: fontsizes.span,
            fontWeight: "bold",
            color: color.lightBlack,
          }}
        >
          Didn't have an account?{" "}
          <Link style={{ color: color.blue }} href={"/(auth)/sign-up"}>
            Register
          </Link>
        </Text>
        <View style={[styles.inputWrapper]}>
          <CustomButton
            loading={loading}
            onPress={handleSumbit}
            title="Login"
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
  forgotPassword: {
    fontSize: fontsizes.paragraph,
    color: color.blue,
    fontWeight: "bold",
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
