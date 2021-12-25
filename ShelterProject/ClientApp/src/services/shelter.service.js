import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Shelters/";

class ShelterService {
    getShelters() {
        return axios.get(API_URL + "all", { headers: authHeader() });
    }

    createShelter(name, address) {
        return axios.post(API_URL + "create", { name, address }, { headers: authHeader() });
    }

    deleteShelter(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editShelter(shelterId, name, address) {
        return axios.put(API_URL + "edit/" + shelterId, { shelterId, name, address }, { headers: authHeader() });
    }
}

export default new ShelterService();