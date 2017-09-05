
  import {Component} from 'react';
  import axios from 'axios';
  import MainData from '../MainData';
  
  class Common extends Component{

    /*get all languages from github api*/
    getAllLanguages(){
        var url = MainData.ballerinaGitHubURL + "getAllLanguages";
        var data = {};
        var returnData = [];
        return axios.get(
          url,
          data
        )
        .then(function (response) {
          
          return response.data;
            
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    /*get all languages from github api end*/
  }

  export default (new Common());