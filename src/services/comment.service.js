import api from './api.js';

class CommentService {
    async addComment(videoId, content){
        const response = await api.post(`/comments/${videoId}`, { content });
        return response.data;
    }

    async getVideoComments(videoId) {
        const response = await api.get(`/comments/${videoId}`);
        return response.data;
    }

}
const commentService = new CommentService();
export default commentService;