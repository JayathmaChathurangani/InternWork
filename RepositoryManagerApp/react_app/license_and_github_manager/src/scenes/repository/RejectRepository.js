import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';
import {Link} from 'react-router';
import '../../App.css';
import ValidateUser from '../../services/authentication/ValidateUser';

class RejectRepository extends Component{
  
  constructor(props){
    super(props);
    
    this.state = {
        repositoryId:props.location.query.repositoryId,
        repositoryDetails:null,
        displayFieldset:'block',
        displayAlrearyAccept:'none',
        displayErrorBox:'none',
        displaySuceessBox:'none',
        userDetails:[]
    }   
  }

  componentWillMount(){

    /* get repository details from ID*/
    LM_REPOSITORY.selectDataFromId(this.state.repositoryId).then(function(response){
      console.log(response)
      this.setState(function(){
        if((response[0].REPOSITORY_ACCEPTED_BY === null) && (response[0].REPOSITORY_DEACTIVATED_BY === null)){
          return{
            displayFieldset:'block',
            displayAlrearyAccept:'none',
            displayErrorBox:'none',
            displaySuceessBox:'none',
            repositoryDetails:response[0]
            
          }
        }else{
          return{
            displayFieldset:'none',
            displayAlrearyAccept:'block',
            displayErrorBox:'none',
            displaySuceessBox:'none',
            repositoryDetails:response[0]
          }
        }
        
      });
    }.bind(this));
    /* get repository details from ID ends*/

    ValidateUser.getUserDetails().then(function(response){
      
      this.setState(function(){
        return {
          userDetails:response
        }
      });

    }.bind(this));
  }

  rejectRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (confirm("Are you sure to reject repository request?") === false ) {
      return false ;
   }

    var reasonForRejecting = this.refs.textReasonForRejecting.value.toString();
    var rejectBy = this.state.userDetails.userEmail;

    var data = [
      rejectBy,
      reasonForRejecting,
      this.state.repositoryDetails.REPOSITORY_ID
    ];  

    
    console.log(data);
    var variables = [
      {
        "name":"outputType",
        "value":"Reject"
      },
      {
        "name":"rejectBy",
        "value":rejectBy
      },
      {
        "name":"reasonForReject",
        "value":reasonForRejecting
      }
    ];

    try{
      LM_REPOSITORY.updateRejectDetails(data);
      GitHubRepositoryCreation.completeUserTask(this.state.repositoryDetails.REPOSITORY_BPMN_TASK_ID,variables);
      this.setState(function(){
        return{
          displaySuceessBox:'block',
          displayAlrearyAccept:'none',
          displayFieldset:'none',
          displayErrorBox:'none'
        }
      })
    }catch(err){
      this.setState(function(){
        return{
          displaySuceessBox:'none',
          displayAlrearyAccept:'none',
          displayFieldset:'none',
          displayErrorBox:'block'
        }
      })
    }
  }
 

  render(){
    
    return(
      <form className="form-horizontal" onSubmit={this.rejectRequest.bind(this)} >
        <h2 className="text-center">Request GitHub Repository Here</h2>
        {console.log(this.state.userDetails)}
        <fieldset style={{display:this.state.displayFieldset}} >
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

        <div className="alert alert-dismissible alert-warning" style={{display:this.state.displayAlrearyAccept}}>
          {console.log(this.state.repositoryDetails)}
          
          <button type="button" className="close" data-dismiss="alert">&times;</button>
          <strong>This repository request already {((this.state.repositoryDetails !== null))? ((this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY === null)?(" deactivated by " + this.state.repositoryDetails.REPOSITORY_DEACTIVATED_BY):(" accepted by " + this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY)):" "}</strong> 
        </div>

        <div className="modal" style={{display:this.state.displaySuceessBox}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Succesfull</h4>
              </div>
              <div className="modal-body">
                <p><span><i className="fa fa-check" aria-hidden="true"></i></span>&nbsp;Request successfully accepted</p>
              </div>
              <div className="modal-footer">
               <Link to={"/"}><button type="button" className="btn btn-default" data-dismiss="modal">Back to main page</button>&nbsp;&nbsp;</Link>
                
              </div>
            </div>
          </div>
        </div>

        <div className="modal" style={{display:this.state.displayErrorBox}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Failed</h4>
              </div>
              <div className="modal-body">
                <p><span><i className="fa fa-times" aria-hidden="true"></i></span>&nbsp;Request acceptance fail</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Back</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-success">Try again</button>
              </div>
            </div>
          </div>
        </div>

      </form>
    )

  }
}

export default RejectRepository;
