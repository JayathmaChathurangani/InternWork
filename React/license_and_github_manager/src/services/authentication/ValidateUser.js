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
        return LM_USER.getMainUsers().then(function(response){
            var i = 0;
            if(userEmail === null){
                return false;
            }
            for(i=0;i<response.length;i++){
                
                if(response[i].USER_EMAIL === userEmail){
                    this.setValidUser();
                    break;
                }else{
                    flag = false;
                    continue;
                }
            }
            return flag;
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