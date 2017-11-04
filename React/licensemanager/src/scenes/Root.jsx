import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppHeader from '../components/layouts/AppHeader';
import AdminHeader from '../components/layouts/AdminHeader';
import LeftNav from '../components/navs/LeftNav';
import AdminLeftNav from '../components/navs/AdminLeftNav';
import ValidateUser from '../services/authentication/ValidateUser';

/**
* @class UsRooter
* @extends {Component}
* @description Get user details
*/
class Root extends Component {
    /**
    * constructor
    * @param {any} props props
    */
    constructor(props) {
        super(props);
        this.state = {
            isAdminUser: null,
            isValidUser: null,
            displayChildren: 'block',
            displayError: 'none',
            displayNav: 'block',
            displayHeader: 'block',
            userDetails: [{ isValid: false, userDetails: null }],
        };
    }
    /**
    * @class Root
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        const adminPages = ['/root/acceptRepository', '/root/waitingRequests'];
        const props = this.props;
        ValidateUser.isValidUser().then((response) => {
            if (response.isValid) {
                this.setState(() => {
                    return {
                        isValidUser: response.isValid,
                        isAdminUser: response.isAdmin,
                        userDetails: response,
                    };
                });
            } else {
                this.setState(() => {
                    return {
                        isValidUser: response.isValid,
                        isAdminUser: response.isAdmin,
                        displayChildren: 'none',
                        displayError: 'block',
                        displayNav: 'none',
                        displayHeader: 'none',
                    };
                });
            }
            console.log(props.location.pathname);//eslint-disable-line
            console.log(this.state.isAdminUser);//eslint-disable-line
            if (adminPages.indexOf(props.location.pathname) !== -1 && !this.state.isAdminUser) {
                this.setState(() => {
                    return {
                        displayChildren: 'none',
                        displayError: 'block',
                        displayNav: 'none',
                        displayHeader: 'none',
                    };
                });
            } else if (adminPages.indexOf(props.location.pathname) !== -1 && this.state.isAdminUser) {
                this.setState(() => {
                    return {
                        displayChildren: 'block',
                        displayError: 'none',
                        displayNav: 'block',
                        displayHeader: 'block',
                    };
                });
            }
        });
    }
    /**
    * @class Root
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        const props = this.props;
        return (
            <MuiThemeProvider>
                <div className="container-fluid">
                    <div className="row" id="header">
                        <div className="col-md-12" style={{ display: this.state.displayHeader }} >
                            {/* eslint-disable max-len */}
                            {(this.state.isAdminUser === true) ? <AdminHeader userDetails={this.state.userDetails} /> : <AppHeader userDetails={this.state.userDetails} /> }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2" id="leftNav" style={{ display: this.state.displayNav, paddingLeft: '0px' }}>
                            {(this.state.isAdminUser === true) ? <AdminLeftNav /> : <LeftNav /> }
                        </div>
                        <div className="col-md-10" style={{ display: this.state.displayChildren, height: '90vh', overflowY: 'auto', overflowX: 'hidden' }} >
                            {props.children}
                        </div>
                    </div>

                    <div className="row" style={{ display: this.state.displayError }}>
                        <div className="col-md-10" >
                            <br />
                            <div className="alert alert-dismissible alert-danger">
                                <div className="panel panel-danger">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Login Error</h3>
                                    </div>
                                    <div className="panel-body" style={{ color: 'black' }}>
                                        Invalid Login
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Root;