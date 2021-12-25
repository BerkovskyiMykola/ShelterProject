import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Animals/";

class AnimalService {
    getAnimals(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createAnimal(name, category, type, shelterId) {
        return axios.post(API_URL + "create", { name, category, type, shelterId }, { headers: authHeader() });
    }

    deleteAnimal(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editAnimal(animalId, name, category, type) {
        return axios.put(API_URL + "edit/" + animalId, { animalId, name, category, type }, { headers: authHeader() });
    }
}

export default new AnimalService();