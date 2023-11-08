import React, { Component } from "react";
import react,{ useState } from "react"
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}

export default function Agent(){

    const[agentmsisdn,Setagentmsisdn] = useState()
    const [mpin,Setmpin] = useState()
    
    const[showUpload,setshowUpload] = useState(false)
    const[otpSuccess, isOtpSuccess] = useState();
    const[otpFailed, isOtpFailed] = useState();
    const[otpSent, isOtpSent] = useState();

    const { classes } = ""
    
    function loginhandle(e){
        e.preventDefault();
    }

    function verify(){
        let data = {agentmsisdn,mpin}

        // const req =  Axios.get("https://ekyc.chili.mu:9443/otp/verifyOtp/"+"230"+data.agentmsisdn+"/"+data.mpin
                //    {
                //     headers: {'Content-Type':'application/json'}
                // }).then((res) => {
                //     //  console.log("result is ",res.data.data)
                //     // console.log(data);
                setshowUpload(true)
                localStorage.setItem("AgentNumber",agentmsisdn)

                // isOtpSent(true)

                //     }).catch((error)=>{
                //         console.log(error);
                //isOtpSent(false)
                //     });
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

            <h5 style={{ color: '#f049ac' }}>
                    Agent Authentication
                </h5>
            <br></br>
            <TextField
                            name="MSISDN"
                            type="tel"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>MSISDN</div>}
                            variant="outlined"
                            inputProps={{maxLength:8}}
                            onChange={(e)=>{Setagentmsisdn(e.target.value)
                            localStorage.setItem("AgentNumber",e.target.value)}}
                        />
                    <br></br>
                    <br></br>
                    <TextField
                            name="M-PIN"
                            type="tel"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>M-PIN</div>}
                            variant="outlined"
                            inputProps={{maxLength:4}}
                            onChange={(e)=>{Setmpin(e.target.value)
                                localStorage.setItem("agentpin",e.target.value)}}
                        />
                    <br></br>
                    <br></br>
                 <Link  to="/setpin">Set MPIN?</Link>
                 <br></br>
                    
                    <br></br>
                    <button className="button" style={{ fontSize: 16,width: 120, padding:10}} onClick={verify} >Verify</button>

                        {
                            showUpload?
                            <button className="button" style={{ fontSize: 16,width: 120, padding:10}}>
                                <Link className="link1" to="/categories">Proceed</Link></button>
                            :null
                        }
                        <button className="button" style={{ fontSize: 16,width: 120, padding:10}} >
                    <Link className="link1" to="/welcomeagent"><span>Back</span></Link>
                    </button>
        </div>
    )
}