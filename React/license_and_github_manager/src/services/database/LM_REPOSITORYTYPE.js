import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_REPOSITORYTYPE extends Component{
    /* get all repository types */
    getAllRepositoryTypes(){
        var url = MainData.ballerinaDatabaseURL + "repoType/selectAll";
        var data = {"tableName":"LM_REPOSITORYTYPE","select":"*"};
        return axios.get(
            url
        )
        .then(function (response) {
            console.log(response.data);
            return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

     /* get all repository types ends*/
}


export default (new LM_REPOSITORYTYPE());