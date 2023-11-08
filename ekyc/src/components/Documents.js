import React from 'react';
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

import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_bk';
import './style.scss';
import axios from 'axios';
import { v4 as uuid } from 'uuid'; 

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



export default function Documents(props) {
    
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const classes = useStyles();
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
   

    const id_f = localStorage.getItem('id_f');
    const doc_f = localStorage.getItem('doc_f');
    const kyc_p = localStorage.getItem('kyc-photo');
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    
    

    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
       
        return (
            <Fragment>
                <div style={{ marginTop: -20, marginLeft: 90 }}>
                    
         
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h5
                        style={{
                            textAlign: 'center',
                            color: 'blue',
                            marginLeft: 60,
                            marginTop: 40,
                        }}
                    >
                        KYC - Uploaded Documents
                    </h5>
                    <h6 style={{ color: 'Gray', marginLeft: 90,  marginTop: 10, }}>
                        All your documents for the KYC
                    </h6>
                    
                </div>
              
                <div className="selfie_page">
                    
                    <div className="header">
                        <img
                            className="classid_f"
                            src={`data:image/jpeg;base64,${id_f}`}
                            height="150"
                            width="240"
                            alt="Front"
                        />
                        <br></br>
                        <br></br>

                        <img
                            className="classid_b"
                            src={`data:image/jpeg;base64,${doc_f}`}
                            height="150"
                            width="240"
                            alt="Back"
                        />
                        <img
                            className="classid_b"
                            src={`data:image/jpeg;base64,${kyc_p}`}
                            height="150"
                            width="240"
                            alt="Back"
                        />
                    </div>
                </div>
            </Fragment>
        );


    }




}
