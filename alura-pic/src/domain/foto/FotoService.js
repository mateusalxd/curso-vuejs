import axios from "axios";

export default class FotoService {
    constructor() {
        this._root = 'http://localhost:3000/'
        this._resource = 'v1/fotos'
    }

    gravar(foto) {
        return axios.post(`${this._root}${this._resource}`, foto);
    }

    apagar(id) {
        return axios.delete(`${this._root}${this._resource}/${id}`);
    }

    listar() {
        return axios.get(`${this._root}${this._resource}`);
    }
}