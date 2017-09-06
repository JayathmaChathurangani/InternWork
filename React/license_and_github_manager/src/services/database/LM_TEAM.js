import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_TEAM extends Component{

/* get all team data from database */
    getAllTeams(){
        var url = MainData.ballerinaDatabaseURL + "selectAll";
        var data = {"tableName":"LM_TEAM","select":"*"};
        var returnData = [];
        return axios.post(
            url,
            data
        )
        .then(function (response) {
            
        return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
/* get all team data from database ends*/
}


export default (new LM_TEAM());