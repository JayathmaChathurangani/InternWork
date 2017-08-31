import {Component} from 'react';
import axios from 'axios';
import MainData from './MainData';

class LM_COMPONENT extends Component{

  selectComponentFromName(componentKey){
    var url = MainData.ballerinaDatabaseURL + "select";
    componentKey = componentKey + " ";
    var data = {'tableName':'LM_COMPONENT','select':'*','condition':'WHERE','parameters':{'column':'COMP_NAME','data':componentKey,'sqlType':'varchar'}};
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
