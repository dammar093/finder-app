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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import textValidation from "@/utils/textValidation";
import phoneNumberValidation from "@/utils/phoneNumberValidation";
import atuh from "@/api/auth";
import { setToken } from "@/utils/asyncStorage";

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    fullNameError: "",
    phoneNumberError: "",
    emailError: "",
    passwordError: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFullName = (value: string) => {
    setFormValue((prev) => ({ ...prev, fullName: value }));
    const fullName = textValidation(value);
    if (!fullName) {
      setFormError((prev) => ({
        ...prev,
        fullNameError: validationMessages.fullname.invalid,
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        fullNameError: "",
      }));
    }
  };

  const handlePhoneNumber = (value: string) => {
    setFormValue((prev) => ({ ...prev, phoneNumber: value }));
    const mobile = phoneNumberValidation(value);
    if (value.length < 10 || value.length > 13) {
      setFormError((prev) => ({
        ...prev,
        phoneNumberError: validationMessages.mobile.length,
      }));
    }
    if (!mobile) {
      setFormError((prev) => ({
        ...prev,
        phoneNumberError: validationMessages.mobile.invalid,
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        phoneNumberError: "",
      }));
    }
  };

  const handleEmail = (value: string) => {
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
    if (formValue?.fullName.trim() === "") {
      setFormError((prev) => ({
        ...prev,
        fullNameError: validationMessages?.fullname?.required,
      }));
    }
    if (formValue?.phoneNumber.trim() === "") {
      setFormError((prev) => ({
        ...prev,
        phoneNumberError: validationMessages?.mobile?.required,
      }));
    }
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
      formError?.fullNameError === "" &&
      formError?.phoneNumberError === "" &&
      formError?.passwordError === "" &&
      formError?.emailError == "" &&
      formValue?.fullName !== "" &&
      formValue?.phoneNumber !== "" &&
      formValue?.email !== "" &&
      formValue?.password !== ""
    ) {
      setLoading(true);
      atuh
        .signUp(formValue)
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
          Registration
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
            placeholder="Enter fullname"
            onChangeText={handleFullName}
            value={formValue?.fullName}
            icon={
              <FontAwesome5
                name="user-alt"
                size={24}
                color={color.lightBlack}
              />
            }
          />
          {formError?.fullNameError && (
            <CustomErrorText error={formError?.fullNameError} />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <CustomInput
            secureTextEntry={false}
            placeholder="Enter mobile number"
            onChangeText={handlePhoneNumber}
            value={formValue?.phoneNumber}
            icon={
              <FontAwesome5
                name="phone-alt"
                size={iconsizes.md}
                color={color.lightBlack}
              />
            }
          />
          {formError?.phoneNumberError && (
            <CustomErrorText error={formError?.phoneNumberError} />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <CustomInput
            secureTextEntry={false}
            placeholder="Enter Email"
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
            placeholder="Enter password"
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
        <Text
          style={{
            textAlign: "center",
            fontSize: fontsizes.span,
            fontWeight: "bold",
            color: color.lightBlack,
          }}
        >
          Already have an account?{" "}
          <Link style={{ color: color.blue }} href={"/(auth)/sign-in"}>
            Login
          </Link>
        </Text>
        <View style={styles.inputWrapper}>
          <CustomButton
            loading={loading}
            onPress={handleSumbit}
            title="Register"
          />
        </View>
      </View>
      <StatusBar backgroundColor={color.white} barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    flex: 1,
    gap: "5%",
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
    flex: 2,
    paddingHorizontal: 20,
    gap: 15,
  },
  inputWrapper: {
    width: "100%",
    gap: 5,
  },
});
