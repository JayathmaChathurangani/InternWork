
  import {Component} from 'react';
  import axios from 'axios';
  import MainData from '../MainData';
  
  class Common extends Component{
    
    getAllLanguages(){
        var url = MainData.ballerinaGitHubURL + "getAllLanguages";
        var data = {};
        var returnData = [];
        returnData = axios.get(
          url,
          data
        )
        .then(function (response) {
            return response;
            
        })
        .catch(function (error) {
          console.log(error);
        });
        return returnData;
      }

      getAllLanguage(){
          return "py";
      } 
  }

  export default (new Common());