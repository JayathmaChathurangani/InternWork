import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class Mail extends Component{

/* send mail */
    sendMail(repositoryDetails){
        var url = MainData.ballerinaMailURL + "sendMail";
        var columns = [
            'Repository Name',
            'Language',
            'Buildable',
            'Is private',
            'Description',
            'Group ID',
            'License',
            'Team',
            'Organization',
            'Type',
            'Requested By'
        ];
        var requestData = {"columns":columns,"data":repositoryDetails};
        return axios.post(
            url,
            requestData
        )
        .then(function (response) {
            
            if(response.data.type == "done"){
                alert(" Your request send for approval via E-mail.");
            }else{
                alert(" Your request sending fails." + response.data.message);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
/* send mail ends*/
}   


export default (new Mail());