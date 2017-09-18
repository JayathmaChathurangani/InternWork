import React,{Component} from 'react';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import CommGitHubRepositoryCreationon from '../../services/bpmn/GitHubRepositoryCreation';
import {Link} from 'react-router';
import '../../App.css';

class RejectRepository extends Component{
  
  constructor(props){
    super(props);
    this.state = {
        repositoryId:props.location.query.repositoryId
    }   
  }
 

  render(){
    
    return(
      <form className="form-horizontal"  >
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
              <button type="reset" className="btn btn-danger">Reject</button>
            </div>
          </div>
        </fieldset>
      </form>
    )

  }
}

export default RejectRepository;
