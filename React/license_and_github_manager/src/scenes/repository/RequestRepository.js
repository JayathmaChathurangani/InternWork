import React,{Component} from 'react';
import LM_COMPONENT from '../../services/database/LM_COMPONENT';
import LM_LICENSE from '../../services/database/LM_LICENSE';
import Common from '../../services/github/Common';

class RequestRepository extends Component{
  
  constructor(){
    super();
    this.state = {
      languages:[],
      licenseNames:[]
    }
  }

  componentDidMount(){

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

  /* Validation functions*/
  validateInputRepositoryName(e){
    var inputRepositoryName = this.refs.inputRepositoryName.value;
    
    LM_COMPONENT.selectComponentFromName(inputRepositoryName);

  }
    /* Validation functions end*/

    /* submit function start*/

    submitRequest(e){
      e.preventDefault();
      LM_COMPONENT.request();
    }
    /* submit function ends*/

  render(){

    return(
      <form className="form-horizontal">
        <h2 className="text-center">Request GitHub Repository Here</h2>
        
        <fieldset>
          
          <br/>
          <div className="form-group">
            <label htmlFor="inputRepositoryName" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Name</label>
            <div className="col-lg-10">
              <input onChange={this.validateInputRepositoryName.bind(this)} type="text" className="form-control" ref="inputRepositoryName" id="inputRepositoryName" placeholder="carbon-identity-framework" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectProduct" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Type</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectProduct" >
                <option>Component(Carbon)</option>
                <option>Product</option>
                <option>Forked Repository</option>
                <option>Extensions</option>
                <option>WSO2 Components</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputProductName" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Organization</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectProduct" >
                  <option>WSO2</option>
                  <option>WSO2 Extensions</option>
                  <option>WSO2 Incubator</option>
                  <option>Ballerinalang</option>
                  <option>WSO2 Support</option>
                </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputGroupId" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Group ID</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectProduct" >
                  
                </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLicense" className="col-lg-2 control-label">&nbsp;License</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectLicense">
                {this.state.licenseNames.map((license,i)=> <option key={i}>{license.LICENSE_NAME}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputLanguage" className="col-lg-2 control-label">Language</label>
            <div className="col-lg-10">
            <select className="form-control" id="inputLanguage">
              
              {this.state.languages.map((language,i)=> <option key={i}>{language}</option>)}
                
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputLanguage" className="col-lg-2 control-label">Configurations</label>
            <div className="col-lg-10">
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> Component Buildable
                </label>
                <br/><br/>
                <label>
                  <input type="checkbox" /> Make Private Repository
                </label>
              </div>
            </div>
          </div>

          
          <div className="form-group">
            <label htmlFor="textDescription" className="col-lg-2 control-label">Description</label>
            <div className="col-lg-10">
              <textarea className="form-control" rows="3" id="textDescription" placeholder="Description for README"></textarea>
            </div>
          </div>


          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default">Cancel</button>
              &nbsp;
              <button type="submit" className="btn btn-info" id="form-horizontal" onClick={this.submitRequest.bind(this)}>Request</button>
            </div>
          </div>
        </fieldset>
      </form>
    )

  }
}

export default RequestRepository;
