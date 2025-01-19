import AsyncStorage from '@react-native-async-storage/async-storage';


export const setToken = async (token: string): Promise<void> => {
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token");
  }
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    console.error("Error while saving token", e);
    throw new Error("Failed to save token");
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (e) {
    console.error("Error while retrieving token", e);
    return null;
  }
};

export const removeTokenFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token removed successfully');
  } catch (error) {
    console.error('Error removing token from storage', error);
  }
};
