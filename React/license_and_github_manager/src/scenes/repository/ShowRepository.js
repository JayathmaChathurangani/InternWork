import React,{Component} from 'react';
import LM_LICENSE from '../../services/database/LM_LICENSE';
import LM_REPOSITORYTYPE from '../../services/database/LM_REPOSITORYTYPE';
import LM_ORGANIZATION from '../../services/database/LM_ORGANIZATION';
import LM_TEAM from '../../services/database/LM_TEAM';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import Common from '../../services/github/Common';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';
import StringValidations from '../../services/validations/StringValidations';
import {Link} from 'react-router';
import ValidateUser from '../../services/authentication/ValidateUser';
import '../../App.css';


class ShowRepository extends Component{
  
  constructor(props){
    super(props);
    
    this.repo = null;
    this.state = {
      
      repositoryId:props.location.query.repositoryId,
      repositoryDetails:null,
      teamDetails:[],
      groupIdInputRequired:false,
      groupIdInputSpan:" ",
      displayFieldset:'block',
      displayAlrearyAccept:'none',
      displayErrorBox:'none',
      displaySuceessBox:'none',
      isAdminUser:null
      
    }
    
  }

  

  setTeams(){
    console.log("call")
    LM_TEAM.getTeamDetailsFromId(this.state.repositoryDetails.REPOSITORY_TEAM).then(function(response){
      console.log(response)
      this.setState(function(){
        return{
          teamDetails:response  
        }
             
      });
      
    }.bind(this));
  }
  /* component did mount */
  

  componentDidMount(){
    

    /* get repository details from ID*/
    LM_REPOSITORY.selectDataFromId(this.state.repositoryId).then(function(response){
      console.log(response[0])
      this.setState(function(){
          return{
            
            repositoryDetails:response[0]
            
            
          }  
      });
      this.setTeams();      
      
    }.bind(this));
    /* get repository details from ID ends*/
 
    
    /* store user detaills */
    ValidateUser.getUserDetails().then(function(response){
      
      this.setState(function(){
        return {
          userDetails:response
        }
      });

    }.bind(this));
    
    /* store user detaills ends*/

  }
   /* component will mount ends*/

  
  /* accept request function start */

  acceptRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    

    
  }
    /* accept request function ends */

    

  render(){
    
    return(
      
      <form className="form-horizontal"  onSubmit={this.acceptRequest.bind(this)}>
        <h2 className="text-center">GitHub Repository Request</h2>
         
        <fieldset style={{display:this.state.displayFieldset}}>
          
          <br/>
          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Repository Name</label>
            <div className="col-lg-10">
              <input className="form-control" id="disabledInput" type="text" value={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.REPOSITORY_NAME:" "} readOnly={true} />
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Repository Type</label>
            <div className="col-lg-10">
              <input className="form-control" id="disabledInput" type="text" value={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.REPOSITORYTYPE_NAME:" "} readOnly={true} />
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Organization</label>
            <div className="col-lg-10">
              <input className="form-control" id="disabledInput" type="text" value={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.ORGANIZATION_NAME:" "} readOnly={true} />
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Team</label>
            <div className="col-lg-10">
              <input className="form-control" id="disabledInput" type="text" value={(this.state.teamDetails !== null)?this.state.teamDetails.name:" "} readOnly={true} />
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;License</label>
            <div className="col-lg-10">
              <input className="form-control" id="disabledInput" type="text" value={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.LICENSE_NAME:" "} readOnly={true} />
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Language</label>
            <div className="col-lg-10">
              <input className="form-control" id="disabledInput" type="text" value={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.REPOSITORY_LANGUAGE:" "} readOnly={true} />
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Configurations</label>
            <div className="col-lg-10">
                
                <label>
                  <input type="checkbox"  ref="inputBuildable" checked={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.REPOSITORY_BUILDABLE:false}/> Component Buildable
                </label>
                <br/><br/>
                <label>
                  <input type="checkbox" ref="inputPrivate" checked={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.REPOSITORY_PRIVATE:false} /> Make Private Repository
                </label>
                <br/><br/>
                <label>
                  <input type="checkbox" ref="inputNexus" checked={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.REPOSITORY_NEXUS:false}/> Create Nexus Repository
                </label>
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Group ID</label>
            <div className="col-lg-10">
              <input className="form-control" id="disabledInput" type="text" value={(this.state.repositoryDetails !== null)?this.state.repositoryDetails.REPOSITORY_GROUPID:" "} readOnly={true} />
            </div>
          </div>

          <div className="form-group">
            <label  className="col-lg-2 control-label">&nbsp;Description</label>
            <div className="col-lg-10">
              <textarea style={{height:'50vh'}} className="form-control" id="disabledInput" type="text" value={(this.state.repositoryDetails !== null)?StringValidations.setStringToShow(this.state.repositoryDetails.REPOSITORY_DESCRIPTION):" "} readOnly={true} />
            </div>
          </div>
          
        </fieldset>

        <div className="alert alert-dismissible alert-warning" style={{display:this.state.displayAlrearyAccept}}>
          
          <button type="button" className="close" data-dismiss="alert">&times;</button>
          <strong>This repository request already </strong> 
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
               <Link to={"/waitingRequests"}><button type="button" className="btn btn-primary" data-dismiss="modal">Waiting Requests</button>&nbsp;&nbsp;</Link>
                
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

export default ShowRepository;
