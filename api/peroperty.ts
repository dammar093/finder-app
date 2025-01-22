import axios from "axios";

const property = {
  getProperties: async (token: string) => {
    return await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/properties`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  },
}

export default property;