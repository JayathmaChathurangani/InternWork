import React,{Component} from 'react';
import {Link} from 'react-router';


class AdminLeftNav extends Component{

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
            <li><Link to={"/requestRepository"}  ref="requestRepository"><span><i className="fa fa-plus-square-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Request</Link></li>
            <li className="divider"></li>
            <li><Link to={"/searchRepository"}><span><i className="fa fa-search" aria-hidden="true"></i></span>&nbsp;&nbsp;Search</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-pencil" aria-hidden="true"></i></span>&nbsp;&nbsp;Edit</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Delete</Link></li>
          </ul>

        </li>

        {/*Repository dropdown ends*/}

        {/*Component dropdown start*/}
        <li className="dropdown">
          <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
            <span><i className="fa fa-folder-open"></i></span>
              &nbsp;&nbsp;Component&nbsp;&nbsp;
            <span className="caret"></span>
            <br/>
          </Link>
          <ul className="dropdown-menu">
            <li><Link to={"/root/requestComponent"}  ref="requestComponent"><span><i className="fa fa-plus-square-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Request</Link></li>
            <li className="divider"></li>
            <li><Link to={"/showComponent"}><span><i className="fa fa-eye" aria-hidden="true"></i></span>&nbsp;&nbsp;Show</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-search" aria-hidden="true"></i></span>&nbsp;&nbsp;Search</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-pencil" aria-hidden="true"></i></span>&nbsp;&nbsp;Edit</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Delete</Link></li>
          </ul>

        </li>

        {/*Component dropdown ends*/}

        {/*Library dropdown start*/}
        <li className="dropdown">
          <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
            <span><i className="fa fa-book"></i></span>
              &nbsp;&nbsp;Library&nbsp;&nbsp;
            <span className="caret"></span>
          </Link>

          <ul className="dropdown-menu">
            <li><Link ><span><i className="fa fa-plus-square-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Request</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-eye" aria-hidden="true"></i></span>&nbsp;&nbsp;Show</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-pencil" aria-hidden="true"></i></span>&nbsp;&nbsp;Edit</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Delete</Link></li>
          </ul>
        </li>
        {/*Library dropdown start*/}

        {/*License dropdown start*/}
        <li className="dropdown">
          <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
            <span><i className="fa fa-id-card-o"></i></span>
              &nbsp;&nbsp;License&nbsp;&nbsp;
            <span className="caret"></span>
          </Link>

          <ul className="dropdown-menu">
            <li><Link ><span><i className="fa fa-plus-square-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Request</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-eye" aria-hidden="true"></i></span>&nbsp;&nbsp;Show</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-pencil" aria-hidden="true"></i></span>&nbsp;&nbsp;Edit</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Delete</Link></li>
          </ul>
        </li>
        {/*License dropdown start*/}

        {/*Package dropdown start*/}
        <li className="dropdown">
          <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
            <span><i className="fa fa-briefcase"></i></span>
              &nbsp;&nbsp;Package&nbsp;&nbsp;
            <span className="caret"></span>
          </Link>

          <ul className="dropdown-menu">
            <li><Link ><span><i className="fa fa-plus-square-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Request</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-eye" aria-hidden="true"></i></span>&nbsp;&nbsp;Show</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-pencil" aria-hidden="true"></i></span>&nbsp;&nbsp;Edit</Link></li>
            <li className="divider"></li>
            <li><Link ><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp;Delete</Link></li>
          </ul>
        </li>
        {/*Package dropdown start*/}
      </ul>
    )

  }
}

export default AdminLeftNav;
