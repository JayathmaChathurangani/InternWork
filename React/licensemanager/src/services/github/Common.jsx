import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class Common
* @extends {Component}
* @description common calls for github api
*/
class Common extends Component {
    /**
    * get all languages
    * @returns {Promise} promise
    */
    getAllLanguages() {
        const url = MainData.ballerinaGitHubURL + 'getAllLanguages';
        return axios.get(url).then((response) => {
            return response.data;
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new Common());
