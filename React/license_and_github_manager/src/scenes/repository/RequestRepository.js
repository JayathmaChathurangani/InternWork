import React,{Component} from 'react';
import LM_LICENSE from '../../services/database/LM_LICENSE';
import LM_REPOSITORYTYPE from '../../services/database/LM_REPOSITORYTYPE';
import LM_ORGANIZATION from '../../services/database/LM_ORGANIZATION';
import LM_TEAM from '../../services/database/LM_TEAM';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import Common from '../../services/github/Common';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';
import GitHubRepositoryTask from '../../services/bpmn/GitHubRepositoryTask';

import '../../App.css';


class RequestRepository extends Component{
  
  constructor(){
    super();
    this.state = {
      languages:[],
      licenseNames:[],
      repositoryTypes:[],
      organizations:[],
      teams:[],
      validateRepository:" ",
      buttonState:false,
      displayFieldset:'block',
      displayLoader:'none',
      groupIdInputRequired:false,
      groupIdInputSpan:" "
    }
  }

  /* component did mount */
  componentDidMount(){
    /* get all team details from database*/
    LM_TEAM.getAllTeams().then(function(response){
      this.setState(function(){
        return {
          teams:response
        }
      })
    }.bind(this));
    /* get all team details from database ends*/

    /*get all organizations types from database*/
    LM_ORGANIZATION.getAllOrganizations().then(function(response){
      this.setState(function(){
        return {
          organizations:response
        }
      })
    }.bind(this));
    /*get all organizations types from database*/

    /*get all repository types from database*/
    LM_REPOSITORYTYPE.getAllRepositoryTypes().then(function(response){
      this.setState(function(){
        return {
          repositoryTypes:response
        }
      })
      console.log(this.state.repositoryTypes);
    }.bind(this));
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

  }
   /* component did mount ends*/

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
    }.bind(this));
  

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
    console.log(this.refs.inputGroupId.value);
    
  }
  /* make group id required function ends*/

  /* Validation functions end*/

  /* submit function start*/

    submitRequest(e){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      
      if (confirm("Are you sure to request it?") === false ) {
        return false ;
      }
      
      
      var repositoryName = "'" + this.refs.inputRepositoryName.value.toString() + "'";
      var repositoryType = this.refs.selectRepositoryType.value;
      var organization = this.refs.selectOrganization.value;
      var team = this.refs.selectTeam.value;
      var license = this.refs.selectLicense.value;
      var language = "'" + this.refs.selectLanguage.value + "'";
      var groupId = "'" + this.refs.inputGroupId.value.toString() + "'";
      var buildable = this.refs.inputBuildable.checked;
      var nexus = this.refs.inputNexus.checked;
      var isPrivate = this.refs.inputPrivate.checked;
      var description = "'" + this.refs.textDescription.value.toString() + "'";
      var requestedBy = "'buddhik@wso2.com'";

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
        requestedBy
      ];   
         

      this.setState(function(){
        return{
          displayFieldset:'none',
          displayLoader:'block'
        }
      })
      
      GitHubRepositoryCreation.startProcess(data).then(function(response) {
        
        if(response.data.completed === false){
          try{
              
              GitHubRepositoryTask.getTasks().then(function(responseTasks){
              var i = 0;
              var taskArraylength = responseTasks.data.length;

              var task;
                for(i=0;i<taskArraylength;i++){
                    task = responseTasks.data[i];
                    if(task.processInstanceId === response.data.id){
                        LM_REPOSITORY.update(["REPOSITORY_BPMN_TASK_ID","REPOSITORY_BPMN_PROCESS_ID"],[task.id,response.data.id],"REPOSITORY_NAME",repositoryName);
                        alert("Your GitHub repository request send via e-mail for approval.");
                        break;
                    }
                }
              });

          }catch(err){
              alert(err);
          }
        }else{
            alert("Sorry database or e-mail sending error occur.Your GitHub repository request cannot send.")
        }
        this.setState(function(){
          return{
            displayFieldset:'block',
            displayLoader:'none'
          }
        });         
    }.bind(this));
     
    
      
      
      
    }
    /* submit function ends*/

  render(){

    return(
      <form className="form-horizontal"  onSubmit={this.submitRequest.bind(this)}>
        <h2 className="text-center">Request GitHub Repository Here</h2>
        
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
                {this.state.repositoryTypes.map((repositoryType)=> <option key={repositoryType.REPOSITORYTYPE_ID} value={repositoryType.REPOSITORYTYPE_ID}>{repositoryType.REPOSITORYTYPE_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectOrganization" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Organization</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectOrganization" >
                {this.state.organizations.map((organization)=> <option key={organization.ORGANIZATION_ID} value={organization.ORGANIZATION_ID}>{organization.ORGANIZATION_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectTeam" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Team Name</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectTeam" >
                {this.state.teams.map((team,i)=> <option key={team.TEAM_NAME} value={team.TEAM_ID} >{team.TEAM_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLicense" className="col-lg-2 control-label">&nbsp;License</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectLicense">
                {this.state.licenseNames.map((license)=> <option key={license.LICENSE_ID} value={license.LICENSE_ID}>{license.LICENSE_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLanguage" className="col-lg-2 control-label">Language</label>
            <div className="col-lg-10">
            <select className="form-control" ref="selectLanguage">
              
              {this.state.languages.map((language,i)=> (language === "Java")?<option key={i} selected value={language}>{language}</option>:<option key={i} value={language}>{language}</option>)}
                
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputLanguage" className="col-lg-2 control-label">Configurations</label>
            <div className="col-lg-10">
              <div className="checkbox">
                <label>
                  <input type="checkbox"  ref="inputBuildable"/> Component Buildable
                </label>
                <br/><br/>
                <label>
                  <input type="checkbox" ref="inputPrivate"/> Make Private Repository
                </label>
                <br/><br/>
                <label>
                  <input onChange={this.makeGroupIdRequired.bind(this)} type="checkbox" ref="inputNexus"/> Create Nexus Repository
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputGroupId" className="col-lg-2 control-label">{this.state.groupIdInputSpan}&nbsp;Group ID</label>
            <div className="col-lg-10" >
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
              <button type="reset" className="btn btn-default">Cancel</button>
              &nbsp;
              <button type="submit" ref="submitButton" className="btn btn-info" id="form-horizontal" data-loading-text="Loading ..." disabled={this.state.buttonState} >Request</button>
            </div>
          </div>
        </fieldset>
        <div className="container-fluid" style={{display:this.state.displayLoader}}>
          <br/><br/><br/>
          <div className="row">
            <div className="col-lg-5">
              
            </div>
            <div className="col-lg-4">
              <div className="loader"></div>
            </div>
            <div className="col-lg-3">
              
            </div>
          </div>
          
        </div>
        
      </form>
    )

  }
}

export default RequestRepository;
