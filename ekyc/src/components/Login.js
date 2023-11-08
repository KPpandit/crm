
import React, { Component } from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import Fullscreen from 'react-full-screen';
import idcard from '../id_card.png';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import logo from '../logo.png';
import newlogo from '../newlogo.png'
import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_bk';
import './style.scss';
import axios from 'axios';
import Bottomstrip from './Bottomstrip'
import Terms from './Terms';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: 'Gray',
        },
        color: 'Blue',
    },
    icon: {
        fill: 'Gray',
    },
}));



export default function Selfie(props) {
    const [tkn,settoken] = useState(localStorage.getItem('Token'));
    // const [showscreen,setscreen] = useState(true)
    // if(tkn.length>0){
    //     setscreen(false)
    // }
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const classes = useStyles();
    let loggedin = true;
    if (token == null) {
        loggedin = true;
    }
    const idwhich = localStorage.getItem('whichid');
    if (idwhich) {
        console.log("WhichId= "+idwhich);
    }

    const id_f = localStorage.getItem('imgId1');
    const id_b = localStorage.getItem('imgId2');
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    const [whichId, setWhichId] = useState(idwhich ? idwhich : '');
    const[show,setshow]=useState(false);
    const [appIsReady, setAppIsReady] = useState(false);
    //localStorage.clear();
        // localStorage.removeItem('Token');
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
        localStorage.removeItem('IconType');
        localStorage.removeItem('agentpin');
        localStorage.removeItem('adressdocumentType');
        
        
   

    useEffect(() => {
        
        localStorage.setItem('token', 'asadsfaddf');
        localStorage.removeItem('oksubmit');
        setTimeout(() => {
            setAppIsReady(true); // Set appIsReady to true when initialization is complete
          }, 7);
    },[]);

        // console.log(whichId);
        return (
            <Fragment >
            { 
            appIsReady ? (
                                              

                
        <div className="text-center">
             <img
                src={newlogo}
                style={{ height: 135 }}
                alt="logoo"
            ></img> 
            <img
                src={logo}
                style={{ height: 100 }}
                alt="logoo"
            ></img>
            <h3 style={{marginTop: 10 }} className="title-zest">Hello! Welcome to <br></br> e-KYC</h3>
            {/* <h5>KYC solution</h5><br></br> */}
            <br></br>
            <Link style={{ marginLeft: -20 }} to='/customerlogin'>
                <button className="button_id" style={{fontSize: 16,width: 290, padding:6}}>
                Existing Customer Re-Registration</button>
            </Link><br></br><br></br>
            <Link style={{ marginLeft: -20 }} to='/welcomeagent'>
                <button className="button_id" style={{fontSize: 16,width: 290,padding:5}}>  CHiLi Dealer/Agent</button>
            </Link>
        </div>

            )
            :
            <div className="app-splashscreen " >
            <div className="app-splashscreen-inner">
                <div className="app-label">
                </div>
                <div className="app-loader">
        
                </div>
            </div>
            
        </div>
            }
            
           <Bottomstrip></Bottomstrip>
        </Fragment>
        );


    }




