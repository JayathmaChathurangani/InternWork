import React,{Component} from 'react';
import LM_LICENSE from '../../services/database/LM_LICENSE';
import LM_REPOSITORYTYPE from '../../services/database/LM_REPOSITORYTYPE';
import LM_ORGANIZATION from '../../services/database/LM_ORGANIZATION';
import LM_TEAM from '../../services/database/LM_TEAM';
import LM_USER from '../../services/database/LM_USER';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import Common from '../../services/github/Common';
import GitHubRepositoryCreation from '../../services/bpmn/GitHubRepositoryCreation';
import GitHubRepositoryTask from '../../services/bpmn/GitHubRepositoryTask';
import StringValidations from '../../services/validations/StringValidations';
import ValidateUser from '../../services/authentication/ValidateUser';
import {Link} from 'react-router';
import '../../App.css';


class RequestRepository extends Component{
  
  constructor(props){
    super(props);
    
    this.state = {
      mainUsers:[],
      languages:[],
      licenseNames:[],
      repositoryTypes:[],
      organizations:[],
      teams:[],
      validateRepository:" ",
      buttonState:false,
      displayFieldset:'block',
      displayLoader:'none',
      displaySuceessBox:'none',
      displayErrorBox:'none',
      groupIdInputRequired:false,
      groupIdInputSpan:" ",
      userDetails:[]
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
  componentWillMount(){
    
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

    /* get user details from database*/
    LM_USER.getMainUsers().then(function(response){
      this.setState(function(){
        return {
          mainUsers:response
        }
      })
    }.bind(this));
    /* get user details from database ends*/

    /*get all repository types from database*/
    LM_REPOSITORYTYPE.getAllRepositoryTypes().then(function(response){
      this.setState(function(){
        return {
          repositoryTypes:response
        }
      })
      
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
  
   /* component did mount ends*/


  /* Validation functions*/
  validateInputRepositoryName(e){
    var inputRepositoryName = this.refs.inputRepositoryName.value;
    
    console.log(this.props)
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
    
    
  }
  /* make group id required function ends*/

  /* go back to request function starts */

  goBackToRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.setState(function(){
      return{
        displayFieldset:'block',
        displayErrorBox:'none',
        displaySuceessBox:'none'
      }
    });

  }
  /* go back to request function ends */

  /* reload page function starts */
  reloadPage(){
    window.location.reload();
  }
  /* reload page function ends */
  /* Validation functions end*/

  /* submit function start*/

  submitRequest(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    if (confirm("Are you sure to request it?") === false ) {
      return false ;
    }
    var repositoryTypeOptions = this.refs.selectRepositoryType.options;
    var organizationOptions = this.refs.selectOrganization.options;
    var teamOptions = this.refs.selectTeam.options;
    var licenseOptions = this.refs.selectLicense.options;
    var languageOptions = this.refs.selectLanguage.options;
    
    var repositoryTypeText = repositoryTypeOptions[repositoryTypeOptions.selectedIndex].text;
    var organizationText = organizationOptions[organizationOptions.selectedIndex].text;
    var teamText = teamOptions[teamOptions.selectedIndex].text;
    var licenseText = licenseOptions[licenseOptions.selectedIndex].text;
    var languageText = languageOptions[languageOptions.selectedIndex].text;
    
    
    var repoName = StringValidations.escapeCharacters(this.refs.inputRepositoryName.value.toString());
    var repositoryName = StringValidations.escapeCharacters(this.refs.inputRepositoryName.value.toString()) ;
    var repositoryType = this.refs.selectRepositoryType.value;
    var organization = this.refs.selectOrganization.value;
    var team = this.refs.selectTeam.value;
    var license = this.refs.selectLicense.value;
    var language = StringValidations.escapeCharacters(this.refs.selectLanguage.value) ;
    var groupId = StringValidations.escapeCharacters(this.refs.inputGroupId.value.toString()) ;
    var buildable = this.refs.inputBuildable.checked;
    var nexus = this.refs.inputNexus.checked;
    var isPrivate = this.refs.inputPrivate.checked;
    var description = StringValidations.escapeCharacters(this.refs.textDescription.value.toString()) ;
    var requestedBy = StringValidations.escapeCharacters(this.state.userDetails.userEmail) ;

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

    var mailData = [
      repositoryName,
      languageText,
      buildable,
      nexus,
      isPrivate,
      description,
      groupId,
      licenseText,
      teamText,
      organizationText,
      repositoryTypeText,
      requestedBy
    ]; 
  

    this.setState(function(){
      return{
        displayFieldset:'none',
        displayLoader:'block'
      }
    })
    
    GitHubRepositoryCreation.startProcess(data,mailData,this.state.mainUsers).then(function(response) {
      
      if(response.data.completed === false){
        try{
            
            GitHubRepositoryTask.getTasks().then(function(responseTasks){
            var i = 0;
            var taskArraylength = responseTasks.data.length;

            var task;
              for(i=0;i<taskArraylength;i++){
                  task = responseTasks.data[i];
                  if(task.processInstanceId === response.data.id){
                      LM_REPOSITORY.updateTaskAndProcessIds([task.id,response.data.id,repoName]);
                      this.setState(function(){
                        return{
                          
                          displayLoader:'none',
                          displaySuceessBox:'block'
                        }
                      });
                      break;
                  }
              }
            }.bind(this));

        }catch(err){
          this.setState(function(){
            return{
              
              displayLoader:'none',
              displayErrorBox:'block'
            }
          });
        }
      }else{
        this.setState(function(){
          return{
            
            displayLoader:'none',
            displayErrorBox:'block'
          }
        });
      }
      this.setState(function(){
        return{
          
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
            <div className="col-lg-10" onChange={this.setTeams.bind(this)}>
              <select className="form-control" ref="selectOrganization" >
                {this.state.organizations.map((organization)=> <option key={organization.ORGANIZATION_ID} value={organization.ORGANIZATION_ID}>{organization.ORGANIZATION_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectTeam" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Team Name</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectTeam" >
                
                {this.state.teams.map((team,i)=> <option key={team.id} value={team.id} >{team.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLicense" className="col-lg-2 control-label">&nbsp;License</label>
            <div className="col-lg-10">
              <select className="form-control" ref="selectLicense">
                
                {this.state.licenseNames.map((license)=> <option key={license.LICENSE_ID} value={license.LICENSE_ID} data={license.LICENSE_NAME}>{license.LICENSE_NAME}</option>)}
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

        <div className="modal" style={{display:this.state.displaySuceessBox}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Succesfull</h4>
              </div>
              <div className="modal-body">
                <p><span><i className="fa fa-check" aria-hidden="true"></i></span>&nbsp;Request successfully submitted for approval via e-mail</p>
              </div>
              <div className="modal-footer">
                <Link to={"/"} ><button type="button" className="btn btn-default" data-dismiss="modal">Back to main page</button></Link>&nbsp;&nbsp;
                <button onClick={this.reloadPage.bind(this)} type="button" className="btn btn-success">Another Request</button>
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
                <p><span><i className="fa fa-times" aria-hidden="true"></i></span>&nbsp;Request sending fail</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.goBackToRequest.bind(this)} type="button" className="btn btn-default" data-dismiss="modal">Back</button>&nbsp;&nbsp;
                <Link to={"/requestRepository"} ><button type="button" className="btn btn-success">New Request</button></Link>
              </div>
            </div>
          </div>
        </div>
        
      </form>
    )

  }
}

export default RequestRepository;
