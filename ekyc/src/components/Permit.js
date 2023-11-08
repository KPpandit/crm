import react,{ useState } from "react"
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Bottomstrip from "./Bottomstrip";
import './custome.css'
import Axios from "axios";
import thankyou from '../thankyou.png'
import { Fragment, useEffect } from 'react';

// import ReactDOM from 'react-dom';
import Fullscreen from 'react-full-screen';
import addressim from '../address.png';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_bk';
import './style.scss';
import axios from 'axios';


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



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

export default function Permit(){
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const isselfiecomplete = localStorage.getItem("SelfieCompleted")
    const UserType = localStorage.getItem("userType")

    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const classes = useStyles();
    
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
    //localStorage.removeItem('kyc-photo');
    const docwhich = localStorage.getItem('whichdoc');
    if (docwhich) {
        console.log(docwhich);
    }

    const doc_f = localStorage.getItem('imgId7');

    const prmtpic = localStorage.getItem('imgId8');
    let photoclk = false;
    
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    const [whichId, setWhichId] = useState(docwhich ? docwhich : '');
    function handleChange_close() {
        let source = localStorage.getItem("from");
        setIsBkCameraOpen(false);
        setCardImage(undefined);
        setIsFull(false);       
            upload(doc_f);
    }

    function upload(){
        const formData = new FormData();
        formData.append('image', prmtpic);
        formData.append('token', localStorage.getItem('Token'));
        const req = axios.post("https://ekyc.chili.mu:9443/api/processPermit",formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function (response) {
            photoclk = false;
            console.log('address',response.data.data);

        }
        ).catch(function(error){
            if (error.response) {
                console.log(error.response.data);
               const x =  error.response.status;
                console.log(error.response.headers);
                if(x==400){
                    alert(error.response.data.data)
              }             

            }
        });
    }

    useEffect(() => {
        localStorage.setItem('whichdoc', whichId);
    });
    if (loggedin === false) {
        localStorage.clear();
        return <Redirect to="/"></Redirect>;
    }else{
        return (
            <Fragment>
                
                <div style={{ marginTop: -20, marginLeft: 90 }}>
                    <span>
                        <Icon.Info id="Popover1" type="button" />
                        Tips
                    </span>
                    <Popover
                        placement="bottom"
                        isOpen={popoverOpen}
                        target="Popover1"
                        toggle={toggle}
                    >
                        
                        <PopoverHeader>Address Proof Tips</PopoverHeader>
                        {
                            UserType == "resident"?
                            <div>
                                <PopoverBody>
                                1. Place your ID in the given overlay.<br></br> 
                                2. Don't worry about the extra space, it would be cropped
                            <br></br>3. Turn off the auto-rotate feature of your mobile
                            <br></br> 4. You can always take it back.
                                <br></br>5. Non-citizen Resident of Mauritius (Passport, UID, Resident Permit / Occupation Permit, Utility bill or any other Proof of Address)
                                </PopoverBody>
                            </div>
                            :UserType == "citizen"?
                            <div>
                                <PopoverBody>
                                1. Place your ID in the given overlay.<br></br> 
                                2. Don't worry about the extra space, it would be cropped
                            <br></br>3. Turn off the auto-rotate feature of your mobile
                            <br></br> 4. You can always take it back.
                            <br></br> 5. Citizen of Mauritius (NID/Passport & Utility bill or any other Proof of Address)
                                </PopoverBody>
                            </div>
                            :UserType == "tourist"?
                            <div>
                                <PopoverBody>
                                1. Place your ID in the given overlay.<br></br> 
                                2. Don't worry about the extra space, it would be cropped
                            <br></br>3. Turn off the auto-rotate feature of your mobile
                            <br></br> 4. You can always take it back.
                            <br></br> 5. Tourist (Passport or Valid Travel document & Proof of Address in Mauritius)
                                </PopoverBody>
                            </div>
                            :null
                        }
                       
                    </Popover>
                </div>
                {UserType == "citizen"?
                <div style={{ textAlign: 'center' }}>
                <h5
                    style={{
                        textAlign: 'center',
                        color: '#f049ac',
                        marginLeft: 60,
                        marginTop: 20,
                    }}
                >
                    
                    Upload the Resident Permit / Occupation Permit
                </h5>
                <h6 style={{ color: 'Gray', marginLeft: 90 }}>
                Please upload address proof for KYC verification
                </h6>
                <div
                    style={{
                        fontSize: 12,
                        color: 'Gray',
                        textAlign: 'center',
                        marginLeft: 85,
                    }}
                >
                    The details on the permit must be clearly visible
                </div>
            </div>
            :UserType == "tourist"?
            <div style={{ textAlign: 'center' }}>
                <h5
                    style={{
                        textAlign: 'center',
                        color: '#f049ac',
                        marginLeft: 60,
                        marginTop: 20,
                        
                    }}
                >
                    Upload the Visa proof
                </h5>
                <h6 style={{ color: 'Gray', marginLeft: 90 }}>
                Please upload Visa for KYC verification
                </h6>
                <div
                    style={{
                        fontSize: 12,
                        color: 'Gray',
                        textAlign: 'center',
                        marginLeft: 85,
                    }}
                >
                    Your name and other details must be clearly visible
                </div>
            </div>
            :UserType == "resident"?
            <div style={{ textAlign: 'center' }}>
                <h5
                    style={{
                        textAlign: 'center',
                        color: '#f049ac',
                        marginLeft: 60,
                        marginTop: 20,
                    }}
                >
                    Upload the Permit
                </h5>
                <h6 style={{ color: 'Gray', marginLeft: 90 }}>
                Please upload Permit for KYC verification
                </h6>
                <div
                    style={{
                        fontSize: 12,
                        color: 'Gray',
                        textAlign: 'center',
                        marginLeft: 85,
                    }}
                >
                    Your name and other details must be clearly visible
                </div>
            </div>
        :null
        }
                
               <br></br>
               <br></br>
               <br></br>
                <div className="selfie_page">
                    { (
                        <div className="id_logo">
                            <img
                                className="idcard"
                                src={addressim}
                                alt="address"
                                style={{ 
                                    marginTop: 55,
                                    marginLeft: 15,
                                }}
                            ></img>
                        </div>
                        )}
                        <div className="">
                        <Root>
                            <Fullscreen
                                enabled={isFull}
                                onChange={(isFull) => setIsFull(isFull)}
                            >
                                {isBkCameraOpen && isFull && (
                                    <Camera
                                        onCapture={(blob) => setCardImage(blob)}
                                        onClear={() => setCardImage(undefined)}
                                        changekaru={handleChange_close}
                                        
                                    />
                                    
                                )}
                                
                                {cardImage && (
                                    <div>
                                        <h2>Preview</h2>
                                        <Preview
                                            src={
                                                cardImage &&
                                                URL.createObjectURL(cardImage)
                                            }
                                        />
                                    </div>
                                )}
                            </Fullscreen>
                            <div className="camera-btn1">
                                <button
                                    className="button_id"
                                    onClick={() => {
                                        setIsBkCameraOpen(true);
                                        setIsFull(true);
                                        localStorage.setItem("from","Permit")
                                    }}
                                    style={{
                                        marginLeft: 55,
                                        marginTop: 55,
                                        fontSize: 16,
                                        width: 120,
                                    }}
                                >
                                    Scan
                                </button>
                                
                                { 
                                  prmtpic ? (
                                    
                                    <Link
                                        to="/address"
                                        onClick={
                                             prmtpic
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <button
                                            className="button_id"
                                            style={{
                                                fontSize: 16,
                                                width: 120,
                                            }}
                                            disabled={
                                                  prmtpic
                                                    ? false
                                                    : true
                                            }
                                        >
                                            Next Page
                                        </button>
                                    </Link>
                                ) : null}
                                {/* <button
                                        className="button"
                                        onClick={() => {
                                            setIsBkCameraOpen(false);
                                            setCardImage(undefined);
                                            setIsFull(false);
                                        }}
                                    >
                                        Close Camera
                                    </button> */}
                            </div>
                        </Root>
                    <GlobalStyle />
                    </div>
                    <br></br><br></br>
                    
                    <div className="header">
                        <img
                            className="classid_f"
                            src={`data:image/jpeg;base64,${prmtpic}`}
                            height="150"
                            width="240"
                            alt="Front"
                        />
                        <br></br>
                        <br></br>                      
                    </div>
                    
                </div>
                
                <Bottomstrip/>
            </Fragment>
        )
    }

    
}
