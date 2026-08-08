import api from "./api";

class LikeService {

    async likePost(postId) {
        const response = await api.post(`/likes/toggle/v/${postId}`);
        return response.data;
    }

    async getVideoLikes(videoId) {
        const response = await api.get(`/likes/video/v/${videoId}`);
        return response.data;
    }
}

const likeService = new LikeService();
export default likeService;