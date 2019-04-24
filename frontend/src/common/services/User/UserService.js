class UserService {
    constructor() {
        this.endpoint = 'http://localhost:3006'
    }

    userLogin(postBody) {
        let url = this.endpoint + '/login';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Sorry the password and username do not match');
            }
            return resp.json();
        });
    }
    userRegister(postBody) {
        let url = this.endpoint + '/register';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('User already exists');
            }
            return resp.json();
        });
    }
    getAll() {
        let url = this.endpoint + '/getAll';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log(resp)
            return resp.json();
        });
    }
    getItem(postBody) {
        let url = this.endpoint + '/getItem';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log(resp)
            return resp.json();
        });
    }
    getShipAddress(postBody) {
        let url = this.endpoint + '/getItem';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log(resp)
            return resp.json();
        });
    }

}

export default new UserService();
