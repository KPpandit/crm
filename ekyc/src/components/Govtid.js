import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import {Fullscreen,useFullScreenHandle} from 'react-full-screen';
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
import Bottomstrip from './Bottomstrip'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MuiAlert from "@material-ui/lab/Alert";
import blurnid from '../blurnid.png'
import blurpassport from '../blurpassport.png'


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
    svg:{
        stroke:'Green'
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}

export default function Selfie(props) {
    const unique_id = uuid();
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const[showbtn,setshowbtn]=useState(false)
    const [cardImage, setCardImage] = useState();
    const [UserType] = useState(localStorage.getItem("usertype"))

    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const classes = useStyles();
    let loggedin = true;
    let isError = false;
    if (token == null) {
        loggedin = false;
    }
    const idwhich = localStorage.getItem('whichid');
    if (idwhich) {
        console.log(idwhich);
    }

    // console.log("category = "+uservalue);                    Check for UserType
    const uservalue = localStorage.getItem("userType");
    const [userType, setUserType] = useState(uservalue);
    const [shownxtbtn, setshownxtbtn] = useState(false)
    const agentNumber = localStorage.getItem("AgentNumber")


    let doc_f = '';
    const id_f = localStorage.getItem('imgId1');
    const doctype = localStorage.getItem('IDtype')
    if (id_f != null) { doc_f = id_f; }


    const id_b = localStorage.getItem('imgId2');
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    const [whichId, setWhichId] = useState(idwhich ? idwhich : '');
    function handleChange_close() {
        setIsBkCameraOpen(false);
        setCardImage(undefined);
        setIsFull(false);
        upload(id_f);
    }
    // setWhichId(idwhich);

    

    function upload() {
        localStorage.setItem('id_f', id_f);
        //localStorage.removeItem('imgId1');
        const formData = new FormData();
        formData.append('id64', id_f);
        formData.append('idType', localStorage.getItem('IDtype'));
        formData.append('residentType', uservalue);

        setPhotoClk(true);
        ///setIsResponseError(false);
        //https://ekyc.chili.mu:9443/api/processID
        const request = axios.post('https://ekyc.chili.mu:9443/api/processID', formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            }
        })
            .then(function (response) {
                setshowbtn(true)
                console.log('successfully uploaded', id_f);
                console.log(response.data.data.id, response.data.data.firstName);
                let id = response.data.data.id;

                if (new String(id).length < 4) {
                    setValidId(false);
                    
                } else {
                    setValidId(true);
                    setIsProcessComplete(true);
                    setPhotoClk(false);
                    localStorage.setItem('kyc-data', response.data.data);
                    localStorage.setItem('fn', response.data.data.firstName);
                    localStorage.setItem('ln', response.data.data.lastName);
                    localStorage.setItem('dob', response.data.data.dob);
                    localStorage.setItem('gender', response.data.data.gender);
                    localStorage.setItem('countryCode', response.data.data.countryCode);
                    localStorage.setItem('Token', response.data.data.token);
                    localStorage.setItem('id', response.data.data.id);
                }


            })
            .catch(function (error) {
                setshowbtn(true)
                setPhotoClk(false);
                setValidResponse(false);
                //onShowAlert('error', 'Please try again later or visit the nearest CHiLi KYC center.');
                if (error.response) {
                    console.log(error.response.data);
                    const x = error.response.status;
                    console.log(error.response.headers);
                    if (x == 400) {
                        //alert("Please try again")
                    }
                    if (x == 500) {
                        //alert("Please try again")
                        //onCloseAlert('error', 'Please try again later or visit the nearest CHiLi KYC center.');
                    }


                }
            }

            );

    }
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [photoClk, setPhotoClk] = useState(false);
    const [validResponse, setValidResponse] = useState(true);
    const [isProcessComplete, setIsProcessComplete] = useState(false);
    const [status, setStatus] = useState(true);
    const [validId, setValidId] = useState(true);
    const [tkn,settoken] = useState(localStorage.getItem('Token'));
    // const [ictype,SeticType]=useState('Idproof')
    //const [isResponseError, setIsResponseError] = useState[false];
    const [idtype,setidtype]=useState(localStorage.getItem ("IDtype"))
    function onChangeValue(event) {
        setidtype(event.target.value);
        console.log(event.target.value);
      }
    
    useEffect(() => {
        localStorage.setItem('IconType','Idproof');
        localStorage.setItem('whichid', whichId);
         console.log(userType)
        const idtype = localStorage.getItem('IDtype');
        console.log(idtype)
        window.addEventListener('online', () => setStatus(true))
        window.addEventListener('offline', () => setStatus(false))
    }, []);
    if (loggedin === false) {
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
                

                {!validId && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="error">Please upload a valid ID document. Refer to upload Tips.</Alert>
                    </div>
                )}
                {!validResponse && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="error">Error in validating provided details. Please try again.</Alert>
                    </div>
                )}
                {isProcessComplete && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="success">Successful. Please proceed </Alert>
                    </div>
                )}
                {!status && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="error">You are offline! Please check your internet connection.</Alert>
                    </div>
                )}
                    {
                        tkn==null || tkn.trim().length==0?
                <div>
                
                <div style={{ marginTop: 20, marginLeft: 90 }}>
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
                        <PopoverHeader>Id Tips</PopoverHeader>
                        <PopoverBody>
                            1. Place your ID in the given overlay.<br></br> 2.
                            Don't worry about the extra space, it would be cropped
                            <br></br>3. Turn off the auto-rotate feature of your
                            mobile
                            <br></br> 4. You can always take it back.
                        </PopoverBody>
                    </Popover>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                    {uservalue=="citizen"?
                    <div>
                        <h5
                        style={{
                            textAlign: 'center',
                            color: '#f049ac',
                            marginLeft: 60,
                            marginTop: 20,
                        }}
                    >
                        Upload the Identity Card
                    </h5>
                    <h6 style={{ color: 'Gray', marginLeft: 90, marginTop: 10, }}>
                        Please upload National ID Card (NIC)/Passport for KYC verification
                    </h6>
                    <div
                        style={{
                            fontSize: 12,
                            color: 'Gray',
                            textAlign: 'center',
                            marginLeft: 85,
                        }}
                    >
                        {
                            agentNumber==null || agentNumber.trim().length==0?
                            <div>Your name and photo must be clearly visible</div>
                            :<div>Customer name and photo must be clearly visible</div>
                        }
                        
                    </div>
                    </div>
                    :uservalue=="resident"?
                    <div>
                        <h5
                        style={{
                            textAlign: 'center',
                            color: '#f049ac',
                            marginLeft: 60,
                            marginTop: 20,
                        }}
                    >
                        Upload  Identity Card
                    </h5>
                    <h6 style={{ color: 'Gray', marginLeft: 90, marginTop: 10, }}>
                        Please upload Passport for KYC verification
                    </h6>
                    <div
                        style={{
                            fontSize: 12,
                            color: 'Gray',
                            textAlign: 'center',
                            marginLeft: 85,
                        }}
                    >
                      {
                            agentNumber==null || agentNumber.trim().length==0?
                            <div>Your name and photo must be clearly visible</div>
                            :<div>Customer name and photo must be clearly visible</div>
                        }
                    </div>
                    </div>
                    :uservalue=="tourist"?
                    <div>
                        <h5
                        style={{
                            textAlign: 'center',
                            color: '#f049ac',
                            marginLeft: 60,
                            marginTop: 20,
                        }}
                    >
                        Upload the Identity Card
                    </h5>
                    <h6 style={{ color: 'Gray', marginLeft: 90, marginTop: 10, }}>
                        Please upload your Passport for KYC verification
                    </h6>
                    <div
                        style={{
                            fontSize: 12,
                            color: 'Gray',
                            textAlign: 'center',
                            marginLeft: 85,
                        }}
                    >
                       {
                            agentNumber==null || agentNumber.trim().length==0?
                            <div>Your name and photo must be clearly visible</div>
                            :<div>Customer name and photo must be clearly visible</div>
                        }
                    </div>
                    </div>
                :null}
                    <div
                    className="whichid selfie_page"
                    style={{  marginTop: 10 }}
                >
                    <FormControl className={classes.formControl}>
                        
                        {userType == "citizen" ?
                        <div>
                            <InputLabel
                            id="demo-simple-select-autowidth-label"
                            style={{ marginLeft: 50, color: 'Gray' }}
                        >
                            <h6>Select Id</h6>
                            <br /><br />
                        </InputLabel>
                             <Select
                            style={{ marginLeft: -20 }}
                            labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={whichId}
                                onChange={(e) => {
                                    setWhichId(e.target.value);
                                    localStorage.removeItem('imgId2');
                                    // localStorage.removeItem('imgId1');
                                    localStorage.setItem('IDtype', e.target.value);
                                }}
                                className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                            >
                                <MenuItem value="nid">National Id</MenuItem>
                                <MenuItem value="Passport">Passport</MenuItem>
                            </Select>
                                
                           {/* <div onChange={onChangeValue}>
                                <input type="radio" value="nid" name="idtype" checked={idtype === "nid"} /> NID
                                <input type="radio" value="passport" name="idtype" /> Passport                                    
                            </div> */}






                            </div>
                            // : userType == "resident" ?
                            //     <Select
                            //         style={{ marginLeft: -20, marginTop: 30 }}
                            //         labelId="demo-simple-select-label"
                            //         id="demo-simple-select"
                            //         value={whichId}
                            //         onChange={(e) => {
                            //             setWhichId(e.target.value);
                            //             localStorage.removeItem('imgId2');
                            //             // localStorage.removeItem('imgId1');
                            //             localStorage.setItem('IDtype', e.target.value);
                            //             console.log(localStorage.getItem('IDtype'))
                            //         }}
                            //         className={classes.select}
                            //         inputProps={{
                            //             classes: {
                            //                 icon: classes.icon,
                            //             },
                            //         }}
                            //     >
                            //         {/* <MenuItem value="nid">National Id</MenuItem> */}
                            //         <MenuItem value="Passport">Passport</MenuItem>
                            //         {/* <MenuItem value="Employee Id">Employee Id</MenuItem> */}
                            //     </Select>
                            //     : userType == "tourist" ?
                            //         <Select
                            //         style={{ marginLeft: 40, marginTop: 30 }}
                            //             labelId="demo-simple-select-label"
                            //             id="demo-simple-select"
                            //             value={whichId}
                            //             onChange={(e) => {
                            //                 setWhichId(e.target.value);
                            //                 localStorage.removeItem('imgId2');
                            //                 // localStorage.removeItem('imgId1');
                            //                 localStorage.setItem('IDtype', e.target.value);

                            //             }}
                            //             className={classes.select}
                            //             inputProps={{
                            //                 classes: {
                            //                     icon: classes.icon,
                            //                 },
                            //             }}
                            //         >
                            //             <MenuItem value="Passport">Passport</MenuItem>
                            //         </Select>
                                    : userType == "organization" ?
                                    <div>
                                        <InputLabel
                            id="demo-simple-select-autowidth-label"
                            style={{ marginLeft: 50, color: 'Gray' }}
                        >
                            <h6>Select Id</h6>
                            <br /><br />
                        </InputLabel>
                                        <Select
                                            style={{ marginLeft: -20 }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={whichId}
                                            onChange={(e) => {
                                                setWhichId(e.target.value);
                                                localStorage.removeItem('imgId2');
                                                // localStorage.removeItem('imgId1');
                                                localStorage.setItem('IDtype', e.target.value);

                                            }}
                                            className={classes.select}
                                            inputProps={{
                                                classes: {
                                                    icon: classes.icon,
                                                },
                                            }}
                                        >
                                            <MenuItem value="nid">National Id</MenuItem>
                                            <MenuItem value="Passport">Passport</MenuItem>
                                        </Select>
                                        </div>
                                        : null
                        }

                    </FormControl>
                </div>
                </div>
                
                <div className="selfie_page">
                    {id_f && id_b ? null : (
                        
                        <div className="id_logo">
                            {doctype == "nid" ?
                            <img
                            className="idcard"
                            src={blurnid}
                            alt="idcard"
                            style={{
                                marginTop:40,
                                marginLeft: 15,
                                width:200,
                                height:'auto'
                            }}
                        ></img>
                            :<img
                            className="idcard"
                            src={blurpassport}
                            alt="idcard"
                            style={{
                                marginTop:40,
                                marginLeft: 15,
                                width:220,
                                height:'auto'
                            }}
                        ></img>
                            }
                            
                        </div>
                    )}
                    <br></br>
                    <br></br>
                    <br></br>
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
                                        localStorage.setItem("from", "govtId");

                                    }}
                                    style={{
                                        marginLeft: 40,
                                        fontSize: 16,
                                        width: 120,
                                    }}
                                >
                                    ID Scanner
                                </button>

                                {showbtn ? (

                                    
                                    <Link
                                        to="/validate"
                                        onClick={
                                            doctype && id_f
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <button
                                            className="button_id"
                                            style={{
                                                fontSize: 16,
                                                width: 120,
                                                marginLeft: 35
                                            }}
                                            disabled={
                                                doctype && id_f
                                                    ? false
                                                    : true
                                            }
                                        >
                                            Proceed
                                        </button>


                                    </Link>

                                ) : null}

                                 

                                    
                                    {/* <Link
                                        to="/validate"
                                        onClick={
                                            whichId && id_f
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <button
                                            className="button_id"
                                            style={{
                                                fontSize: 16,
                                                width: 120,
                                                marginLeft: 35
                                            }}
                                            disabled={
                                                whichId && id_f
                                                    ? false
                                                    : true
                                            }
                                        >
                                            Next Page
                                        </button>


                                    </Link> */}

                               

                                <div >{!photoClk || <Skeleton count={5} />}</div>

                            </div>
                            <br></br>



                            {(

                                <div
                                    style={{
                                        fontSize: 12,
                                        color: 'Gray',
                                        textAlign: 'center',
                                        marginLeft: 35,
                                        marginTop: -10,
                                    }}
                                >
                                    {doc_f && (
                                        <img
                                            className="classid_f"
                                            src={`data:image/jpeg;base64,${localStorage.getItem('imgId1')}`}
                                            height="150"
                                            width="240"
                                            alt="Front"
                                        />
                                    )}

                                    <br></br>
                                    <br></br>

                                    {/* <img
                                        className="classid_b"
                                        src={`data:image/jpeg;base64,${id_b}`}
                                        height="150"
                                        width="240"
                                        alt="Back"
                                    /> */}
                                </div>
                            )}
                        </Root>
                        <GlobalStyle />
                    </div>


                </div>
                </div>
                        :
                        
                        <div style={{ marginLeft:90, marginRight:30  }}>
                    <Alert severity="error">You are already logged in with Token No- {tkn} please logout from all active tabs.</Alert>
                </div>
                    }
                

                <Bottomstrip />
            </Fragment>
        );


    }




}