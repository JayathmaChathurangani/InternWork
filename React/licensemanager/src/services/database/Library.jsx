import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class Library
* @extends {Component}
* @description Get license details
*/
class Library extends Component {
    /**
    * selectTypes
    * @returns {Promise} promise
    */
    selectTypes() {
        const url = MainData.ballerinaDatabaseURL + 'library/selectTypes';
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * selectTypes
    * @param {String} name library name
    * @param {String} version library version
    * @returns {Promise} promise
    */
    selectLibraryFromNameAndVersion(name, version) {
        const url = MainData.ballerinaDatabaseURL +
        'library/selectFromNameAndVersion?name=' + name + '&version=' + version;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new Library());
