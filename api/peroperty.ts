import axios from "axios";

const property = {
  getProperties: async (token: string) => {
    return await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/properties`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  },
  getProperty: async (token: string, id: string) => {
    return await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/properties/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  },
}

export default property;