import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import MainData from '../../services/MainData';


class PendingRequests extends Component{

    /* constructor*/
    constructor(){
        super();
        this.state = {
            pendingRequests:[]
        }
    }
    /* constructor ends*/

    /* component did mount */
    componentDidMount(){
        var requestBy = "buddhik@wso2.com";
        /*get all number of requests from database*/
        LM_REPOSITORY.selectWaitingRequests(requestBy).then(function(response){
            this.setState(function(){
                return {
                    pendingRequests:response
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
                <div className="row">
                {this.state.pendingRequests.map((request)=>
                    <div className="row" key={request.REPOSITORY_ID}>
                        <div className="col-md-12" id="showBpmnImage">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{( request.REPOSITORY_NAME)}</h3>
                                </div>
                                <div className="panel-body">
                                    <img alt="" src={MainData.bpmnImgURL + request.REPOSITORY_BPMN_PROCESS_ID + "/diagram"}  className="img-responsive"/>
                                </div>
                            </div>
                                
                            
                        </div>
                    </div>
                    )
                }
                </div>
                <div className="row">
                
                </div>
                <div className="row">
                
                </div>
        </div>
        )

    }
}

export default PendingRequests;