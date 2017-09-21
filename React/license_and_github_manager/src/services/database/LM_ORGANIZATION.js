import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_ORGANIZATION extends Component{

/* get all organizations from database */
getAllOrganizations(){
    var url = MainData.ballerinaDatabaseURL + "select";
    var data = {"tableName":"LM_ORGANIZATION","select":"*"};
    
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
/* get all organizations from database ends*/
}


export default (new LM_ORGANIZATION());