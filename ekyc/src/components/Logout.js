import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';
// import logo from '../logo.svg';
import logo from '../logo.png';
import newlogo from '../newlogo.png'
import './style.scss';
import './style1.css';
import Bottomstrip from './Bottomstrip';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        const oksubmit = localStorage.getItem('oksubmit');
         
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        localStorage.removeItem('imgData');
        localStorage.removeItem('imgId1');
        localStorage.removeItem('imgId2');
        localStorage.removeItem('date1');
        localStorage.removeItem('whichid');
        localStorage.removeItem('dob');
        localStorage.removeItem('imgId7');
        localStorage.removeItem('imgId2');
        localStorage.removeItem('imgId8');
        localStorage.removeItem('imgData');
        localStorage.removeItem('imgData');
        localStorage.removeItem('doc_f');
        localStorage.removeItem('address');
        localStorage.removeItem('whichdoc');
        localStorage.removeItem('adddressdocumentType');
        localStorage.removeItem('from');
        localStorage.removeItem('id_f');
        localStorage.removeItem('kyc-data');
        localStorage.removeItem('fn');
        localStorage.removeItem('ln');
        localStorage.removeItem('dob');
        localStorage.removeItem('gender');
        localStorage.removeItem('countryCode');
        localStorage.removeItem('id');
        localStorage.removeItem('whichid');
        localStorage.removeItem('IDtype');
        localStorage.removeItem('UserType');
        localStorage.removeItem('userType');
        localStorage.removeItem('correlationId');
        localStorage.removeItem('mn');
        localStorage.removeItem('dateOfBirth');
        localStorage.removeItem('pmUid');
        localStorage.removeItem('photograph');
        localStorage.removeItem('icta-process');
        localStorage.removeItem('data');
        localStorage.removeItem('whichdoc');
        localStorage.removeItem('kyc-photo');
        localStorage.removeItem('KYCresult');
        localStorage.removeItem('SelfieCompleted');
        localStorage.removeItem('selfieUpdateStatus');
        localStorage.removeItem('SelfieCompleted');
        localStorage.removeItem('oksubmit');
        localStorage.removeItem('email');
        localStorage.removeItem('type');
        localStorage.removeItem('puid');
        localStorage.clear();
        

        this.state = {
            oksubmit: oksubmit,
            token : localStorage.getItem("Token")
        };
    }
    render() {
        if (this.state.oksubmit === null) {
            return (
                    <div>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            className=""
                            src={newlogo}
                            style={{
                                height: 100,
                                marginTop: 100,
                            }}
                            alt="logoo"
                        ></img>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div>
                            you can{' '}
                            <ExternalLink href="https://www.chili.mu/">
                                <span>Visit the site</span>
                            </ExternalLink>
                        </div>
                        <div>
                            Or you can{' '}
                            <Link to="/categories">
                                <span onClick={()=>
                                {localStorage.clear()}}>login again </span>
                            </Link>
                        </div>
                    </div>
                    <Bottomstrip style/>
                    </div>
            );
        } else {
            return (
                    <div>
                    <div className="Auth-container" style={{ textAlign: 'center' }}>
                        <img
                            className=""
                            src={logo}
                            style={{
                                height: 100,
                                marginTop: 100,
                            }}
                            alt="logoo"
                        ></img>
                        <br></br>
                        <br></br>

                        {/* <Redirect to="/"></Redirect> */}
                        <h3 style={{ marginLeft: 12, padding: 10 }}>
                            {' '}
                            Thank You for Trusting us
                        </h3>
                        <h6 style={{ color: 'green' }}>
                            {' '}
                            Customer KYC is  verified.
                        </h6>
                        <div>
                            you can{' '}
                            <ExternalLink href="https://www.chili.mu/">
                                <span>Visit the site</span>
                            </ExternalLink>{' '}
                            for more information
                        </div>
                        <div>
                            Or you can{' '}
                            <Link to="/categories">
                                <span onClick={()=>
                                {localStorage.clear()}}>login again</span>
                            </Link>
                        </div>
                    </div>
                    <Bottomstrip/>
                    </div>
            );
        }
    }
}