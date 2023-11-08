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



export default function AreyouExistingcustomer(){

    const[customer,NewCustomer] = useState("")
    const[msisdn,Setmsisdn] = useState()
    const [otp,Setotp] = useState()
    const[otpbox,showotpbox] = useState(false)
    const[showUpload,setshowUpload] = useState(false)
    const { classes } = ""
    
    function loginhandle(e){
        e.preventDefault();
    }

    function sendOTP(){
        
        let data={msisdn};
                     showotpbox(true);   
                   const req =  Axios.get("https://ekyc.chili.mu:9443/otp/sendOtp/"+"230"+data.msisdn+"/en",
                   {
                    headers: {'Content-Type':'application/json'}
                }).then((res) => {
                     console.log("result is ",res)
                    console.log(data);

                    }).catch((error)=>{
                        console.log(error);
                    });     
        
       
    }
    function verifyOTP(){
        let data = {msisdn,otp}
        const req =  Axios.get("http://41.223.78.154:9898/otp/verifyOtp/"+"230"+data.msisdn+"/"+data.otp,
        {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            console.log("result is ",res.data.status)
            setshowUpload(true)
           }).catch((error)=>{
                        console.log(error);
                    });  
    }

    return(
        <div className="Auth-container" style={{textAlign:'center'}}>
            {customer==""?
            <div>
                <div>
                    <h3>Please Select</h3>
                    <h4>Are you ...</h4>
                </div><br></br><br></br><br></br>
                <div>
                <button className="button_id"style={{ fontSize: 20,width: 200, padding:10}} onClick={()=>{ NewCustomer("Agent")}}>Agent</button> <br></br>
            <button  className="button_id"style={{ fontSize: 20,width: 200, padding:10}} onClick={()=>{NewCustomer("Yes")}}>Existing Customer</button><br></br>
            <button  className="button_id"style={{ fontSize: 20,width: 200, padding:10}} onClick={()=>{NewCustomer("No")}}>New Customer</button> 
                </div>
                
           
            </div>
            :customer=="Yes"?
            
                <form onSubmit={loginhandle} style={{textAlign:'center'}}>
                    <br></br><br></br>
                    <h4>Please LOGIN</h4>
                    <br></br>
                        <TextField
                             
                             name="MSISDN"
                             type="tel"
                             id="outlined-required"
                             label={<div>MSISDN</div>}
                             variant="outlined"
                             inputProps={{maxLength:8}}
                             onChange={(e)=>{Setmsisdn(e.target.value)}}
                        />
                    <br></br>
                    <br></br>
                    {
                        otpbox == false?
                        <button  className="button_id"style={{ fontSize: 16,width: 120, marginLeft:50, padding:10}} onClick={sendOTP}>Send OTP</button>
                         : 
                         <div>
                            <TextField
                            
                            name="OTP"
                            type="password"
                            id="outlined-required"
                            label={<div>OTP</div>}
                            variant="outlined"
                            inputProps={{maxLength:4}}
                            onChange={(e)=>{Setotp(e.target.value)}}

                            />
                            <br></br>
                            <br></br>

                            <button  className="button_id"style={{ fontSize: 16,width: 120 ,padding:10}} onClick={sendOTP}>Resend OTP</button>  
                            <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10 }} onClick={verifyOTP}>Verify</button> 
                            <br></br> 
                            {
                                showUpload== true?
                                <div>
                                    <br></br> <br></br> <br></br>
                                <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                                    <Link className="link1" to="/logout"> Upload profile  </Link> </button>
                                </div>
                                :
                                <div>
                                   
                                </div>
                            }
                          </div>
                          
                    }   
                    
                </form>
                :customer=="No"?
                <div><br></br><br></br>

                            <img
                            className=""
                            src={thankyou}
                            style={{
                                height: 200,
                                marginTop: 100,
                            }}
                            alt="logoo"
                                    ></img>


                   <h4> Thank you! Your data has been saved </h4>
                   <label>Your TrackId is - <strong>{localStorage.getItem('Token')}</strong> Please visit Our nearest Chili Store</label>
                   <br></br>
                   <button   className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                   <Link className="link1" to="/logout"> Exit  </Link>
                   </button>
                    </div>
                :customer=="Agent"?
                <div>
                    <div >
                    <br></br><br></br>
                    <h4>Please LOGIN</h4>
                    <br></br>
                    <TextField
                            required
                            name="MSISDN"
                            type="tel"
                            id="outlined-required"
                            label={<div>MSISDN</div>}
                            variant="outlined"
                            inputProps={{maxLength:8}}
                            onChange={(e)=>{Setmsisdn(e.target.value)}}
                        />

                    <br></br>
                    <br></br>
                    {
                        otpbox == false?
                        <button className="button" style={{ fontSize: 16,width: 120, padding:10}} onClick={sendOTP}>Send OTP</button>
                         : 
                         <div>

                        <TextField
                            required
                            name="OTP"
                            type="password"
                            id="outlined-required"
                            label={<div>OTP</div>}
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
                                showUpload== true?
                                <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                                    <Link className="link1" to="/logout"> Upload profile  </Link>
                                </button>
                                :
                                <div>
                                   
                                </div>
                            }
                          </div>
                          
                    }   
                    
                </div>
                </div>
                :null
            }
            <Bottomstrip/>
        </div>
    )
}