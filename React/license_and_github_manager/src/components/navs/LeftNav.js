import React,{Component} from 'react';
import {Link} from 'react-router';
import '../../App.css';


class LeftNav extends Component{

  render(){

    return(
      <ul className="nav nav-pills nav-stacked">

        {/*Repository dropdown start*/}
        <li className="dropdown">
          <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
            <span><i className="fa fa-files-o"></i></span>
              &nbsp;&nbsp;Repository&nbsp;&nbsp;
            <span className="caret"></span>
            <br/>
          </Link>
          <ul className="dropdown-menu">
            <li><Link to={"/"}  ref="requestRepository"><span><i className="fa fa-plus-square-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Request</Link></li>
            <li className="divider"></li>
            <li><Link to={"/searchRepository"}><span><i className="fa fa-search" aria-hidden="true"></i></span>&nbsp;&nbsp;Search</Link></li>
            
            
          </ul>

        </li>

        {/*Repository dropdown ends*/}

        
      </ul>
    )

  }
}

export default LeftNav;
