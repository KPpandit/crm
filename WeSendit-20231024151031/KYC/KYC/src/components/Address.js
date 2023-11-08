import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import Fullscreen from 'react-full-screen';
import addressim from '../address.png';
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
import Bottomstrip from './Bottomstrip';

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


 

export default function Selfie(props) {
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

    //localStorage.removeItem('whichid');
    //localStorage.removeItem('imgId1');
    const doc_f = localStorage.getItem('imgId7');
    let photoclk = false;
    
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    const [whichId, setWhichId] = useState(docwhich ? docwhich : '');
    function handleChange_close() {
        setIsBkCameraOpen(false);
        setCardImage(undefined);
        setIsFull(false);
        upload(doc_f);
    }

    


    // setWhichId(docwhich);

    function upload() {
        // doc_f = localStorage.getItem('imgId1');
        localStorage.setItem('doc_f',doc_f);
        const formData = new FormData();
        formData.append('image', doc_f);
        formData.append('docname', localStorage.getItem('adressdocumentType'));
        formData.append('token', localStorage.getItem('Token'));
        photoclk = true;
        const request = axios.post('http://41.223.78.154:9898/api/processAddress', formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(function (response) {
                //console.log('successfully uploaded', doc_f);
                photoclk = false;
                localStorage.setItem('address',response.data.data.address);
                
                console.log("Addressresponse",localStorage.getItem('address'));
            })
            .catch(function (error){
               // onCloseAlert('error','Please try again later or visit the nearest CHiLi KYC center.');
                if (error.response) {
                    console.log(error.response.data);
                   const x =  error.response.status;
                    console.log(error.response.headers);
                    if(x==400){
                        alert(error.response.data.data)
                  }
                  

                }
            }
            
            );
            
    }
    console.log(isselfiecomplete)

    useEffect(() => {
        localStorage.setItem('whichdoc', whichId);
    });
    if (loggedin === false) {
        localStorage.clear();
        return <Redirect to="/"></Redirect>;
    } else {
        // console.log(whichId);
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
                        <PopoverBody>
                        1. Place your ID in the given overlay.<br></br> 2.
                            Don't worry about the extra space, it would be cropped
                            <br></br>3. Turn off the auto-rotate feature of your
                            mobile
                            <br></br> 4. You can always take it back.
                        </PopoverBody>
                    </Popover>
                </div>
                {UserType == "citizen"?
                <div style={{ textAlign: 'center' }}>
                <h5
                    style={{
                        textAlign: 'center',
                        color: '#1EC4DC',
                        marginLeft: 60,
                        marginTop: 20,
                    }}
                >
                    
                    Upload the proof of address
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
                    Your name and address must be clearly visible
                </div>
            </div>
            :UserType == "tourist"?
            <div style={{ textAlign: 'center' }}>
                <h5
                    style={{
                        textAlign: 'center',
                        color: '#1EC4DC',
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
        :null
        }
                
                <div
                    className="whichid"
                    style={{ marginLeft: 150, marginTop: 30 }}
                >
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id="demo-simple-select-autowidth-label"
                            style={{ marginLeft: -20,  color: 'Gray',  fontSize: 16, }}
                        >
                            Select Doc Type
                        </InputLabel>

                        {
                            UserType == "citizen"?
                            <Select
                            style={{ marginLeft: -20 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={whichId}
                            onChange={(e) => {
                                setWhichId(e.target.value);
                                localStorage.removeItem('imgId7');
                                // localStorage.removeItem('imgId1');
                                localStorage.setItem('adressdocumentType', e.target.value);
                                console.log("storage",localStorage.getItem('adressdocumentType'))
                            }}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="bank">Bank Statement</MenuItem>
                            <MenuItem value="ebill">Electricity Bill</MenuItem>
                            <MenuItem value="telecom">Telecom Bill </MenuItem>
                            <MenuItem value="internet">Internet Bill</MenuItem>
                            <MenuItem value="water">Water Bill</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                            :UserType == "tourist"?
                            <Select
                            style={{ marginLeft: -20 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={whichId}
                            onChange={(e) => {
                                setWhichId(e.target.value);
                                localStorage.removeItem('imgId2');
                                // localStorage.removeItem('imgId1');
                                localStorage.setItem('adressdocumentType', e.target.value);
                                console.log("storage",localStorage.getItem('adressdocumentType'))
                            }}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="visa">Visa Document</MenuItem>
                        </Select>
                        :null
                        }

                       

                    </FormControl>
                </div>
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
                                        localStorage.setItem("from","Addressproof")
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
                                
                                {docwhich && doc_f ? (
                                    
                                    <Link
                                        to="/validateadd"
                                        onClick={
                                            docwhich && doc_f
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
                                                docwhich && doc_f
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
                            src={`data:image/jpeg;base64,${doc_f}`}
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
        );


    }




}
