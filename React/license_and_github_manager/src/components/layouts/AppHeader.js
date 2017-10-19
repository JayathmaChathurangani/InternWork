import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import {Link} from 'react-router';
import logo from '../../assets/images/logo.svg';
import '../../App.css'
import ValidateUser from '../../services/authentication/ValidateUser';

class AppHeader extends Component{
  /* constructor*/
  constructor(){
    super();
    this.state = {
      pendingRequests:0,
      userDetails:[]
    }
  }
   /* constructor ends*/
  setPendingRequests(requestBy){

    /*get all number of requests from database*/
    LM_REPOSITORY.selectDataFromRequestBy(requestBy).then(function(response){
      
      this.setState(function(){
        return {
          pendingRequests:response.length
        }
      })
    }.bind(this))
    /*get all number of requests from database*/

  }
  /* component will mount */
  componentWillMount(){
    
    /* store user detaills */
    ValidateUser.isValidUser().then(function(response){
      
        this.setState(function(){
          return {
            userDetails:response
          }
        });
        this.setPendingRequests(response.userEmail)
    }.bind(this));
    /* store user detaills ends*/

  }
  /* component will mount ends */
  render(){

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            
            <img id="logo" src={logo}  alt="wso2" />
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li className="active"><Link to={"/root/pendingRequests"}  ref="pendingRequests">{(this.state.pendingRequests === 0)? null:"Pending Requests"} &nbsp;<span className="badge">{(this.state.pendingRequests === 0)? null:this.state.pendingRequests}</span></Link></li>
            </ul>
          </div>

          
        </div>
      </nav>
    )

  }
}

export default AppHeader;
