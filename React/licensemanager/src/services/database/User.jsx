import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class User
* @extends {Component}
* @description Get user details
*/
class User extends Component {
    /**
    * get main users
    * @returns {Promise} promise
    */
    getMainUsers() {
        const url = MainData.ballerinaDatabaseURL + 'user/selectMainUsers';
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * get admin users
    * @param {String} email email of a user
    * @returns {Promise} promise
    */
    isAdminUser(email) {
        const url = MainData.ballerinaDatabaseURL + 'user/checkAdminUsers?email=' + email;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new User());
