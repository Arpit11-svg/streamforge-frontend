import api from "./api.js";

class VideoService {
    async publishVideo(formData) {
        const response = await api.post(
            "/videos/publish-video",
            formData
        );

        return response.data;
    }

    async getAllVideos() {
        const response = await api.get(
            "/videos"
        );

        return response.data;
    }

}

const videoService = new VideoService();
export default videoService;