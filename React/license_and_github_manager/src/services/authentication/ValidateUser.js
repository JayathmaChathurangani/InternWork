import {Component} from 'react';
import Token from './Token';
import LM_USER from '../database/LM_USER';
import {browserHistory} from 'react-router';

class ValidateUser extends Component{

    constructor(){
        super();
        this.validUser = false;
    }

    setValidUser(){
        console.log("ok")
        this.validUser = true;
    }

    getValidUser(){
        console.log("get");
        return this.validUser;
    }
    isAdminUser(){
        
        var userEmail = Token.getEmail();
        var flag = false;
        return LM_USER.isAdminUser(userEmail).then(function(response){
            console.log(response)
        });
        
        
    }

    isValidUser(){
        
        var token = Token.getToken();
        if(token === null){
            browserHistory.push('/loginError');
            return false;
        }

        var userEmail = Token.getEmail();
        
        if(userEmail.endsWith("@wso2.com") === true){
            return true;
        }else{
            browserHistory.push('/loginError');
            return false;
        }
        
        
        
    }

    redirectToAdminLoginErrorPage(){
        browserHistory.push('/loginError');
        return;
    }
}

export default (new ValidateUser());