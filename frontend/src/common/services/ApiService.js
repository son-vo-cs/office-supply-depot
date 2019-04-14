class ApiService {
    constructor() {

    }
    apiOSD(type, data)
    {
        URL = 'http://localhost:3006/' + type
        return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(response => {
            return response.json();
        }).catch(error =>{
            return JSON.stringify(error.message)
        });
    }

    login(data){return this.apiOSD('login',data)};
    register(data){return this.apiOSD('register',data)};
    getAll(){return this.apiOSD('getAll',{"a":2})};
    getItem(data) {return this.apiOSD('getItem',data)};
}

export default new ApiService();
