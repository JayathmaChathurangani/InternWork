import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class Mail extends Component{

/* send mail */
    sendMail(repositoryDetails){
        var url = MainData.ballerinaMailURL + "sendMail";
        var data = {"tableName":"LM_TEAM","select":"*"};
        var returnData = [];
        return axios.post(
            url,
            data
        )
        .then(function (response) {
            
        console.log(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
/* send mail ends*/
}   


export default (new Mail());