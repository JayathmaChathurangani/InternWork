import React, { Component } from 'react';
import { Link } from 'react-router';

/**
* @class UsRooter
* @extends {Component}
* @description Get user details
*/
class AdminLeftNav extends Component {
    /**
    * @class Root
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <ul className="nav nav-pills nav-stacked">
                {/* eslint-disable max-len */}
                <li className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" id="leftNavBarLink">
                        <span><i className="fa fa-files-o" /></span>
                          &nbsp;&nbsp;Repository&nbsp;&nbsp;
                        <span className="caret" />
                        <br />
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to={'/root/requestRepository'} ><span><i className="fa fa-plus-square-o" aria-hidden="true" /></span>&nbsp;&nbsp;Request</Link></li>
                        <li className="divider" />
                        <li><Link to={'/root/searchRepository?character=null'}><span><i className="fa fa-search" aria-hidden="true" /></span>&nbsp;&nbsp;Search</Link></li>
                    </ul>
                </li>
            </ul>
        );
    }
}

export default AdminLeftNav;
