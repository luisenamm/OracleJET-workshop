import axios from 'axios';
import {AxiosPromise} from 'axios';

class UserService{
    private readonly URL='https://jsonblob.com/api/jsonBlob/'

    constructor(){}

    public getUsers(): AxiosPromise {
        return axios.get(this.URL + 'd913d528-7d60-11eb-b747-c3d79fb24bf0');
    } 
}

export default UserService;