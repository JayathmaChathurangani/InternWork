import React,{Component} from 'react';
import axios from 'axios';
class Search extends Component {

  getKey(e){
    e.preventDefault();
    var keyValue = this.refs.inputEmail.value;
    const update = this.props;
    axios.post('http://www.localdom.lk:9090/databaseService/insertData', [{
    'firstName': 'Fred',
    'lastName': 'Flintstone'

    }])
    .then(function (response) {
      update.callUpdateState(response)
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render(){

    return(

      <div className="row">
        <div className="col-md-8">
          <form className="form-horizontal">
            <fieldset>
              <legend>Add</legend>
              <div className="form-group">
                <label htmlFor="inputEmail" className="col-lg-2 control-label">Email</label>
                <div className="col-lg-10">
                  <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="inputEmail"/>
                </div>
                <div className="col-lg-10 col-lg-offset-2">
                  <button type="reset" className="btn btn-default">Cancel</button>
                  <button type="submit" className="btn btn-primary" onClick={this.getKey.bind(this)}>Submit</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
export default Search;
