import api from "./api.js";

class AuthService {

    async register(formData) {

        const response = await api.post(
            "/users/register",
            formData
        );

        return response.data;
    }

    async login(data) {

        const response = await api.post(
            "/users/login",
            data
        );

        return response.data;
    }

    async logout() {

        const response = await api.post(
            "/users/logout",
        );

        return response.data;
    }

    async getCurrentUser() {

        const response = await api.get(
            "/users/current-user"
        );

        // console.log("getCurrentUser response: ", response.data);

        return response.data;
    }

    async getUserChannelProfile(username){
        const response = await api.get(`/users/c/${username}`);
        // console.log("=============UserProfile from auth.service.js is: ", response.data.data);
        return response.data.data;
        
    }
}

const authService = new AuthService();

export default authService;