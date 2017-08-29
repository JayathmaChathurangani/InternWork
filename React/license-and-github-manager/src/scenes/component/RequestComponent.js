import React,{Component} from 'react';

class RequestComponent extends Component{
  render(){

    return(
      <form className="form-horizontal">
        <br/>
        <fieldset>
          <legend>Request Component Here</legend>

          <div className="form-group">
            <label htmlFor="inputRepositoryName" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Repository Name</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputRepositoryName" placeholder="org.wso2.carbon.example" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputVersion" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Version</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputVersion" placeholder="4.1.0" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectProduct" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;Product</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectProduct">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLicense" className="col-lg-2 control-label"><span className="required">*</span>&nbsp;License</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectLicense">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="selectLibrary" className="col-lg-2 control-label">Library</label>
            <div className="col-lg-10">
              <select className="form-control" id="selectLibrary">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputType" className="col-lg-2 control-label">Type</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputType" placeholder="bundle" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputVendor" className="col-lg-2 control-label">Vendor</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputVendor" placeholder="" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputLanguage" className="col-lg-2 control-label">Language</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="inputLanguage" placeholder="Java,Go" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="textDescription" className="col-lg-2 control-label">Description</label>
            <div className="col-lg-10">
              <textarea className="form-control" rows="3" id="textDescription"></textarea>
            </div>
          </div>


          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default">Cancel</button>
              &nbsp;
              <button type="submit" className="btn btn-info">Request</button>
            </div>
          </div>
        </fieldset>
      </form>
    )

  }
}

export default RequestComponent;
