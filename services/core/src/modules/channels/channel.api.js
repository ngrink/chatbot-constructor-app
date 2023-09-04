import { $axios } from "../../utils/axios";


export class ChannelAPI {
    static async getEnabledChannels() {
        try {
            const res = await $axios.get('/channels');
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
}
