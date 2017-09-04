import React,{Component} from 'react';
import LM_COMPONENT from '../../services/database/LM_COMPONENT'

class RequestComponent extends Component{

  /* Validation functions*/
  validateInputRepositoryName(e){
    var inputRepositoryName = this.refs.inputRepositoryName.value;
    var inputVersion = this.refs.inputVersion.value;
    LM_COMPONENT.selectComponentFromName(inputRepositoryName+inputVersion);

  }
    /* Validation functions end*/

  render(){

    return(
      <form className="form-horizontal">
        <br/>
        <fieldset>
          <legend>Request Component Here</legend>

          <div className="form-group">
            <label htmlFor="inputRepositoryName" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Name</label>
            <div className="col-lg-10">
              <input onChange={this.validateInputRepositoryName.bind(this)} type="text" className="form-control" ref="inputRepositoryName" id="inputRepositoryName" placeholder="carbon-identity-framework" required/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputProductName" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Component Name</label>
            <div className="col-lg-10">
              <input onChange={this.validateInputRepositoryName.bind(this)} type="text" className="form-control" ref="inputProductName" id="inputRepositoryName" placeholder="org.wso2.carbon.example" required/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputVersion" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Version</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputVersion" placeholder="4.1.0" required/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputGroupId" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Group ID</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputGroupId" placeholder="" required/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectProduct" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Product</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectProduct" >
                <option>wso2bam</option>
                <option>wso2esb</option>
                <option>wso2dss</option>
                <option>wso2as</option>
                <option>wso2am</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLicense" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;License</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectLicense">
                <option>apache2</option>
                <option>apache1</option>
                <option>lgpl2</option>
                <option>bsd</option>
                <option>gpl2</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputLanguage" className="col-lg-2 control-label">Language</label>
            <div className="col-lg-10">
            <select className="form-control" id="inputLanguage">
                <option>Ballerina</option>
                <option>Java</option>
                <option>Go</option>
                <option>React</option>
                
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="textDescription" className="col-lg-2 control-label">Description</label>
            <div className="col-lg-10">
              <textarea className="form-control" rows="3" id="textDescription" placeholder="description for README"></textarea>
            </div>
          </div>


          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default">Cancel</button>
              &nbsp;
              <button type="submit" className="btn btn-info" id="form-horizontal">Request</button>
            </div>
          </div>
        </fieldset>
      </form>
    )

  }
}

export default RequestComponent;
