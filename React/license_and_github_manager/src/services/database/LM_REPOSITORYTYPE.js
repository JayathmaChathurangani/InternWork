import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_REPOSITORYTYPE extends Component{
    /* get all repository types */
    getAllRepositoryTypes(){
        var url = MainData.ballerinaDatabaseURL + "selectAll";
        var data = {"tableName":"LM_REPOSITORYTYPE","select":"REPOSITORYTYPE_ID,REPOSITORYTYPE_NAME"};
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

     /* get all repository types ends*/
}


export default (new LM_REPOSITORYTYPE());