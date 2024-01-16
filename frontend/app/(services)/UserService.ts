import ApiService from './ApiService'

const baseURL = "/user/"

const UserService = () => ({
    getProfile: async (id: string) => {
        return ApiService.get(baseURL + "profile/" + id)
    }
})

export default UserService();
