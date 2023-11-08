import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Fullscreen from 'react-full-screen';
import * as Icon from 'react-feather';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import imgMale from '../male.png';
import imgFemale from '../female.png';
import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_fr';
import { Camera as Camera_} from '../camera_bk';
import './style.scss';
import axios from 'axios';
import Bottomstrip from './Bottomstrip';
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Moment from 'moment';


export default function Selfie(props) {
    const agentNumber = localStorage.getItem("AgentNumber")
    const [isFrCameraOpen, setIsFrCameraOpen] = useState(false);
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [isBackCam, setIsBackCam] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
    const id_f = localStorage.getItem('id_f');
    const Selfie1 = localStorage.getItem('imgData');
    const [isFull, setIsFull] = useState(true);
    const kyc_p = localStorage.getItem('kyc-photo');
    const UserType= localStorage.getItem("userType")
    let selfieclk = false;
    let isError = false;
    let kyc_f = '';
    let kyc_status = '';
    if (kyc_p != null) {
        kyc_f = kyc_p.substring(1).replaceAll('\'', "");
        console.log("kyc_p", kyc_f);
    }

    // const who = ;
    const who1 = JSON.parse(localStorage.getItem('data'));
    function handleChange_close() {
        setIsFrCameraOpen(false);
        setCardImage(undefined);
        setIsFull(false);
        validate();
    }
    let idCardBase64 = '';

const[gotoaddbtn,setgotoaddbtn]=useState(false)

function showbtn(){
    setgotoaddbtn(true)

}

function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}

const [alertVisibility, setAlertVisibility] = useState(false);
    const [photoClk, setPhotoClk] = useState(false);


    const [status, setStatus] = useState(true);
    const [validId, setValidId] = useState(true);
    const [validResponse, setValidResponse] = useState(false);
    const [processComplete, setIsProcessComplete] = useState(false);

    
    useEffect(() => {

        
        window.addEventListener('online', () => setStatus(true))
        window.addEventListener('offline', () => setStatus(false))
    }, []);

let tokenStr = localStorage.getItem('Token');    
let dob = localStorage.getItem('dateOfBirth');
dob = dob.replaceAll('/','-');
//let d = new Date(dob);
        //dob = Moment(dob).format('DD-MM-YYYY');
        console.log('converted dob',dob);
 let fn = localStorage.getItem('fn');
 let ln = localStorage.getItem('ln');
 let gender = localStorage.getItem('gender'); 
 let id = localStorage.getItem('id');      
 let cc = localStorage.getItem('countryCode');
 
console.log('token', localStorage.getItem('Token'));
console.log('dob', localStorage.getItem('dateOfBirth'));
console.log('firstName', localStorage.getItem('fn'));
console.log('gender', localStorage.getItem('gender'));
console.log('id', localStorage.getItem('id'));
console.log('lastName', localStorage.getItem('ln'));
console.log('countryCode', localStorage.getItem('countryCode'));

function spoofCheck(){

    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
    'image': Selfie1,
    });

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://182.74.113.62:9002/ekyc/validate',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
    };

    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
            
    })
    .catch((error) => {
    console.log(error);
 
    });



}


    function validate(){
       // spoofCheck();
        setPhotoClk(true);
        const axios = require('axios');
        const qs = require('qs');
        let selfie = Selfie1;
        if(isBkCameraOpen && selfie.length==0){
            selfie = id_f;
        }
        let data = qs.stringify({
        'token': tokenStr,
        'selfie64': selfie,
        'dob': dob,
        'firstName': fn,
        'gender': gender,
        'id': id,
        'lastName': ln,
        'countryCode': cc,
        'email': 'test@test.mu' 
        });

        let config = {
        method: 'put', 
        maxBodyLength: Infinity,
        url: 'https://ekyc.chili.mu:9443/api/processID',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        setPhotoClk(false);
        
                //console.log('successfully uploaded', id_f);
                selfieclk = false;
                kyc_status = response.data.data.match_status;
               // window.location.reload(false);
                console.log('successfully uploaded+++', kyc_status);
                if(kyc_status == 'true' || kyc_status ){
                    setIsProcessComplete(true);
                }
                let result = response.data.data;

                localStorage.setItem('kyc-photo', response.data.data.image);

                localStorage.setItem("KYCresult",result)
                localStorage.setItem("SelfieCompleted","true");

                if(result.includes("detail already there with token")){
                    alert(result+" "+"Please visit nearest Chili Store");
                    localStorage.setItem("SelfieCompleted","false");
                }
                localStorage.setItem("selfieUpdateStatus",response.data.status);
                //kyc_status = response.data.data.match_status;
                
        })
        .catch((error) => {
            setPhotoClk(false);    
        console.log(error);
        isError = true;
                setValidResponse(true);
                if (error.response) {
                    localStorage.setItem("SelfieCompleted","false");
                    console.log(error.response.data);
                   const x =  error.response.status;
                    console.log(error.response.headers);
                    if(x==400){
                        //alert("Please fill the Validation Form completely ");
                  }
                  

                }
        });

        
    }

  

   
    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
        return (
            

            <div className="selfie_page">
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
                        <Alert severity="error">Please upload the selfie again. Refer to upload Tips.</Alert>
                    </div>
                )}
                {validResponse && !processComplete &&(
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="error">Error in validating provided details. Please try again.</Alert>
                    </div>
                )}
                {processComplete && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="success">Your face verification process is complete. Please proceed.</Alert>
                    </div>
                )}
                {!status && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="error">You are offline! Please check your internet connection.</Alert>
                    </div>
                )}
                
                <div className="popi" style={{ marginTop: 20,}}>
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
                        <PopoverHeader>Selfie Tips</PopoverHeader>
                        <PopoverBody>
                        1. Look directly into the screen. <br></br> 2. Try to
                            Keep things natural.
                            <br></br> 3.Adjust your face in the oval-shaped overlay
                            <br></br> 4. Click on the selfie and save it where you can
                            resume.
                        </PopoverBody>
                    </Popover>
                </div>
                <div style={{ color: '#f049ac', textAlign: 'center' }}>
                    <h5 style={{ marginLeft: 70 }}> Take a selfie</h5>
                    <h6 style={{ marginLeft: 80, color: 'Gray' }}>
                    Please upload a selfie for KYC verification
                    </h6>
                    <div
                        style={{
                            fontSize: 12,
                            color: 'Gray',
                            textAlign: 'center',
                            marginLeft: 85,
                        }}
                    >
                        Make sure the face is clearly visible without any blurring
                    </div>
                </div>
                
                <Fragment>
                <div>{  !photoClk || <Skeleton count={50} />}</div>
                    {Selfie1 ? (
                        <div className="imgMale_div">
                            <img
                                className="selpic_selfiepage"
                                src={`data:image/jpeg;base64,${Selfie1}`}
                                height="250"
                                width="220"
                                alt="selpic_selfiepage"
                                style={{ marginTop: 50, marginLeft: -100 }}
                            />
                        </div>
                    ) : (
                        <div className="imgMale_div">
                            <img
                                className="imgMale"
                                src={
                                    who1 && who1.details.gender === 'Female'
                                        ? imgFemale
                                        : imgMale
                                }
                                alt="imgMale"
                            ></img>
                        </div>
                    )}
                    <Fragment>
                        <div className="">
                            <Root>
                                <Fullscreen
                                    enabled={isFull}
                                    onChange={(isFull) => setIsFull(isFull)}
                                >
                                    {isFrCameraOpen && isFull && (
                                        <Camera
                                            onCapture={(blob) =>
                                                setCardImage(blob)
                                            }
                                            onClear={() =>
                                                setCardImage(undefined)
                                            }
                                            // fullhaikya={isFull}
                                            changekaru={handleChange_close}
                                        />
                                    )}
                                    {isBkCameraOpen && isFull && (
                                        <Camera_
                                            onCapture={(blob) =>
                                                setCardImage(blob)
                                                
                                            }
                                            onClear={() =>
                                                setCardImage(undefined)
                                            }
                                            
                                            // fullhaikya={isFull}
                                            changekaru={handleChange_close}
                                        />
                                    )}
                                    {cardImage && (
                                        <div
                                        >
                                            <h2>Preview</h2>
                                            <Preview

                                                src={
                                                    cardImage &&
                                                    URL.createObjectURL(
                                                        cardImage
                                                    )
                                                }

                                            />
                                        </div>
                                    )}
                                    { (
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: 'Gray',
                                                textAlign: 'center',
                                                
                                                marginTop: 350,
                                            }}
                                        >
                                            
                                            {/* <h6>KYC Photo verification</h6>
                                            <h6>{kyc_status}</h6> */}
                                            
                                            <div>{  !photoClk || <Skeleton count={50} />}</div>
                                            
                                          {/* {kyc_f &&(<img
                                                className="selpic_selfiepage"
                                                src={`data:image/jpeg;base64,${kyc_f}`}
                                                height="250"
                                                width="220"
                                                alt="selpic_selfiepage"
                                                style={{ marginTop: 20,  marginLeft: -70}}
                                            />)}   */}
                                        </div>
                                    )
                                    
                                    }
                                    {/* <button
                                    className="button"
                                    onClick={() => {
                                        setIsFrCameraOpen(false);
                                        setCardImage(undefined);
                                        setIsFull(false);
                                    }}
                                >
                                    Close Camera
                                </button> */}
                                </Fullscreen>
                                <div className="camera-btn">
                                    <button
                                        className="button"
                                        onClick={() => {
                                            setIsFrCameraOpen(true);
                                            setIsFull(true);
                                            localStorage.removeItem('kyc-photo');
                                        }}
                                        style={{ marginLeft: 35, marginTop: 310 }}
                                    >
                                        Selfie Camera
                                    </button>

                                    <button
                                        className="button"
                                        onClick={() => {
                                            setIsBkCameraOpen(true);
                                            setIsFull(true);
                                            localStorage.removeItem('kyc-photo');
                                            localStorage.setItem("from","backcamera")
                                        }}
                                        style={{ marginLeft: 35, marginTop: 310 }}
                                    >
                                        Back Camera
                                    </button>
                                    { UserType=="resident"?(
                                    
                                    <Link
                                to="/permit"
                                onClick={
                                    Selfie1 || id_f
                                        ? null
                                        : (e) => e.preventDefault()
                                }
                            >
                                
                                {processComplete?
                                    <button className="button" style={{ marginLeft: 35, marginTop: 50, marginBottom:50 }}>
                                Proceed
                            </button>  
                                :null}  
                            </Link>
                                )
                                :<Link
                                to="/address"
                                onClick={
                                    Selfie1 || id_f
                                        ? null
                                        : (e) => e.preventDefault()
                                }
                            >
                                
                                {processComplete?
                                    <button className="button" style={{ marginLeft: 35, marginTop: 50, marginBottom:50 }}>
                               Proceed
                            </button>  
                                :null} 
                            </Link>}
                                </div>
                            </Root>
                            <GlobalStyle />
                        </div>
                    </Fragment>
                    <br /><br /><br /><br /><br />
                    <Bottomstrip/>
                </Fragment>
            </div>
        );
    }
}
