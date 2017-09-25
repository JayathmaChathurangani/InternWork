import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_LICENSE extends Component{

/* get all license from database */
getAllLicenseNames(){
    var url = MainData.ballerinaDatabaseURL + "selectData";
    var data = {"tableName":"LM_LICENSE","select":"LICENSE_ID,LICENSE_NAME"};
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
/* get all license from database ends*/
}


export default (new LM_LICENSE());