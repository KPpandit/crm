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
import MuiAlert from "@material-ui/lab/Alert";



function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}

export default function Agentotplogin(){
    const [Agentmsisdn,setAgentmsisdn] = useState()
    const [otp,Setotp] = useState()
    const[otpSent, isOtpSent] = useState();
    const[otpbox,showotpbox] = useState(false)
    const[showUpload,setshowUpload] = useState(false)
    const[otpSuccess, isOtpSuccess] = useState();
    const[otpFailed, isOtpFailed] = useState();



    function sendOTP(){
        let data={Agentmsisdn};
                   const req =  Axios.get("https://ekyc.chili.mu:9443/otp/sendOtpAgent/"+"230"+data.Agentmsisdn+"/en",
                   {
                    headers: {'Content-Type':'application/json'}
                }).then((res) => {
                    //  console.log("result is ",res.data.data)
                    // console.log(data);
                    isOtpSent(true);
                    showotpbox(true);   

                    }).catch((error)=>{
                        console.log(error);
                    showotpbox(false);   
                    isOtpSent(false)
                    }); 
                       
        
    }
    function verifyOTP(){
        isOtpSent()
        let data = {Agentmsisdn,otp}
        const req =  Axios.get("https://ekyc.chili.mu:9443/otp/verifyOtpAgent/"+"230"+data.Agentmsisdn+"/"+data.otp,
        {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            // console.log("result is ",res.data.status)
            if(res.data.status="SUCCESSFUL"){
                isOtpSuccess(true);
                setshowUpload(true)
                isOtpFailed(false);
            localStorage.setItem("AgentNumber",data.Agentmsisdn);
            }
           }).catch((error)=>{
                isOtpFailed(true);
                        console.log(error);
                    });  
    }
    return(
            <div className="Auth-container" style={{textAlign:'center'}}>

                {otpFailed==true && (
                    <div style={{ marginTop: -20, marginLeft: 30 }}>
                        <Alert severity="error">The OTP for this user is incorrect. Please check and retry..</Alert>
                    </div>
                )}
                {otpSuccess==true && (
                    <div style={{ marginTop: -20, marginLeft: 30 }}>
                        <Alert severity="success">Verification Successful. Please proceed </Alert>
                    </div>
                )}
                
                {otpSent==true && (
                    <div style={{ marginTop: -20, marginLeft: 30 }}>
                        <Alert severity="success">OTP is sent to your provided mobile number.</Alert>
                    </div>
                )}
                {otpSent==false && (
                    <div style={{ marginTop: -20, marginLeft: 30 }}>
                        <Alert severity="error">The MSISDN for this user is incorrect. Please check and retry..</Alert>
                    </div>
                )}

                <h5 style={{ color: '#f049ac' }}> Agent Authentication </h5>
                <h6 style={{ color: 'Gray' }}> Please login with OTP </h6>
                <div>
                        <TextField                             
                             name="MSISDN"
                             style={{ color: '#f049ac' }}
                             type="tel"
                             id="outlined-required"
                             label={<div style={{color:'black'}}>MSISDN</div>}
                             variant="outlined"
                             inputProps={{maxLength:8}}
                             onChange={(e)=>{setAgentmsisdn(e.target.value)}}
                        />
                    <br></br>
                    <br></br>
                    {
                        otpbox == false?
                        <div style={{textAlign:'center'}}>
                        <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={sendOTP}>Send OTP</button>
                        <button  className="button_id"style={{ fontSize: 16,width: 120,  padding:10}} onClick={()=>{
                            isOtpSent()
                        isOtpFailed()}}><Link to="/welcomeagent" className="link1">Back</Link></button>
                        </div>
                         : 
                         <div>
                            <TextField
                            
                            name="OTP"
                            style={{color:'pink'}}
                            type="password"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>OTP</div>}
                            variant="outlined"
                            inputProps={{maxLength:4}}
                            onChange={(e)=>{Setotp(e.target.value)}}

                            />
                            <br></br>
                            <br></br>

                            <button  className="button_id"style={{ fontSize: 16,width: 120 ,padding:10}} onClick={sendOTP}>Resend OTP</button>  
                            <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10 }} onClick={verifyOTP}>Verify</button> 
                            <button className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={()=>{
                                showotpbox(false)
                                isOtpFailed()
                                isOtpSuccess(false)
                                // isOtpSent(false)
                            }}>Back</button>
                            <br></br> 
                            {
                                showUpload== true?
                                <div>
                                    <br></br> <br></br> <br></br>
                                <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                                    <Link className="link1" to="/categories"> Proceed  </Link> </button>
                                </div>
                                :
                                <div>
                                   
                                </div>
                            }
                          </div>
                          
                    }   
                    
                
                    </div>
            </div>
    )
}