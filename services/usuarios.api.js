class Usuarios_Api {
    constructor(request) {
        this.request = request;

        this.apiBaseUrl = process.env.API_URL || 'http://localhost:5000';
    }

    listarUsuarios(version, pageSize, page, search) {
        return this.request.get(`${this.apiBaseUrl}/api/v${version}/Pessoas?page=${page}&pageSize=${pageSize}&search=${search}`);
    }

    criarUsuario(version, payload) {
        return this.request.post(`${this.apiBaseUrl}/api/v${version}/Pessoas`, { data: payload });
    }

    buscarUsuarioPorId(version, id) {
        return this.request.get(`${this.apiBaseUrl}/api/v${version}/Pessoas/${id}`);
    }

    atualizarUsuarioPorId(id, version, payload) {
        return this.request.put(`${this.apiBaseUrl}/api/v${version}/Pessoas/${id}`, { data: payload });
    }

    deletarUserPorId(id, version) {
        return this.request.delete(`${this.apiBaseUrl}/api/v${version}/Pessoas/${id}`);
    }

}
module.exports = Usuarios_Api;