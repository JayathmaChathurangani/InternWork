import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_TEAM extends Component{

/* get all team data from github api */
    getAllTeams(organization){
        var url = MainData.ballerinaGitHubURL + "gitHub/getTeams?organization=" + organization;
        
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
/* get all team data from github api */

    /* get all team data from github api */
    getTeamDetailsFromId(id){
        var url = MainData.ballerinaGitHubURL + "gitHub/getTeamsFromId?teamId=" + id;
        
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
/* get all team data from github api */
}


export default (new LM_TEAM());