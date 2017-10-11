import React,{Component} from 'react';
import {Link} from 'react-router';


class LeftNav extends Component{

  render(){

    return(
      <ul className="nav nav-pills nav-stacked">

        {/*Repository dropdown start*/}
        <li className="dropdown">
          <Link className="dropdown-toggle" data-toggle="dropdown" >
            <span><i className="fa fa-files-o"></i></span>
              &nbsp;&nbsp;Repository&nbsp;&nbsp;
            <span className="caret"></span>
            <br/>
          </Link>
          <ul className="dropdown-menu">
            <li><Link to={"/root/requestRepository"}  ref="requestRepository"><span><i className="fa fa-plus-square-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Request</Link></li>
            <li className="divider"></li>
            
          </ul>

        </li>

        {/*Repository dropdown ends*/}

        
      </ul>
    )

  }
}

export default LeftNav;
