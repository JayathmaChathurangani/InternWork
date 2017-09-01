import React,{Component} from 'react';
import Header from '../components/layouts/Header';
import {Link} from 'react-router';

class Main extends Component{
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
            <div className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i  className="fa fa-folder-open fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Component Manager</b>
              </Link>
              
            </div>

            <div className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i className="fa fa-book fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Library Manager</b>
              </Link>

            </div>
            
          </div>
          <br/>

          <div className="row">
            <div className="col-md-1">
            </div>

            <div className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i className="fa fa-briefcase"></i></span>&nbsp;&nbsp;&nbsp;<b>Package Manager</b>
              </Link>
              
            </div>

            <div id="mainIcons" className="col-md-5">

              <Link to="root" className="btn btn-info btn-lg btn-block">
                <span><i className="fa fa-id-card-o"></i></span>&nbsp;&nbsp;&nbsp;<b>License Manager</b>
              </Link>

            </div>
          
          </div>

          <br/><br/>
          <div className="row">
            <div className="col-md-1">
            </div>

            <div className="col-md-5">

              <Link to="root" className="btn btn-success btn-lg btn-block">
                <span><i className="fa fa-github fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Request GitHub Repository</b>
              </Link>
              
            </div>

            <div id="mainIcons" className="col-md-5">

              <Link to="root" className="btn btn-success btn-lg btn-block">
                <span><i className="fa fa-address-book-o fa-1x"></i></span>&nbsp;&nbsp;&nbsp;<b>Request 3rd party Library</b>
              </Link>

            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default Main;
