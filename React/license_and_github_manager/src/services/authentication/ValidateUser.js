import {Component} from 'react';
import Token from './Token';
import axios from 'axios';
import {browserHistory} from 'react-router';
import MainData from '../MainData';

class ValidateUser extends Component{

    
    isAdminUser(){
        var token = Token.getToken();
        var url = MainData.ballerinaURL + "authentication/isAdminUser";
        var requestData = {"token":token};
        var headersData = {'Access-Control-Allow-Origin':"*"};
        return axios.post(
            url,
            requestData,
            headersData
        )
        .then(function (response) {
            
            return response.data;
            
            
        })
        .catch(function (error) {
            console.log(error);
        });
        
        
    }

    isValidUser(){
        
        var token = Token.getToken();
        var url = MainData.ballerinaURL + "authentication/isValidUser";
        var requestData = {"token":token};
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        
        return axios.post(
            url,
            requestData,
            headersData
        )
        .then(function (response) {
            
            
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        
        
    }

    redirectToAdminLoginErrorPage(){
        
        browserHistory.push('/loginError');
        return;
    }

    getUserDetails(){
        
        var url = MainData.ballerinaURL + "authentication/getUserDetails";
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        return axios.get(
            url,
            headersData
        )
        .then(function (response) {
            
            
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export default (new ValidateUser());