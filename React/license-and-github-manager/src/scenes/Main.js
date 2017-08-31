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
        <br />
        <div className="row">

          <div className="row">
            <div className="col-md-1">
            </div>
            <div className="col-md-3">

              <Link to="root">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">Component Manager Click Here</h3>
                  </div>
                  <div className="panel-body">
                    <ul>

                      <li>You can request GitHub repository</li>
                      <li>You can view component details</li>
                      <li>You can seach components</li>

                    </ul>

                  </div>
                </div>
              </Link>
              
            </div>

            <div className="col-md-3">

              <Link to="root">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">Component Manager Click Here</h3>
                  </div>
                  <div className="panel-body">
                    <ul>

                      <li>You can request GitHub repository</li>
                      <li>You can view component details</li>
                      <li>You can seach components</li>

                    </ul>

                  </div>
                </div>
              </Link>

            </div>
            <div className="col-md-3">

              <Link to="root">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">Component Manager Click Here</h3>
                  </div>
                  <div className="panel-body">
                    <ul>

                      <li>You can request GitHub repository</li>
                      <li>You can view component details</li>
                      <li>You can seach components</li>

                    </ul>

                  </div>
                </div>
            </Link>

            </div>
          </div>
          <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-3">

            <Link to="root">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">Component Manager Click Here</h3>
                </div>
                <div className="panel-body">
                  <ul>

                    <li>You can request GitHub repository</li>
                    <li>You can view component details</li>
                    <li>You can seach components</li>

                  </ul>

                </div>
              </div>
            </Link>
            
          </div>

          <div id="mainIcons" className="col-md-3">

            <Link  to="root">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3  className="panel-title">Component Manager Click Here</h3>
                </div>
                <div  className="panel-body">
                    <i  className="fa fa-folder-open fa-5x"></i>
                </div>
              </div>
            </Link>

          </div>
          <div className="col-md-3">

            <Link to="root">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">Component Manager Click Here</h3>
                </div>
                <div className="panel-body">
                  <ul>

                    <li>You can request GitHub repository</li>
                    <li>You can view component details</li>
                    <li>You can seach components</li>

                  </ul>

                </div>
              </div>
          </Link>

          </div>
        </div>
        </div>
      </div>
    )

  }
}

export default Main;
