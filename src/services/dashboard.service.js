import api from "./api.js";

class DashboardService {
    async getChannelStats() {
        const response = await api.get(
            "/dashboard/stats"
        );

        return response.data;
    }

    async getChannelVideos({ page = 1, limit = 20 } = {}) {
        const response = await api.get(
            "/dashboard/videos",
            { params: { page, limit } }
        );

        return response.data;
    }
}

const dashboardService = new DashboardService();
export default dashboardService;
