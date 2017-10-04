import {Component} from 'react';
import jwt_decode from 'jwt-decode';
import Token from './Token';
import LM_USER from '../database/LM_USER';

class ValidateUser extends Component{

    constructor(){
        super();
        this.validUser = false;
    }

    setValidUserTrue(){
        this.validUser = true;
        console.log("call");
    }
    getValidUser(){
        return this.validUser;
    }
    isAdminUser(){
        var adminUserMail = "buddhik@wso2.com";
        var userEmail = Token.getEmail();
        var flag = false;
        LM_USER.getMainUsers().then(function(response){
            var i = 0;
            for(i=0;i<response.length;i++){
                console.log(response[i].USER_EMAIL);
                if(response[i].USER_EMAIL === userEmail){
                    this.setValidUserTrue();
                    
                    break;
                }else{
                    flag = false;
                    continue;
                }
            }
           
        }.bind(this));
        return this.validUser;
        
    }
}

export default (new ValidateUser());