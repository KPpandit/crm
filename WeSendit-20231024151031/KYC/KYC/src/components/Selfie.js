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
import './style.scss';
import axios from 'axios';
import Bottomstrip from './Bottomstrip';
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Selfie(props) {
    const [isFrCameraOpen, setIsFrCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
    const id_f = localStorage.getItem('id_f');
    const Selfie1 = localStorage.getItem('imgData');
    const [isFull, setIsFull] = useState(true);
    const kyc_p = localStorage.getItem('kyc-photo');
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
        upload();
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

    
    useEffect(() => {

        
        window.addEventListener('online', () => setStatus(true))
        window.addEventListener('offline', () => setStatus(false))
    }, []);

console.log('token', localStorage.getItem('Token'));
console.log('dob', localStorage.getItem('dob'));
console.log('firstName', localStorage.getItem('fn'));
console.log('gender', localStorage.getItem('gender'));
console.log('id', localStorage.getItem('id'));
console.log('lastName', localStorage.getItem('ln'));
console.log('countryCode', localStorage.getItem('countryCode'));

    function upload() {
        const formData = new FormData();
        formData.append('token', localStorage.getItem('Token'));
        formData.append('selfie64', Selfie1);
        formData.append('dob', localStorage.getItem('dob'));
        formData.append('firstName', localStorage.getItem('fn'));
        formData.append('gender', localStorage.getItem('gender'));
        formData.append('id', localStorage.getItem('id'));
        formData.append('lastName', localStorage.getItem('ln'));
        formData.append('countryCode', localStorage.getItem('countryCode'));
        // formData.append('email',localStorage.getItem("Email"));
        setPhotoClk(true);

        const request = axios.put('https://ekyc.chili.mu:9443/api/processID', formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(function (response) {
                setPhotoClk(false);
                //console.log('successfully uploaded', id_f);
                selfieclk = false;
                kyc_status = response.data.match_status;
                window.location.reload(false);
                console.log('successfully uploaded+++', response);
                let result = response.data.data;

                localStorage.setItem('kyc-photo', response.data.data.image);

                localStorage.setItem("KYCresult",result)
                localStorage.setItem("SelfieCompleted","true");

                if(result.includes("detail already there with token")){
                    alert(result+" "+"Please visit nearest Chili Store");
                    localStorage.setItem("SelfieCompleted","false");
                }
                localStorage.setItem("selfieUpdateStatus",response.data.status)
                kyc_status = response.data.data.match_status;
            })
            .catch(function (error){
                isError = true;
                setValidResponse(true);
                if (error.response) {
                    localStorage.setItem("SelfieCompleted","false");
                    console.log(error.response.data);
                   const x =  error.response.status;
                    console.log(error.response.headers);
                    if(x==400){
                        alert("Please fill the Validation Form completely ");
                  }
                  

                }
            }
            
            );;

    }
    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
        return (
            

            <div className="selfie_page">
                 {!validId && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">Please upload the selfie again. Refer to upload Tips.</Alert>
                    </div>
                )}
                {validResponse && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">Error in validating provided details. Please try again.</Alert>
                    </div>
                )}
                {!status && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">You are offline! Please check your internet connection.</Alert>
                    </div>
                )}

                <div className="popi">
                    <span>
                        <Icon.Info id="Popover1" type="button" />
                        Conseils
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
                <div style={{ color: '#1EC4DC', textAlign: 'center' }}>
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
                                                marginLeft: 35,
                                                marginTop: 80,
                                            }}
                                        >

                                            <h6>KYC Photo verification</h6>
                                            <h6>{kyc_status}</h6>
                                            
                                            <div>{ kyc_f.length>0 || !photoClk || <Skeleton count={5} />}</div>
                                            
                                          {kyc_f &&(<img
                                                className="selpic_selfiepage"
                                                src={`data:image/jpeg;base64,${kyc_f}`}
                                                height="250"
                                                width="220"
                                                alt="selpic_selfiepage"
                                                style={{ marginTop: 20, marginLeft: -100 }}
                                            />)}  
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
                                        style={{ marginLeft: 35 }}
                                    >
                                        Selfie Camera
                                    </button>

                                    <Link
                                        to="/address"
                                        onClick={
                                            Selfie1
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        
                                        <button className="button">
                                        Next Page
                                    </button>
                                    
                                    
                                        
                                    </Link>
                                </div>
                            </Root>
                            <GlobalStyle />
                        </div>
                    </Fragment>
                    <br />
                    <Bottomstrip/>
                </Fragment>
            </div>
        );
    }
}
