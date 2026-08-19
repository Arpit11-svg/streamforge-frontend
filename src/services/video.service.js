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

    async getVideoById(videoId) {
        const response = await api.get(
            `/videos/${videoId}`
        );
        return response.data;
    }

    async getVideosByOwner(ownerId) {
        const response = await api.get(
            "/videos",
            { params: { userId: ownerId } }
        );
        return response.data;
    }

    async deleteVideo(videoId) {
        const response = await api.delete(
            `/videos/delete-video/${videoId}`
        );
        return response.data;
    }

    async togglePublishStatus(videoId) {
        const response = await api.patch(
            `/videos/toggle/publish/${videoId}`
        );
        return response.data;
    }
}

const videoService = new VideoService();
export default videoService;