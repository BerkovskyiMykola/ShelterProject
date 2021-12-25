import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Walks/";

class WalkService {
    getWalks(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createWalk(volunteer, dateEnd, animalId) {
        return axios.post(API_URL + "create", { volunteer, dateEnd, animalId }, { headers: authHeader() });
    }

    deleteWalk(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editWalk(walkId, volunteer, dateEnd) {
        return axios.put(API_URL + "edit/" + walkId, { volunteer, dateEnd, walkId }, { headers: authHeader() });
    }
}

export default new WalkService();