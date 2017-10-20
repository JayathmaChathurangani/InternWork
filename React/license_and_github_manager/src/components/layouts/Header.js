import React,{Component} from 'react';
import logo from '../../assets/images/logo-inverse.svg';

class Header extends Component{
  render(){

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            
            <img id="logo" src={logo}  alt="wso2" /><strong style={{'color':'white','font-size':'25px','margin-top':'2px'}}>License and Repository Manager</strong>

          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
            </ul>

            <ul className="nav navbar-nav navbar-right">
              
            </ul>
          </div>

          
        </div>
      </nav>
    )

  }
}

export default Header;
