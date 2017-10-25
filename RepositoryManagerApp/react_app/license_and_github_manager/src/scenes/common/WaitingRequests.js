import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
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
                {console.log(this.state.waitingRequests)}
                {this.state.waitingRequests.map((request)=>
                <Link to={"/root/acceptRepository?repositoryId=" + request.REPOSITORY_ID} key={( request.REPOSITORY_ID)}>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="panel panel-info" >
                                <div className="panel-heading">
                                    <h3 className="panel-title">{( request.REPOSITORY_NAME)}</h3>
                                </div>
                                <div className="panel-body">
                                    <p>
                                        <strong>Repository Type :&nbsp;</strong>{(request.REPOSITORYTYPE_NAME)}<br/>
                                        <strong>Organization :&nbsp;</strong>{(request.ORGANIZATION_NAME)}<br/>
                                        <strong>License :&nbsp;</strong>{(request.LICENSE_NAME)}<br/>
                                        <strong>Nexus :&nbsp;</strong>{(request.REPOSITORY_NEXUS)?"Yes":"No"}<br/>
                                        <strong>Jenkins :&nbsp;</strong>{(request.REPOSITORY_BUILDABLE)?"Yes":"No"}<br/>
                                        <strong>Requested By :&nbsp;</strong>{(request.REPOSITORY_REQUEST_BY)}<br/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                )}
        </div>
        )

    }
}

export default WaitingRequests;