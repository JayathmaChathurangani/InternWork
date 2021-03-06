import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class LM_COMPONENT extends Component{

  selectComponentFromName(componentKey){
    var url = MainData.ballerinaDatabaseURL + "selectData";
    
    var data = {'tableName':'LM_COMPONENT','select':'*','condition':'WHERE','parameters':{'column':'COMP_NAME','data':componentKey,'sqlType':'varchar'}};
    console.log(data);
    axios.post(
      url,
      data
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  request(e){
    
    var url = MainData.ballerinaMailURL + "sendMail";
    var data = {};
    axios.post(
      url,
      data
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    
  }

 
}


export default (new LM_COMPONENT());
