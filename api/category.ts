import axios from "axios";


const category = {
  getCategories: async (token: string) => {
    return await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/categories`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }
}
export default category;