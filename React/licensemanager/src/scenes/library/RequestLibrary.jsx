/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import ValidateUser from '../../services/authentication/ValidateUser';
import User from '../../services/database/User';
import Library from '../../services/database/Library';
import StringValidations from '../../services/validations/StringValidations';
import LibraryProcess from '../../services/bpmn/LibraryProcess';

/**
 * @class RequestRepository
 * @extends {Component}
 * @description Sample React component
 */
class RequestLibrary extends Component {
    /**
    * @class RequestRepository
    * @extends {Component}
    * @param {any} props props for constructor
    * @description Sample React component
    */
    constructor(props) {
        super(props);
        this.state = {
            libraryMainUsers: [],
            libraryTypes: [],
            libraryCategories: [],
            buttonState: false,
            displayFieldset: 'block',
            displayLoader: 'none',
            displaySuceessBox: 'none',
            displayErrorBox: 'none',
            validateLibrary: '',
            userDetails: [],
        };
        this.validateInputLibrary = this.validateInputLibrary.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }
    /**
    * @class RequestRepository
    * @extends {Component}
    * @description Sample React component
    */
    componentWillMount() {
        ValidateUser.getUserDetails().then((response) => {
            this.setState(() => {
                return {
                    userDetails: response,
                };
            });
        });
        User.getLibraryMainUsers().then((response) => {
            this.setState(() => {
                return {
                    libraryMainUsers: response,
                };
            });
        });
        User.getLibraryCategories().then((response) => {
            this.setState(() => {
                return {
                    libraryCategories: response,
                };
            });
        });
        Library.selectTypes().then((response) => {
            this.setState(() => {
                return {
                    libraryTypes: response,
                };
            });
        });
    }
    /**
    * validation function for input repository name
    */
    validateInputLibrary() {
        const inputLibraryName = this.inputLibraryName.value.toString();
        const inputLibraryVersion = this.inputVersionWeUse.value.toString();
        Library.selectLibraryFromNameAndVersion(inputLibraryName, inputLibraryVersion).then((response) => {
            if (response.length > 0) {
                this.setState(() => {
                    return {
                        validateLibrary: 'Sorry! This Library already exists!',
                        buttonState: true,
                    };
                });
            } else {
                this.setState(() => {
                    return {
                        validateLibrary: ' ',
                        buttonState: false,
                    };
                });
            }
        });
    }
    /**
    * @param {any} e event
    * go back to request
    */
    goBackToRequest(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState(() => {
            return {
                displayFieldset: 'block',
                displayErrorBox: 'none',
                displaySuceessBox: 'none',
            };
        });
    }
    /**
    * reload page
    */
    reloadPage() {
        window.location.reload();
    }
    /**
    * @param {any} e event
    * go back to request
    * @returns {Promise} promise
    */
    submitRequest(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (confirm("Are you sure to request it?") === false ) {// eslint-disable-line
            return false;
        }
        const libraryTypeOptions = this.selectLibraryType.options;
        const libraryCategoryOptions = this.selectLibraryCategory.options;
        const libraryName = StringValidations.escapeCharacters(this.inputLibraryName.value);
        const libraryType = libraryTypeOptions[libraryTypeOptions.selectedIndex].text;
        const libraryCategory = libraryCategoryOptions[libraryCategoryOptions.selectedIndex].text;
        const libraryVersion = StringValidations.escapeCharacters(this.inputVersionWeUse.value);
        const libraryFileName = StringValidations.escapeCharacters(this.inputLibraryFileName.value);
        const libraryLatestVersion = StringValidations.escapeCharacters(this.inputLatestVersion.value);
        const libraryCompany = StringValidations.escapeCharacters(this.inputCompany.value);
        const librarySponsored = ((this.checkSponsored.children[0].checked) ? true : false);//eslint-disable-line
        const libraryPurpose = StringValidations.escapeCharacters(this.textPurpose.value);
        const libraryDescription = StringValidations.escapeCharacters(this.textDescription.value);
        const libraryAlternatives = StringValidations.escapeCharacters(this.testAlternatives.value);
        const requestByEmail = StringValidations.escapeCharacters(this.state.userDetails.userEmail);
        const data = {
            libName: libraryName,
            libType: libraryType,
            libCategory: libraryCategory,
            libUseVersion: libraryVersion,
            libLatestVersion: libraryLatestVersion,
            libFileName: libraryFileName,
            libCompany: libraryCompany,
            libSponsored: librarySponsored,
            libPurpose: libraryPurpose,
            libDescription: libraryDescription,
            libAlternatives: libraryAlternatives,
            libRequestBy: requestByEmail,
        };
        console.log(data);//eslint-disable-line
        console.log(this.state.libraryMainUsers);//eslint-disable-line
        LibraryProcess.startProcess(data, this.state.libraryMainUsers).then((response) => {
            if (response.data.completed === false) {
                try {
                    LibraryProcess.getTasks().then((responseTasks) => {
                        let i = 0;
                        const taskArraylength = responseTasks.data.length;
                        let task;
                        for (i = 0; i < taskArraylength; i++) {
                            task = responseTasks.data[i];
                            if (task.processInstanceId === response.data.id) {
                                console.log(task.processInstanceId);//eslint-disable-line
                                this.setState(() => {
                                    return {
                                        displayLoader: 'none',
                                        displaySuceessBox: 'block',
                                    };
                                });
                                break;
                            }
                        }
                    });
                } catch (err) {
                    this.setState(() => {
                        return {
                            displayLoader: 'none',
                            displayErrorBox: 'block',
                        };
                    });
                }
            } else {
                this.setState(() => {
                    return {
                        displayLoader: 'none',
                        displayErrorBox: 'block',
                    };
                });
            }
            this.setState(() => {
                return {
                    displayLoader: 'none',
                };
            });
        });
        this.setState(() => {
            return {
                displayFieldset: 'none',
                displayLoader: 'none',
            };
        });
        return false;
    }
    /**
    * @class RequestRepository
    * @extends {Component}
    * @description Sample React component
    */
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.submitRequest}>
                {/* eslint-disable max-len */}
                <h2 className="text-center">3rd Party Library Request</h2>
                <fieldset style={{ display: this.state.displayFieldset }}>
                    {/* eslint-disable max-len */}
                    <br />
                    <div className="form-group">
                        <label htmlFor="inputLibraryName" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Library Name
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputLibraryName = c; }}
                                placeholder="org.eclipse.osgi"
                                onChange={this.validateInputLibrary}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectLibraryType" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Library Type
                        </label>
                        <div className="col-lg-10" >
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectLibraryType = c; }} >
                                {this.state.libraryTypes.map((libraryType, i)=>
                                    (<option key={i} value={libraryType.LIB_TYPE}>
                                        {libraryType.LIB_TYPE}
                                    </option>))}
                            </select>
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selectLibraryCategory" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Library Type
                        </label>
                        <div className="col-lg-10" >
                            {/* eslint-disable */}
                            <select className="form-control" ref={(c) => { this.selectLibraryCategory = c; }} >
                                {this.state.libraryCategories.map((libraryCategory, i)=>
                                    (<option key={i} value={libraryCategory.ROLE_LIB_TYPE}>
                                        {libraryCategory.ROLE_LIB_TYPE}
                                    </option>))}
                            </select>
                            {/* eslint-enable */}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputVersionWeUse" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Version we use
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputVersionWeUse = c; }}
                                placeholder="2.6.1"
                                onChange={this.validateInputLibrary}
                            />
                            <span className="validate">
                                {this.state.validateLibrary}
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputLibraryFileName" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Library File Name
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputLibraryFileName = c; }}
                                placeholder="jsecurity-0.9.0.jar"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputLatestVersion" className="col-lg-2 control-label">
                            Latest Version
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputLatestVersion = c; }}
                                placeholder="2.6.3"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputCompany" className="col-lg-2 control-label">
                            Company
                        </label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                ref={(c) => { this.inputCompany = c; }}
                                placeholder="Eclipse"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        {/* eslint-disable max-len */}
                        <label htmlFor="checkSponsored" className="col-lg-2 control-label"> Sponsor by the Company </label>
                        <div className="col-lg-10" ref={(c) => { this.checkSponsored = c; }}>
                            <input type="radio" name="sponsored" value="Yes" /> Yes <br />
                            <input type="radio" name="sponsored" value="No" checked="true" /> No <br />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textPurpose" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Purpose
                        </label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                ref={(c) => { this.textPurpose = c; }}
                                placeholder="Purpose for using"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textDescription" className="col-lg-2 control-label">
                            <span className="required">*</span>&nbsp;Description
                        </label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                ref={(c) => { this.textDescription = c; }}
                                placeholder="About License"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="textAlternatives" className="col-lg-2 control-label">
                            Alternatives
                        </label>
                        <div className="col-lg-10">
                            <textarea
                                className="form-control"
                                rows="3"
                                ref={(c) => { this.testAlternatives = c; }}
                                placeholder="Alternative Libraries"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        {/* eslint-disable max-len */}
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="reset" className="btn btn-default">Cancel</button>
                            &nbsp;
                            <button type="submit" id="submitButton" className="btn btn-info" data-loading-text="Loading ..." disabled={this.state.buttonState} >
                                Request
                            </button>
                        </div>
                    </div>
                </fieldset>
                <div className="container-fluid" style={{ display: this.state.displayLoader }}>
                    <br /><br /><br />
                    <div className="row">
                        <div className="col-lg-5" />
                        <div className="col-lg-4">
                            <div className="loader" />
                        </div>
                        <div className="col-lg-3" />
                    </div>
                </div>

                <div className="modal" style={{ display: this.state.displaySuceessBox }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                />
                                <h4 className="modal-title">Succesfull</h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <span><i className="fa fa-check" aria-hidden="true" /></span>
                                    &nbsp;Request successfully submitted for approval via e-mail
                                </p>
                            </div>
                            <div className="modal-footer">
                                <Link to={'/'} >
                                    <button type="button" className="btn btn-default" data-dismiss="modal">
                                        Back to main page
                                    </button>
                                </Link>&nbsp;&nbsp;
                                <button
                                    onClick={this.reloadPage}
                                    type="button"
                                    className="btn btn-success"
                                >Another Request</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" style={{ display: this.state.displayErrorBox }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                />
                                <h4 className="modal-title">Failed</h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <span><i className="fa fa-times" aria-hidden="true" /></span>
                                    &nbsp;Request sending fail
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={this.goBackToRequest}
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    name="Back"
                                />
                                &nbsp;&nbsp;
                                <Link to={'/requestRepository'} >
                                    <button type="button" className="btn btn-success">
                                        New Request
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default RequestLibrary;