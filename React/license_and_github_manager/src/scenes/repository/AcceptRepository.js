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


class AcceptRepository extends Component{
  
  constructor(props){
    super(props);
    
    this.repo = null;
    this.state = {
      languages:['Java','Go'],
      licenseNames:[],
      repositoryTypes:[],
      organizations:[],
      teams:[],
      validateRepository:" ",
      buttonState:false,
      repositoryId:props.location.query.repositoryId,
      repositoryDetails:null,
      repositoryIsAcceptOrReject:null,
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
    var options = this.refs.selectOrganization.options;
    var selectOrganization = options[options.selectedIndex].text;
    LM_TEAM.getAllTeams(selectOrganization).then(function(response){
      
      this.setState(function(){
        return {
          teams:response
        }
      });
    }.bind(this));
  }
  /* component did mount */
  

  componentDidMount(){
    /*get all organizations types from database*/
    LM_ORGANIZATION.getAllOrganizations().then(function(response){
      
      this.setState(function(){
        return {
          organizations:response
        }
      });
      this.setTeams();      

    }.bind(this));
    /*get all organizations types from database*/

    /*get all repository types from database*/
    LM_REPOSITORYTYPE.getAllRepositoryTypes().then(function(response){
      this.setState(function(){
        return {
          repositoryTypes:response
        }
      })
    }.bind(this))
    /*get all repository types from database end*/

    /*get all languages from github api*/
    Common.getAllLanguages().then(function(response){
      this.setState(function(){
        
        return {
          languages:response
        }
      })
    }.bind(this));
    /*get all languages from github api ends*/

    /* get all license from database*/
    LM_LICENSE.getAllLicenseNames().then(function(response){
      this.setState(function(){
        return{
          licenseNames:response
        }
      })
    }.bind(this));
    /* get all license from database*/

    /* get repository details from ID*/
    LM_REPOSITORY.selectDataFromId(this.state.repositoryId).then(function(response){
      
      this.setState(function(){
        if((response[0].REPOSITORY_ACCEPTED_BY === null) && (response[0].REPOSITORY_DEACTIVATED_BY === null)){
          
          return{
            repositoryIsAcceptOrReject:false,
            repositoryDetails:response[0],
            groupIdInputRequired:response[0].REPOSITORY_NEXUS,
            groupIdInputSpan:((response[0].REPOSITORY_NEXUS)?<span className="required">*</span>:" ")
            
          }
        }else{
          return{
            repositoryIsAcceptOrReject:true,
            displayFieldset:'none',
            displayAlrearyAccept:'block',
            repositoryDetails:response[0]
            
          }
        }
        
      });

      
      this.refs.inputRepositoryName.value = response[0].REPOSITORY_NAME;
      this.refs.inputGroupId.value = response[0].REPOSITORY_GROUPID;
      this.refs.inputBuildable.value = response[0].REPOSITORY_BUILDABLE;
      this.refs.inputPrivate.value = response[0].REPOSITORY_PRIVATE;
      this.refs.textDescription.value = StringValidations.setStringToShow(response[0].REPOSITORY_DESCRIPTION);
      
      
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

  /* Validation functions*/
  validateInputRepositoryName(e){
    var inputRepositoryName = this.refs.inputRepositoryName.value;
    
    LM_REPOSITORY.selectDataFromName(inputRepositoryName).then(function(response){
      if(response.length > 0){
        this.setState(function(){
          return{
            validateRepository:"Sorry! This repository name already exists!",
            buttonState:true
          }
        })
      }else{
        this.setState(function(){
          return{
            validateRepository:" ",
            buttonState:false
          }
        })
      }
    }.bind(this));;
  

  }

  /* make group id required function*/

  makeGroupIdRequired(){
    var checkedValue = this.refs.inputNexus.checked;
    if(checkedValue === true){
      this.setState(function(){
        return{
          groupIdInputRequired:true,
          groupIdInputSpan:<span className="required">*</span>
        }
      });
    }else{
      this.setState(function(){
        return{
          groupIdInputRequired:false,
          groupIdInputSpan:" "
        }
      });
    }
   
    
  }
  /* make group id required function ends*/

  /* go back function starts */

  goBackToRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.setState(function(){
      return{
        displayFieldset:'block',
        displayErrorBox:'none',
        displaySuceessBox:'none',
        displayAlrearyAccept:'none'
      }
    });
  }
  /* go back function ends */
  
  /* Validation functions end*/

  /** show error box function starts */
  showErrorBox(){
    this.setState(function(){
      return{
        showErrorBox:'block'
      }
    });
  }
  /** show error box function ends */
  /* accept request function start */

  acceptRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (confirm("Are you sure to accept this repository request?") === false ) {
      return false ;
    }

    var repositoryName =  StringValidations.escapeCharacters(this.refs.inputRepositoryName.value.toString());
    var repositoryType = this.refs.selectRepositoryType.value;
    var organization = this.refs.selectOrganization.value;
    var team = this.refs.selectTeam.value;
    var license = this.refs.selectLicense.value;
    var language =  this.refs.selectLanguage.value ;
    var groupId =  StringValidations.escapeCharacters(this.refs.inputGroupId.value.toString());
    var buildable = this.refs.inputBuildable.checked;
    var nexus = this.refs.inputNexus.checked;
    var isPrivate = this.refs.inputPrivate.checked;
    var description =  StringValidations.escapeCharacters(this.refs.textDescription.value.toString());
    var accept = true;
    var acceptBy = StringValidations.escapeCharacters(this.state.userDetails.userEmail);

    var data = [
      repositoryName,
      language,
      buildable,
      nexus,
      isPrivate,
      description,
      groupId,
      license,
      team,
      organization,
      repositoryType,
      accept,
      acceptBy
    ];  

    
    var variables = [
      {
        "name":"outputType",
        "value":"Done"
      },
      {
        "name":"repositoryId",
        "value":this.state.repositoryDetails.REPOSITORY_ID
      }

    ];

    try{
      LM_REPOSITORY.updateAll(data,this.state.repositoryDetails.REPOSITORY_ID);
      GitHubRepositoryCreation.completeUserTask(this.state.repositoryDetails.REPOSITORY_BPMN_TASK_ID,variables);
      this.setState(function(){
        return{
          displaySuceessBox:'block',
          displayFieldset:'none',
          displayErrorBox:'none'
        }
      })
    }catch(err){
      this.setState(function(){
        return{
          displaySuceessBox:'none',
          displayFieldset:'none',
          displayErrorBox:'block'
        }
      })
    }
    
    

    
  }
    /* accept request function ends */

    

  render(){
    
    return(
      
      <form className="form-horizontal"  onSubmit={this.acceptRequest.bind(this)}>
        <h2 className="text-center">GitHub Repository Request</h2>
          
        <fieldset style={{display:this.state.displayFieldset}}>
          
          <br/>
          <div className="form-group">
            <label htmlFor="inputRepositoryName" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Name</label>
            <div className="col-lg-10">
              <input onChange={this.validateInputRepositoryName.bind(this)} type="text" className="form-control" ref="inputRepositoryName" id="inputRepositoryName" placeholder="carbon-identity-framework" />
              <span className="validate" id="validateInputRepositoryName">{this.state.validateRepository}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectRepositoryType" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Type</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectRepositoryType" >
                {this.state.repositoryTypes.map((repositoryType)=>
                ((this.state.repositoryDetails !== null) && (repositoryType.REPOSITORYTYPE_ID === this.state.repositoryDetails.REPOSITORY_TYPE))? 
                  <option key={repositoryType.REPOSITORYTYPE_ID} selected value={repositoryType.REPOSITORYTYPE_ID}>{repositoryType.REPOSITORYTYPE_NAME}</option>:
                  <option key={repositoryType.REPOSITORYTYPE_ID} value={repositoryType.REPOSITORYTYPE_ID}>{repositoryType.REPOSITORYTYPE_NAME}</option>
                )}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectOrganization" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Organization</label>
            <div className="col-lg-10" onChange={this.setTeams.bind(this)}>
              <select className="form-control" ref="selectOrganization" >
                {this.state.organizations.map((organization)=> 
                ((this.state.repositoryDetails !== null) && (organization.ORGANIZATION_ID === this.state.repositoryDetails.REPOSITORY_ORGANIZATION)) ? 
                <option key={organization.ORGANIZATION_ID} selected value={organization.ORGANIZATION_ID}>{organization.ORGANIZATION_NAME}</option>:
                <option key={organization.ORGANIZATION_ID} value={organization.ORGANIZATION_ID}>{organization.ORGANIZATION_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectTeam" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Team Name</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectTeam" >
                {this.state.teams.map((team,i)=>
                ((this.state.repositoryDetails !== null) && (team.id === this.state.repositoryDetails.REPOSITORY_TEAM))? 
                <option key={team.name} selected value={team.id} >{team.name}</option>:
                <option key={team.name} value={team.id} >{team.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLicense" className="col-lg-2 control-label">&nbsp;License</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectLicense">
                {this.state.licenseNames.map((license)=> 
                ((this.state.repositoryDetails !== null) && (license.LICENSE_ID === this.state.repositoryDetails.REPOSITORY_LICENSE))?
                <option key={license.LICENSE_ID} selected value={license.LICENSE_ID}>{license.LICENSE_NAME}</option>:
                <option key={license.LICENSE_ID} value={license.LICENSE_ID}>{license.LICENSE_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLanguage" className="col-lg-2 control-label">Language</label>
            <div className="col-lg-10">
            <select className="form-control" ref="selectLanguage" >
              
              {this.state.languages.map((language,i)=> 
              ((this.state.repositoryDetails !== null) && (language === this.state.repositoryDetails.REPOSITORY_LANGUAGE))?
              <option key={i} selected value={language}>{language}</option>:
              <option key={i}  value={language}>{language}</option>)}
                
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputLanguage" className="col-lg-2 control-label">Configurations</label>
            <div className="col-lg-10">
              <div className="checkbox">
                <label>
                  {((this.state.repositoryDetails !== null))?<input type="checkbox"  ref="inputBuildable" defaultChecked={this.state.repositoryDetails.REPOSITORY_BUILDABLE}/>:" "}
                   Component Buildable
                </label>
                <br/><br/>
                <label>
                {((this.state.repositoryDetails !== null))?<input type="checkbox" ref="inputPrivate" defaultChecked={this.state.repositoryDetails.REPOSITORY_PRIVATE}/>:<input type="checkbox" ref="inputPrivate"/>}
                   Make Private Repository
                </label>
                <br/><br/>
                <label>
                {((this.state.repositoryDetails !== null))?<input onChange={this.makeGroupIdRequired.bind(this)} type="checkbox" ref="inputNexus" defaultChecked={this.state.repositoryDetails.REPOSITORY_NEXUS}/>:" "}
                  Create Nexus Repository
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="inputGroupId" className="col-lg-2 control-label">{this.state.groupIdInputSpan}&nbsp;Group ID</label>
            <div className="col-lg-10">
            <input  type="text" className="form-control" ref="inputGroupId" placeholder="org.wso2.example" required={this.state.groupIdInputRequired}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="textDescription" className="col-lg-2 control-label">Description</label>
            <div className="col-lg-10">
              <textarea className="form-control" rows="3" ref="textDescription" placeholder="Description for README"></textarea>
            </div>
          </div>


          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
            <Link to={"/rejectRepository?repositoryId="+this.state.repositoryId}  ><button  className="btn btn-danger">Reject</button></Link>
              &nbsp;&nbsp;&nbsp;
              <button type="submit" className="btn btn-info" id="form-horizontal" disabled={this.state.buttonState} >Accept</button>
            </div>
          </div>
        </fieldset>

        <div className="alert alert-dismissible alert-warning" style={{display:this.state.displayAlrearyAccept}}>
          
          <button type="button" className="close" data-dismiss="alert">&times;</button>
          <strong>This repository request already {
            (this.state.repositoryIsAcceptOrReject === true)?
            ((this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY !== null)?
            (" accepted by "+this.state.repositoryDetails.REPOSITORY_ACCEPTED_BY):
            (" rejected by "+this.state.repositoryDetails.REPOSITORY_DEACTIVATED_BY+" because of " +this.state.repositoryDetails.REPOSITORY_DEACTIVATED_REASON)):
            this.showErrorBox.bind(this)
            }</strong> 
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
                <button onClick={this.goBackToRequest.bind(this)} type="button" className="btn btn-default" data-dismiss="modal">Back</button>&nbsp;&nbsp;
                <button onClick={this.acceptRequest.bind(this)}type="button" className="btn btn-success">Try again</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )

  }
}

export default AcceptRepository;
