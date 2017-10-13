import React,{Component} from 'react';
import AppHeader from '../components/layouts/AppHeader';
import LeftNav from '../components/navs/LeftNav';
import AdminLeftNav from '../components/navs/AdminLeftNav';
import ValidateUser from '../services/authentication/ValidateUser';


class Root extends Component{

  constructor(){
    super();
    this.state = {
      isAdminUser: false,
      isValidUser:false
    }
    
    
    
  }

  componentWillMount(){

    ValidateUser.isValidUser().then(function(response){
      if(response.isValid){
        this.setState(function(){
          return {
            isValidUser:response.isValid
          }
        });
      }else{
        ValidateUser.redirectToAdminLoginErrorPage();
      }
      
           

    }.bind(this));

    ValidateUser.isAdminUser().then(function(response){
      
        this.setState(function(){
          return {
            isAdminUser:response.isAdmin
          }
        });
      
      
           

    }.bind(this));
  }
  
  render(){

    return(

      <div className="container-fluid">
        <div className="row" id="header">
          <div className="col-md-12">
            <AppHeader />
            
          </div>
        {console.log(this.state.isValidUser)}
        </div>
        <div className="row">
          <div className="col-md-2" id="leftNav">
            
          {(this.state.isAdminUser === true)?<AdminLeftNav />:<LeftNav />}
          </div>
          <div className="col-md-10">
            {this.props.children}
          </div>
        </div>
      </div>
    )

  }
}

export default Root;
