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
import MuiAlert from "@material-ui/lab/Alert";
import { TextField } from 'material-ui';

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

function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}
 

export default function Selfie(props) {
    const addressprooftype = localStorage.getItem('adressdocumentType')
    localStorage.setItem('IconType','edit');
    const agentNumber = localStorage.getItem("AgentNumber")
    const [validResponse, setValidResponse] = useState(true);
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const isselfiecomplete = localStorage.getItem("SelfieCompleted")
    const UserType = localStorage.getItem("userType")
    const[showbtn,setshowbtn]=useState(false)
    const[errmsg,seterrmsg]=useState()
   

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
    const doc_f = localStorage.getItem('imgId10');
    let photoclk = false;
    
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    const [whichId, setWhichId] = useState(docwhich ? docwhich : '');
    function handleChange_close() {
        setIsBkCameraOpen(false);
        setCardImage(undefined);
        setIsFull(false);
        // upload(doc_f);
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
        const request = axios.post('https://ekyc.chili.mu:9443/api/processAddress', formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(function (response) {
                setshowbtn(true)
                setValidResponse(true);

                //console.log('successfully uploaded', doc_f);
                photoclk = false;
                localStorage.setItem('address',response.data.data.address);
                
                console.log("Addressresponse",localStorage.getItem('address'));
            })
            .catch(function (error){
                // setshowbtn(true)

               // onCloseAlert('error','Please try again later or visit the nearest CHiLi KYC center.');
                if (error.response) {
                setValidResponse(false);
                seterrmsg(error.response.data.data)
                    console.log("error msg= ",error.response.data.data);
                   const x =  error.response.status;
                    console.log(error.response.data);
                //     if(x==404){
                //         alert(error.response.data.data)
                //   }
                  

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
                {
                    agentNumber==null || agentNumber.trim().length==0?
                    null
                    :<div  style={{marginTop:-50,textAlign:'center', marginLeft:75}}>
                        <label><strong>Agent Number:{agentNumber}</strong></label>
                        <Link to="/logout" style={{textAlign:'end',marginLeft:20,color:'black'}}>Logout</Link>
                        <br></br>
                    </div>
                }

                {!validResponse && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        {/* <Alert severity="error">You are already verified with another Token number Kindly visit your nearest
                         Chili Store to complete your E-KYC.</Alert> */}
                         <Alert severity="error">{errmsg}</Alert>
                    </div>
                )}
                
                
                
                <div style={{ textAlign: 'center' }}>
                <h5
                    style={{
                        textAlign: 'center',
                        color: '#f049ac',
                        marginLeft: 60,
                        marginTop: 20,
                    }}
                >
                    
                    Upload Consent Form
                </h5>
                <h6 style={{ color: 'Gray', marginLeft: 90 }}>
                    Please upload consentForm from Owner/landlord
                </h6>
                <div
                    style={{
                        fontSize: 12,
                        color: 'Gray',
                        textAlign: 'center',
                        marginLeft: 85,
                    }}
                >
                       <div>
                        <p>Please Take picture of ConsentForm and Addressproof together</p>
                        </div>                        
                </div>
            </div>
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
                                        localStorage.setItem("from","consentForm")
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
                                
                                {docwhich && doc_f && showbtn ? (
                                    
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
                                            Proceed
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
