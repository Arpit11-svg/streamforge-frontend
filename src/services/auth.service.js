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
            "/users/logout"
        );

        return response.data;
    }

    async getCurrentUser() {

        const response = await api.get(
            "/users/current-user"
        );

        return response.data;
    }
}

const authService = new AuthService();

export default authService;