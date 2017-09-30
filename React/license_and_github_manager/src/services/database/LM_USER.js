import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_USER extends Component{

/* get  user data from database */
    getMainUsers(){
        var url = MainData.ballerinaDatabaseURL + "user/selectMainUsers";
        
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
/* get user data from database ends*/
}


export default (new LM_USER());