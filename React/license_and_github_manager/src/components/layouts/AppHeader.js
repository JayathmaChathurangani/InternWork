import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import {Link} from 'react-router';

class AppHeader extends Component{
  /* constructor*/
  constructor(){
    super();
    this.state = {
      pendingRequests:0
    }
  }
   /* constructor ends*/

  /* component did mount */
  componentDidMount(){
    var requestBy = "buddhik@wso2.com";
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
  /* component did mount ends */
  render(){

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="">WSO2 - License And GitHub Manager</a>
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
