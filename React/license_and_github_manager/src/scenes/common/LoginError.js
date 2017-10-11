import React,{Component} from 'react';
import AppHeader from '../../components/layouts/AppHeader';

class LoginError extends Component{

    /* constructor*/
    constructor(){
        super();
        this.state = {
            pendingRequests:[]
        }
    }
    /* constructor ends*/

    
    render(){

        return(
            <div className="container-fluid">
                <div className="row" id="header">
                    <div className="col-md-12">
                        <AppHeader />
                        
                    </div>
        
                </div>
            <div className="row">
              <div className="col-md-2">
              
              </div>
              <div className="col-md-8">
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
              <div className="col-md-2">
              
              </div>
            </div>
          </div>
            
        )

    }
}

export default LoginError;