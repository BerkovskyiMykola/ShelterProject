import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/LogPoints/";

class LogPointService {
    getLogPoints(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createLogPoint(id) {
        return axios.post(API_URL + "createRandom/" + id, { }, { headers: authHeader() });
    }
}

export default new LogPointService();