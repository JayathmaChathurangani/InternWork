import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';

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
        {/*get all number of requests from database*/}
        LM_REPOSITORY.selectDataFromRequestBy(requestBy).then(function(response){
            this.setState(function(){
                return {
                    pendingRequests:response
                    }
                })
            }.bind(this))
        {/*get all number of requests from database*/}

    }
    /* component did mount ends */

    render(){

        return(
            <div className="container-fluid">
                <div className="row">
                {console.log(this.state.pendingRequests)}
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