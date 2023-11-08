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
        localStorage.clear();
        this.state = {
            oksubmit: oksubmit,
        };
    }
    render() {
        if (this.state.oksubmit === null) {
            return (
                <body class="">
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
                            <Link to="/">
                                <span>login again </span>
                            </Link>
                        </div>
                    </div>
                    <Bottomstrip style/>
                </body>
            );
        } else {
            return (
                <body class="">
                    <div style={{ textAlign: 'center' }}>
                        <img
                            className="logoo"
                            src={newlogo}
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
                            Thank you for trusting us
                        </h3>
                        <h6 style={{ color: 'green' }}>
                            {' '}
                            Your KYC is complete and verified.
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
                            <Link to="/">
                                <span>login again</span>
                            </Link>
                        </div>
                    </div>
                    <Bottomstrip/>
                </body>
            );
        }
    }
}
