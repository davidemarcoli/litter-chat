import SignUpUserDTO from '@/components/types/SignUpUserDTO';
import CookieUtility from '../(utils)/CookieUtility';
import {REFRESH_TOKEN} from "../(constants)/Cookies"
import ApiService from './ApiService'

const baseURL = "/auth/"

const AuthenticationService = () => ({
  login: async (email:string, password: string) => {

      const {data} = await ApiService.post(baseURL + "login", {email: email, password: password});
      return data;
  },
  requestNewToken: async () => {
      const {data} = await ApiService.get(baseURL + "refresh-token", {
          headers: {Authorization: "Bearer " + CookieUtility.get(REFRESH_TOKEN)},
      })
      return data;
    },
  signup:async (user:SignUpUserDTO) => {
    console.log({...user})
    return ApiService.post(baseURL + "signup", {...user})
  }
})

export default AuthenticationService
