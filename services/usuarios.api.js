class Usuarios_Api{
    constructor(request){
        this.request = request;
    }
     
    listarUsuarios(version,page,pageSize,search){
        return this.request.get(`http://localhost:5000/api/v${version}/Pessoas?page=${page}&pageSize=${pageSize}&search=${search}`);
    }

    criarUsuario(version,payload){
        return this.request.post(`http://localhost:5000/api/v${version}/Pessoas`,{data:payload});
    }

    buscarUsuarioPorId(version,id){
        return this.request.get(`http://localhost:5000/api/v${version}/Pessoas/${id}`);
    }

    atualizarUsuarioPorId(id,version,payload){
        return this.request.put(`http://localhost:5000/api/v${version}/Pessoas/${id}`,{data:payload});
    }

    deleteuserPorId(id,version){
       return this.request.delete(`http://localhost:5000/api/v${version}/Pessoas/${id}`);
    }

}
module.exports = Usuarios_Api;