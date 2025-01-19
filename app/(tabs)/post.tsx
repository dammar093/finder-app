import React, { useEffect, useState } from "react";
import color from "@/constants/Colors";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import CustomInput from "@/components/custiomInput/CustomInput";
import { Feather, Ionicons } from "@expo/vector-icons";
import iconsizes from "@/constants/IconSizes";
import CustomButton from "@/components/customButton/CustomButton";

const Post = () => {
  const [images, setImages] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState<string>("");
  const [formValues, setFormValues] = useState<{
    images: string[];
    title: string;
    services: string[];
    description: string;
    location: string;
    longitude: number | null;
    latitude: number | null;
    price: number | null;
  }>({
    images: [],
    title: "",
    services: [],
    description: "",
    price: null,
    location: "",
    longitude: null,
    latitude: null,
  });

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setFormValues((prevValues) => ({
        ...prevValues,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      }));
    };

    getLocation();
  }, []);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages((prevImages) => [...prevImages, ...uris]);
      setFormValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...uris],
      }));
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setFormValues((prevValues) => ({
      ...prevValues,
      images: newImages,
    }));
  };

  const addService = () => {
    if (newService.trim() !== "") {
      setServices((prevServices) => [...prevServices, newService]);
      setFormValues((prevValues) => ({
        ...prevValues,
        services: [...prevValues.services, newService],
      }));
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
    setFormValues((prevValues) => ({
      ...prevValues,
      services: newServices,
    }));
  };
  const handleSumbit = () => {
    console.log(formValues);
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            <View style={styles.imageGrid}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={pickImages}
                style={styles.addImageButton}
              >
                <Feather
                  name="plus"
                  size={iconsizes.xl}
                  color={color.lightBlack}
                />
                <Text style={styles.addImageText}>Add Images</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 20 }}>
              <View>
                <CustomInput
                  onChangeText={(text) =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      title: text,
                    }))
                  }
                  placeholder="Enter title"
                  value={formValues?.title}
                  secureTextEntry={false}
                />
              </View>
              <View>
                <CustomInput
                  onChangeText={(text) =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      price: parseFloat(text),
                    }))
                  }
                  placeholder="Enter price"
                  value={formValues?.price}
                  secureTextEntry={false}
                  type="number-pad"
                />
              </View>
              <View style={styles.serviceContainer}>
                {services.map((service, index) => (
                  <View key={index} style={styles.serviceWrapper}>
                    <Text style={styles.serviceText}>{service}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeService(index)}
                    >
                      <Ionicons name="close-circle" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={styles.addServiceContainer}>
                  <CustomInput
                    inputStyle={styles.serviceInput}
                    placeholder="Enter service"
                    value={newService}
                    onChangeText={setNewService}
                  />
                  <TouchableOpacity
                    onPress={addService}
                    style={styles.addServiceButton}
                  >
                    <Feather
                      name="plus"
                      size={iconsizes.lg}
                      color={color.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <CustomInput
                  onChangeText={(value) => {
                    setFormValues((prev) => ({
                      ...prev,
                      location: value,
                    }));
                  }}
                  placeholder="Enter address"
                  value={formValues?.location}
                />
              </View>
              <View>
                <TextInput
                  style={styles.description}
                  onChangeText={(text) =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      description: text,
                    }))
                  }
                  placeholder="Enter description"
                  placeholderTextColor={color.lightBlack}
                  value={formValues?.description}
                  multiline
                  numberOfLines={6}
                />
              </View>
              <View>
                <CustomButton title="Add Properties" onPress={handleSumbit} />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color.white,
  },
  inputContainer: {
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageWrapper: {
    position: "relative",
    width: "48%",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
  },
  addImageButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 200,
    borderWidth: 1,
    borderColor: color.lightBlack,
    borderRadius: 10,
    marginBottom: 16,
  },
  addImageText: {
    fontSize: 16,
    color: color.lightBlack,
  },
  serviceContainer: {
    marginTop: 20,
  },
  serviceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceText: {
    flex: 1,
    fontSize: 16,
    backgroundColor: color.garyWhite,
    padding: 10,
    borderRadius: 10,
  },
  addServiceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceInput: {
    flex: 1,
    borderColor: color.lightBlack,
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  addServiceButton: {
    padding: 10,
    backgroundColor: color.primary,
    borderRadius: "50%",
  },
  description: {
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    paddingHorizontal: 20,
    width: "100%",
    height: 300,
    textAlignVertical: "top",
  },
});

export default Post;
