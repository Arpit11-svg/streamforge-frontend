import api from "./api";

class SubscriptionService{

    async toggleSubscription(channelId){
        const response = await api.post(`/subscriptions/c/${channelId}`);
        
        return response.data;
    }


}

const subscriptionService = new SubscriptionService();
export default subscriptionService;