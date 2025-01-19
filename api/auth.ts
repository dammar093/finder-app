import axios from "axios";
export interface UserInterface {
  email: string,
  password: string
}

const atuh = {
  signUp: async (value: UserInterface) => {

    return await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users`, value);
  },
  singIn: async (value: UserInterface) => {
    return await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/sign-in`, value);
  },
  loggedInUser: async (token: string) => {
    return axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  },
  forgotPassword: async (email: string) => {
    return axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/forgot-password`, { email });
  },
  verifyOtp: async (email: string, otp: string) => {
    return axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/verify-otp`, { email, otp });
  },
  resetPassword: async (otp: string, email: string, password: string) => {
    console.log(otp, email, password);

    return axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/reset-password`, { otp, email, password });
  }
}

export default atuh