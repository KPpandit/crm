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

export default function SetMpin(){

    const[msisdn,Setmsisdn] = useState()
    const [otp,Setotp] = useState()
    const[mpin,setmpin] = useState()
    const [confirmpin,setconfirmpin] = useState()
    const[otpbox,showotpbox] = useState(false)
    const [nxtbtn,setnxtbtn] = useState(false)
    const[showUpload,setshowUpload] = useState(false)
    const[otpSuccess, isOtpSuccess] = useState();
    const[otpFailed, isOtpFailed] = useState();
    const[otpSent, isOtpSent] = useState();
    // const [showmpinbox,setshowmpinbox]=useState(true)
    const [showmpinbox,setshowmpinbox]=useState(false)
    const [pinmatching,setpinmatching]=useState(false)

    const { classes } = ""
    
    function loginhandle(e){
        e.preventDefault();
    }

    function sendOTP(){
        
        let data={msisdn};
                   const req =  Axios.get("https://ekyc.chili.mu:9443/otp/sendOtpAgent/"+"230"+data.msisdn+"/en",
                   {
                    headers: {'Content-Type':'application/json'}
                }).then((res) => {
                    showotpbox(true);  
                     console.log("result is ",res.data.data)
                    console.log(data);
                isOtpSent(true)

                    }).catch((error)=>{
                        console.log(error);
                        isOtpSent(false)
                    });   
                  
        
       
    }
    function verifyOTP(){
       

        let data = {msisdn,otp}
        const req =  Axios.get("https://ekyc.chili.mu:9443/otp/verifyOtpAgent/"+"230"+data.msisdn+"/"+data.otp,
        {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            console.log("result is ",res.data.status)
            if(res.data.status="SUCCESSFUL"){
            setshowUpload(true)
            localStorage.setItem("AgentNumber",data.msisdn);
            console.log("AgentNumber is", localStorage.getItem('AgentNumber'));
            isOtpSent()
            isOtpSuccess(true)
            }
           }).catch((error)=>{
                        console.log(error);
        isOtpFailed(true);
                    });  
    }

    function setpin(){
        let AgentNumber = localStorage.getItem("AgentNumber");
       let data={mpin,confirmpin}
       if(data.mpin===data.confirmpin){
        const req =  Axios.get("https://ekyc.chili.mu:9443/otp/setMpin/"+AgentNumber+"/"+data.mpin,
        {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            console.log("result is ",res.data.status)
            if(res.data.status="SUCCESSFUL"){
            setnxtbtn(true)
            }
           }).catch((error)=>{
                        console.log(error);
                    });  
       }
       else{
        alert("Mismatching")
       }
    //
      

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
                            {showmpinbox?<div>

                        <TextField
                            name="PIN"
                            type="tel"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Set M-PIN</div>}
                            variant="outlined"
                            inputProps={{maxLength:4}}
                            onChange={(e)=>{setmpin(e.target.value)}}
                            
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            name="PIN"
                            type="tel"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Confirm M-PIN</div>}
                            variant="outlined"
                            inputProps={{maxLength:4}}
                            onChange={(e)=>{
                                setconfirmpin(e.target.value)
                            }}
                            
                        />
                        <br></br>
                        <br></br>
                                    
                            <button className="button_id" style={{ fontSize: 16,width: 120, padding:10}} onClick={setpin}>Set MPIN</button>

                                    
                                <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}}
                                        onClick={()=>
                                        {
                                            setshowmpinbox(false)
                                        }}>
                                           Back
                                        </button>
                                        <br></br>
                                        <br></br>

                                        {nxtbtn ?
                                            <Link to="/askagent"> <button className="button_id" style={{ fontSize: 16,width: 120, padding:10}}> Proceed</button></Link>

                                        :null}
                            </div>
                        
                            :<div>
                            <div >

                            <TextField
                                    required
                                    name="MSISDN"
                                    type="tel"
                                    id="outlined-required"
                                    label={<div style={{color:'black'}}>MSISDN</div>}
                                    variant="outlined"
                                    inputProps={{maxLength:8}}
                                    onChange={(e)=>{Setmsisdn(e.target.value)}}
                                />

                            <br></br>
                            <br></br>
                            {
                                otpbox == false?
                                <div>
                                    <button className="button" style={{ fontSize: 16,width: 120, padding:10}} onClick={sendOTP}>Send OTP</button>
                                    <button className="button" style={{ fontSize: 16,width: 120, padding:10}}><Link className="link1" to="/askagent">Back</Link></button>

                                </div>
                                
                                : 
                                <div>

                                <TextField
                                    required
                                    name="OTP"
                                    type="password"
                                    id="outlined-required"
                                    label={<div style={{color:'black'}}>OTP</div>}
                                    variant="outlined"
                                    inputProps={{maxLength:4}}
                                    onChange={(e)=>{Setotp(e.target.value)}}

                                    />
                                    <br></br>
                                    <br></br>

                                    <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={sendOTP}>Resend OTP</button>   
                                    <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={verifyOTP}>Verify</button> 
                                    <br></br> 
                                    <br></br> 
                                    <br></br> 

                                    {
                                        showUpload== true?<div>
                                            
                                            <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}}
                                        onClick={()=>
                                        {    
                                            setshowmpinbox(true)
                                            isOtpSuccess()

                                        }}>
                                           Next Page
                                        </button>
                                        </div>
                                        
                                        :null
                                    }
                                    <button className="button_id" style={{fontSize:16,width:120,padding:10}}>
                                        <Link className="link1" to="/askagent">Back</Link>
                                    </button>
                                </div>
                                
                            }   

                            </div>
                            </div>
                            }
                                        
                                                    
                                    </div>
                                )
}