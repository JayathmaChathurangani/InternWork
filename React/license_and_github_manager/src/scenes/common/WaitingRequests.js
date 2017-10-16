import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import MainData from '../../services/MainData';
import {Link} from 'react-router';

class WaitingRequests extends Component{

    /* constructor*/
    constructor(){
        super();
        this.state = {
            waitingRequests:[]
        }
    }
    /* constructor ends*/

    /* component did mount */
    componentDidMount(){
        var requestBy = "buddhik@wso2.com";
        /*get all number of requests from database*/
        LM_REPOSITORY.selectWaitingRequests().then(function(response){
            this.setState(function(){
                return {
                    waitingRequests:response
                    }
                })
            }.bind(this))
        /*get all number of requests from database*/

    }
    /* component did mount ends */

    render(){

        return(
            <div className="container-fluid">
                <br />
                {this.state.waitingRequests.map((request)=>
                <Link to={"/root/acceptRepository??repositoryId=" + request.REPOSITORY_ID} key={( request.REPOSITORY_ID)}>
                    <div className="panel panel-info" >
                        <div className="panel-heading">
                            <h3 className="panel-title">{( request.REPOSITORY_NAME)}</h3>
                        </div>
                        <div className="panel-body">
                            Panel content
                        </div>
                    </div>
                </Link>
                )}
        </div>
        )

    }
}

export default WaitingRequests;