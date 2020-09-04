import axios from "axios";

export default class FotoService {
    constructor() {
        this._root = 'http://localhost:3000/'
        this._resource = 'v1/fotos'
    }

    gravar(foto) {
        if (foto._id) {
            return axios.put(`${this._root}${this._resource}/${foto._id}`, foto)
                .catch(err => {
                    console.log(err);
                    throw new Error('Não foi possível atualizar a imagem');
                });
        } else {
            return axios.post(`${this._root}${this._resource}`, foto)
                .catch(err => {
                    console.log(err);
                    throw new Error('Não foi possível gravar a imagem');
                });
        }
    }

    apagar(id) {
        return axios.delete(`${this._root}${this._resource}/${id}`)
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível apagar a imagem');
            });
    }

    listar() {
        return axios.get(`${this._root}${this._resource}`)
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível carregar as imagens');
            });
    }

    buscar(id) {
        return axios.get(`${this._root}${this._resource}/${id}`)
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível buscar a imagem');
            });
    }
}