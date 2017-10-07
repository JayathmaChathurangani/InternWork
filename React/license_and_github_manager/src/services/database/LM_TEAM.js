import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_TEAM extends Component{

/* get all team data from database */
    getAllTeams(organization){
        var url = MainData.ballerinaGitHubURL + "gitHub/getTeams?organization=" + organization;
        console.log("call");
        return axios.get(
            url
        )
        .then(function (response) {
            
            return(response.data) ;
            
        })
        .catch(function (error) {
            return([{id:" ","name":" "}])
        });
    }
/* get all team data from database ends*/
}


export default (new LM_TEAM());