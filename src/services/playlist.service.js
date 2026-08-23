import api from "./api";

class PlaylistService{

    async createPlaylist(formData){
        const response = await api.post("/playlist/create-playlist", formData);
        return response.data;
    }

    async getUserPlaylists(userId){
        const response = await api.get(`/playlist/user/${userId}`);
        return response.data;
    }
}
const playlistService = new PlaylistService();
export default playlistService;