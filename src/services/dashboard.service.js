import api from "./api.js";

class DashboardService {
    async getChannelStats() {
        const response = await api.get(
            "/dashboard/stats"
        );

        return response.data;
    }
}

const dashboardService = new DashboardService();
export default dashboardService;
