import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';


class GitHubRepositoryTask extends Component{
    
    getTasks(){
        
        var url = MainData.bpmnTaskUrl;
        

        var headers = {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        };
        return axios.get(
            url,
            headers            
        )
        .then(function (response) {
            return response.data;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    
    
}


export default (new GitHubRepositoryTask());