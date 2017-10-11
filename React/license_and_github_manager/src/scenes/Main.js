import React,{Component} from 'react';
import Header from '../components/layouts/Header';
import {Link} from 'react-router';
import ValidateUser from '../services/authentication/ValidateUser';

class Main extends Component{

  constructor(){
    super();
    ValidateUser.isValidUser();
  }

  render(){

    
    return(
      
      <div className="container-fluid">
        <div className="row" id="header">
          <div className="col-md-12">
            <Header />
          </div>

        </div>
        <br /><br/>
        <div className="row">

          <div className="row">
            <div className="col-md-1">
            </div>

            {/* Component Manager start */}
            <div className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i  className="fa fa-folder-open fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Component Manager</b>
              </Link>
              
            </div>
            {/* Component Manager ends */}

            {/* Library Manager start */}
            <div className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i className="fa fa-book fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Library Manager</b>
              </Link>

            </div>
            {/* Library Manager end */}
            
          </div>
          <br/>

          <div className="row">
            <div className="col-md-1">
            </div>

            {/* Package Manager start */}
            <div className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i className="fa fa-briefcase"></i></span>&nbsp;&nbsp;&nbsp;<b>Package Manager</b>
              </Link>
              
            </div>
            {/* Package Manager ends */}

            <div id="mainIcons" className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i className="fa fa-id-card-o"></i></span>&nbsp;&nbsp;&nbsp;<b>License Manager</b>
              </Link>

            </div>
          
          </div>

          <br/><br/>

          <div className="row">

            <div className="col-md-4"></div>
            <div className="col-md-4">
              <Link to="/root/requestRepository" className="btn btn-info btn-lg btn-block">
                <span><i className="fa fa-id-card-o"></i></span>&nbsp;&nbsp;&nbsp;<b>Repository Manager</b>
              </Link>
            </div>
            <div className="col-md-4"></div>
          </div>

          <br/><br/>

          <div className="row">
            <div className="col-md-1">
            </div>

            {/* Request repo. start */}
            <div className="col-md-5">

              <Link to="root" className="btn btn-success btn-lg btn-block">
                <span><i className="fa fa-github fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Request GitHub Repository</b>
              </Link>
              
            </div>
            {/* Request repo. ends */}

            {/* Request 3rd party lib. Manager start */}
            <div id="mainIcons" className="col-md-5">

              <Link to="root" className="btn btn-success btn-lg btn-block">
                <span><i className="fa fa-address-book-o fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Request 3rd party Library</b>
              </Link>
            {/* Request 3rd party lib. Request ends */}
            
            </div>
            
          </div>
        </div>
      </div>
    )

  }
}

export default Main;
