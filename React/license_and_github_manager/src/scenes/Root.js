import React,{Component} from 'react';
import AppHeader from '../components/layouts/AppHeader';
import AdminHeader from '../components/layouts/AdminHeader';
import LeftNav from '../components/navs/LeftNav';
import AdminLeftNav from '../components/navs/AdminLeftNav';
import ValidateUser from '../services/authentication/ValidateUser';


class Root extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      isAdminUser: null,
      isValidUser:null,
      displayChildren:'block',
      displayError:'none',
      displayNav:'block',
      displayHeader:'block',
      userDetails:[{"isValid":false,"userDetails":null}]
    }
    
    
    
  }

  componentWillMount(){
    var adminPages = ['/root/acceptRepository','/root/waitingRequests'];
    ValidateUser.isValidUser().then(function(response){
      
      if(response.isValid){
        this.setState(function(){
          return {
            isValidUser:response.isValid,
            userDetails:response
          }
        });
      }else{
        this.setState(function(){
          return {
            isValidUser:response.isValid,
            displayChildren:'none',
            displayError:'block',
            displayNav:'none',
            displayHeader:'none'
          }
        });
      }
      
           

    }.bind(this));

    ValidateUser.isAdminUser().then(function(response){
        if(adminPages.indexOf(this.props.location.pathname) !== -1 && !response.isAdmin){
          this.setState(function(){
            return {
              isAdminUser:response.isAdmin,
              displayChildren:'none',
              displayError:'block',
              displayNav:'none',
              displayHeader:'none'
            }
          });
        }else{
          this.setState(function(){
            return {
              isAdminUser:response.isAdmin
            }
          });
        }
        
  
    }.bind(this));

   
  }
  
  render(){

    return(

      <div className="container-fluid">
        
       
        <div className="row" id="header">
          <div className="col-md-12" style={{display:this.state.displayHeader}}>
          {(this.state.isAdminUser === true)?<AdminHeader userDetails={this.state.userDetails}/>:<AppHeader userDetails={this.state.userDetails}/>}
            
          </div>
        
        </div>
        <div className="row">
          <div className="col-md-2" id="leftNav" style={{display:this.state.displayNav,'paddingLeft':'0px'}}>
            
          {(this.state.isAdminUser === true)?<AdminLeftNav />:<LeftNav />}
          </div>
          <div className="col-md-10" style={{display:this.state.displayChildren,'height':'90vh','overflowY':'auto','overflowX':'hidden'}} >
            
            {
              this.props.children
            
	          }
            
          </div>
          
        </div>

        <div className="row" style={{display:this.state.displayError}}>
          <div className="col-md-10" >
              <br/>
              <div className="alert alert-dismissible alert-danger">
                  <div className="panel panel-danger">
                      <div className="panel-heading">
                          <h3 className="panel-title">Login Error</h3>
                      </div>
                      <div className="panel-body" style={{color:"black"}}>
                          Invalid Login
                      </div>
                  </div>                     
              </div>
              
          </div>
        </div>
      </div>
    )

  }
}

export default Root;
