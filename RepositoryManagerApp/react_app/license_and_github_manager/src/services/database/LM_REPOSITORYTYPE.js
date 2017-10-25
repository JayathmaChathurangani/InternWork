import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_REPOSITORYTYPE extends Component{
    /* get all repository types */
    getAllRepositoryTypes(){
        var url = MainData.ballerinaDatabaseURL + "repoType/selectAll";
        
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

     /* get all repository types ends*/
}


export default (new LM_REPOSITORYTYPE());