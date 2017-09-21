import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import CommGitHubRepositoryCreationon from '../../services/bpmn/GitHubRepositoryCreation';
import '../../App.css';

class RejectRepository extends Component{
  
  constructor(props){
    super(props);
    this.state = {
        repositoryId:props.location.query.repositoryId,
        repositoryDetails:null
    }   
  }

  componentWillMount(){

    /* get repository details from ID*/
    LM_REPOSITORY.selectDataFromId(this.state.repositoryId).then(function(response){
      this.setState(function(){
        return{
          repositoryDetails:response[0]
        }
      });
    }.bind(this));
    /* get repository details from ID ends*/
  }

  rejectRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (confirm("Are you sure to reject repository request?") === false ) {
      return false ;
   }

    var reasonForRejecting = "'" + this.refs.textReasonForRejecting.value.toString() + "'";
    var accept = 0;
    var rejectBy = "'buddhi@wso2.com'";

    var data = [
      
      accept,
      rejectBy,
      reasonForRejecting
    ];  

    var columns = [
      
      'REPOSITORY_ACCEPT',
      'REPOSITORY_DEACTIVATED_BY',
      'REPOSITORY_DEACTIVATED_REASON'
  ];
    console.log(data);
    var variables = [
      {
        "name":"outputType",
        "value":"Reject"
      }
    ];

    try{
      LM_REPOSITORY.update(columns,data,'REPOSITORY_ID',this.state.repositoryDetails.REPOSITORY_ID);
      CommGitHubRepositoryCreationon.completeUserTask(this.state.repositoryDetails.REPOSITORY_BPMN_TASK_ID,variables);
      alert("Repository request rejected.");
    }catch(err){
      alert("Error Occured. Repository rejection fails.");
    }
  }
 

  render(){
    
    return(
      <form className="form-horizontal" onSubmit={this.rejectRequest.bind(this)} >
        <h2 className="text-center">Request GitHub Repository Here</h2>
        
        <fieldset>
          <br/>
          <div className="form-group">
            <label htmlFor="textReasonForRejecting" className="col-lg-2 control-label">Reason for rejecting :</label>
            <div className="col-lg-10">
              <textarea className="form-control" rows="3" ref="textReasonForRejecting" placeholder="Description for README" required></textarea>
            </div>
          </div>


          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
            <button type="reset" className="btn btn-default">Cancel</button> 
              &nbsp;&nbsp;&nbsp;
              <button type="submit" className="btn btn-danger">Reject</button>
            </div>
          </div>
        </fieldset>
      </form>
    )

  }
}

export default RejectRepository;
