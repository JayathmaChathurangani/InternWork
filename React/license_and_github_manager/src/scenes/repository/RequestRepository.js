import React,{Component} from 'react';
import ProgressButton from 'react-progress-button';
import LM_LICENSE from '../../services/database/LM_LICENSE';
import LM_REPOSITORYTYPE from '../../services/database/LM_REPOSITORYTYPE';
import LM_ORGANIZATION from '../../services/database/LM_ORGANIZATION';
import LM_TEAM from '../../services/database/LM_TEAM';
import LM_REPOSITORY from '../../services/database/LM_REPOSITORY';
import Common from '../../services/github/Common';
import CommGitHubRepositoryCreationon from '../../services/bpmn/GitHubRepositoryCreation';
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
      buttonState:false
    }
  }

  /* component did mount */
  componentDidMount(){
    {/* get all team details from database*/}
    LM_TEAM.getAllTeams().then(function(response){
      this.setState(function(){
        return {
          teams:response
        }
      })
    }.bind(this));
    {/* get all team details from database ends*/}

    {/*get all organizations types from database*/}
    LM_ORGANIZATION.getAllOrganizations().then(function(response){
      this.setState(function(){
        return {
          organizations:response
        }
      })
    }.bind(this));
    {/*get all organizations types from database*/}

    {/*get all repository types from database*/}
    LM_REPOSITORYTYPE.getAllRepositoryTypes().then(function(response){
      this.setState(function(){
        return {
          repositoryTypes:response
        }
      })
    }.bind(this));
    {/*get all repository types from database end*/}

    {/*get all languages from github api*/}
    Common.getAllLanguages().then(function(response){
      this.setState(function(){
        return {
          languages:response
        }
      })
    }.bind(this));
    {/*get all languages from github api ends*/}

    {/* get all license from database*/}
    LM_LICENSE.getAllLicenseNames().then(function(response){
      this.setState(function(){
        return{
          licenseNames:response
        }
      })
    }.bind(this));
    {/* get all license from database*/}

  }
   /* component did mount ends*/

  /* Validation functions*/
  validateInputRepositoryName(e){
    var inputRepositoryName = this.refs.inputRepositoryName.value;
    
    // if(inputRepositoryName.length == 0){
    //   this.setState(function(){
    //     console.log(inputRepositoryName.length);
    //     return{
    //       validateRepository:"Required",
    //       buttonState:true
    //     }
    //   })
    // }
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
    /* Validation functions end*/

    /* submit function start*/

    submitRequest(e){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (confirm("Are you sure to request it?") == false ) {
        return false ;
     }

      setTimeout(() => {
        var repositoryName = "'" + this.refs.inputRepositoryName.value.toString() + "'";
        var repositoryType = this.refs.selectRepositoryType.value;
        var organization = this.refs.selectOrganization.value;
        var team = this.refs.selectTeam.value;
        var license = this.refs.selectLicense.value;
        var language = "'" + this.refs.selectLanguage.value + "'";
        var groupId = "'" + this.refs.inputGroupId.value.toString() + "'";
        var buildable = this.refs.inputBuildable.checked;
        var isPrivate = this.refs.inputPrivate.checked;
        var description = "'" + this.refs.textDescription.value.toString() + "'";
        var requestedBy = "'buddhik@wso2.com'";

        var data = [
          repositoryName,
          language,
          buildable,
          isPrivate,
          description,
          groupId,
          license,
          team,
          organization,
          repositoryType,
          requestedBy
        ];   
        
        //LM_REPOSITORY.insertData(data);
        CommGitHubRepositoryCreationon.startProcess(data);
        //Mail.sendMail(data);
      }, 3000)
      
    }
    /* submit function ends*/

  render(){

    return(
      <form className="form-horizontal"  onSubmit={this.submitRequest.bind(this)}>
        <h2 className="text-center">Request GitHub Repository Here</h2>
        
        <fieldset>
          
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
            <label htmlFor="inputGroupId" className="col-lg-2 control-label">&nbsp;Group ID</label>
            <div className="col-lg-10">
              <input  type="text" className="form-control" ref="inputGroupId" id="inputRepositoryName" placeholder="org.wso2.example" />
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
              </div>
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
              <ProgressButton type="submit" className="btn btn-info" id="form-horizontal" disabled={this.state.buttonState} >Request</ProgressButton>
            </div>
          </div>
        </fieldset>
      </form>
    )

  }
}

export default RequestRepository;
