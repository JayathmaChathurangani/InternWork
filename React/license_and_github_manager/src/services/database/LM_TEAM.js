import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_TEAM extends Component{

/* get all team data from database */
    getAllTeams(){
        var url = MainData.ballerinaDatabaseURL + "team/selectAll";
        
        return axios.get(
            url
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