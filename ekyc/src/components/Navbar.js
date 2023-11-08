import anime from 'animejs';
import React from 'react';
import * as Icon from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import './style1.css';
import '../app1.css';
import thanklogo from '../logo.png';
import newlogo from'../newlogo.png';
function Navbar({ pages, darkMode, setDarkMode }) {
    const token = localStorage.getItem('token');
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
    const imgData = localStorage.getItem('imgData');
    const Data = localStorage.getItem('data');
    const id_f = localStorage.getItem('imgId1');
    const id_b = localStorage.getItem('imgId2');
    const icontype= localStorage.getItem('IconType')

    function refreshPage() {
        window.location.reload(false);
        // localStorage.clear();
    }
    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
        return (
            <>
                <div className="Navbar">
                    <div
                        className="navbar-left"
                        onClick={(darkMode) =>
                            setDarkMode((prevMode) => !prevMode)
                        }
                        onMouseEnter={() => {
                            if (window.innerWidth > 50) {
                                anime({
                                    targets: '.navbar-left path',
                                    strokeDashoffset: [anime.setDashoffset, 0],
                                    easing: 'easeInOutSine',
                                    duration: 150,
                                    delay: function (el, i) {
                                        return i * 10;
                                    },
                                    direction: 'alternate',
                                    loop: false,
                                });
                            }
                        }}
                    >
                        {window.innerWidth > 50 && (
                            <React.Fragment>
                                <span>
                                    {darkMode ? (
                                        <Icon.Sun color={'#ffc107'} />
                                    ) : (
                                        <Icon.Moon />
                                    )}
                                </span>
                            </React.Fragment>
                        )}
                    </div>

                    <div className="navbar-middle">
                        <span>
                            
                                <img
                                    src={thanklogo}
                                    style={{
                                        height: 70,
                                        width:70,
                                        marginLeft:-10
                                    }}
                                    alt="Logo"
                                ></img>
                            
                        </span>
                    </div>
                    <div
                        className="navbar-right"
                        onClick={() => {}}
                        onMouseEnter={() => {
                            if (window.innerWidth > 50) {
                                anime({
                                    targets: '.navbar-right path',
                                    strokeDashoffset: [anime.setDashoffset, 0],
                                    easing: 'easeInOutSine',
                                    duration: 450,
                                    delay: function (el, i) {
                                        return i * 250;
                                    },
                                    direction: 'alternate',
                                    loop: false,
                                });
                            }
                        }}
                    >
                        {window.innerWidth > 50 && (
                            <React.Fragment>
                                <span >
                                {icontype == 'Idproof'?
                                <Link
                                        to="/govtid"
                                        // onClick={
                                        //     id_f && id_b
                                        //         ? null
                                        //         : (e) => e.preventDefault()
                                        // }
                                        
                                    >
                                        
                                        <i className="bi bi-credit-card-2-front"></i>
                                    </Link>
                                :<Link
                                to="/govtid"
                                // onClick={
                                //     id_f && id_b
                                //         ? null
                                //         : (e) => e.preventDefault()
                                // }
                                
                            >
                                <Icon.CreditCard />
                                
                            </Link>}
                                    
                                </span>

                                <span>
                                    {/* <Link
                                        to="/selfie"
                                        onClick={
                                            imgData
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <Icon.Camera />
                                    </Link> */}
                                    {icontype == 'camera'?
                                    <i className="bi bi-camera"></i>
                                    :<Icon.Camera />
                                    }
                                    
                                </span>

                                <span>
                                    {/* <Link to="/address">
                                        <Icon.Edit />
                                    </Link> */}
                                    {icontype=="edit"?
                                    <i className="bi bi-pencil-square"></i>
                                    :<Icon.Edit />}
                                        

                                </span>
                                
                                
                                <span>
                                    {/* <Link
                                        to="/success"
                                        onClick={
                                            id_f && id_b && Data
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <Icon.UserCheck />
                                    </Link> */}
                                    {icontype=='check'?
                                    <i className="bi bi-clipboard-check"></i>
                                        :<Icon.UserCheck />}

                                </span>
                                {/* <span>
                                    <Link
                                        to="/documents"
                                        onClick={
                                            id_f 
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <Icon.Folder />
                                    </Link>
                                </span> */}
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <span>
                                    <Link to="/logout" onClick={refreshPage}>
                                        <Icon.LogOut></Icon.LogOut>
                                    </Link>
                                </span>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                <br></br>
                <br></br>
            </>
        );
    }
}

export default Navbar;