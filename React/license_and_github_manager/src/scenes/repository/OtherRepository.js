import React,{Component} from 'react';
import '../../App.css';

class OtherRepository extends Component{

  render(){
    
    return(
      <form className="form-horizontal"  >
        <h2 className="text-center">Other GitHub Repository Here</h2>
        
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
              <button type="submit" className="btn btn-danger">Reject</button>
            </div>
          </div>
        </fieldset>
      </form>
    )

  }
}

export default OtherRepository;
