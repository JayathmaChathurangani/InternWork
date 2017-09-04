import React,{Component} from 'react';
import Header from '../components/layouts/Header';
import LeftNav from '../components/navs/LeftNav';

class Root extends Component{
  render(){

    return(
      <div className="container-fluid">
        <div className="row" id="header">
          <div className="col-md-12">
            <Header />
          </div>

        </div>
        <div className="row">
          <div className="col-md-2" id="leftNav">
            <LeftNav />
          </div>
          <div className="col-md-8">
            {this.props.children}
          </div>
        </div>
      </div>
    )

  }
}

export default Root;
