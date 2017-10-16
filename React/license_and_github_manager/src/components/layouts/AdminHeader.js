import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import {Link} from 'react-router';
import logo from '../../assets/images/logo.svg';
import '../../App.css'
class AdminHeader extends Component{
  /* constructor*/
  constructor(){
    super();
    this.state = {
      waitingRequests:0
    }
  }
   /* constructor ends*/

  /* component did mount */
  componentDidMount(){
    
    /*get all number of requests from database*/
    LM_REPOSITORY.selectWaitingRequests().then(function(response){
      this.setState(function(){
        return {
          waitingRequests:response.length
        }
      })
    }.bind(this))
    /*get all number of requests from database*/

  }
  /* component did mount ends */
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
              <li className="active"><Link to={"/root/waitingRequests"}  ref="waitingRequests">{(this.state.waitingRequests === 0)? null:"Waiting Requests"} &nbsp;<span className="badge">{(this.state.waitingRequests === 0)? null:this.state.waitingRequests}</span></Link></li>
            </ul>
          </div>

          
        </div>
      </nav>
    )

  }
}

export default AdminHeader;
