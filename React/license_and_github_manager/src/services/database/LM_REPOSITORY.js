import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_REPOSITORY extends Component{
    
/* insert into repository table */
    insertData(data){
        var url = MainData.ballerinaDatabaseURL + "insertData";
        var columns = [
            'REPOSITORY_NAME',
            'REPOSITORY_LANGUAGE',
            'REPOSITORY_BUILDABLE',
            'REPOSITORY_PRIVATE',
            'REPOSITORY_DESCRIPTION',
            'REPOSITORY_GROUPID',
            'REPOSITORY_LICENSE',
            'REPOSITORY_TEAM',
            'REPOSITORY_ORGANIZATION',
            'REPOSITORY_TYPE'
        ];
        var requestData = {"tableName":"LM_REPOSITORY","columns":columns,"data":data};
        return axios.post(
            url,
            requestData
        )
        .then(function (response) {
            
            return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
/*  insert into repository table ends*/

    selectDataFromName(data){
        var url = MainData.ballerinaDatabaseURL + "selectAll";
        var select = "*";
        var condition = "WHERE REPOSITORY_NAME ='" + data + "' ";
        var requestData = {"tableName":"LM_REPOSITORY","select":select,"condition":condition};

        return axios.post(
            url,
            requestData
        )
        .then(function (response) {
            
            return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}


export default (new LM_REPOSITORY());