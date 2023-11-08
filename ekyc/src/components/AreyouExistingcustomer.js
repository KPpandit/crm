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

export default function AreyouExistingcustomer(){
    const[customernumber,setcustomernumber]=useState(true)
    const[customer,NewCustomer] = useState("")
    const[msisdn,Setmsisdn] = useState()
    const [iccid,SetICCID] = useState()
    const[otpSuccess, isOtpSuccess] = useState();
    const[otpFailed, isOtpFailed] = useState();
    const[otpSent, isOtpSent] = useState();
    const [otp,Setotp] = useState()
    const[otpbox,showotpbox] = useState(false)
    const[showUpload,setshowUpload] = useState(false)
    const token = localStorage.getItem('Token');
    const mailid=localStorage.getItem('email')
    const agentNumber = localStorage.getItem('') 
    const { classes } = ""
    const alternativeNumber = localStorage.getItem("alternativeNumber");
    
    function loginhandle(e){
        e.preventDefault();
    }

    function sendOTP(){
        let data={msisdn};
                   const req =  Axios.get("https://ekyc.chili.mu:9443/otp/sendOtp/"+"230"+data.msisdn+"/en/"+token,
                   {
                    headers: {'Content-Type':'application/json'}
                }).then((res) => {
                     console.log("result is ",res.data.data)
                    console.log(data);
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
        let data = {msisdn,otp}
        const req =  Axios.get("https://ekyc.chili.mu:9443/otp/verifyOtp/"+"230"+data.msisdn+"/"+data.otp+"/"+token,
        {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            // console.log("result is ",res.data.status)
            if(res.data.status="SUCCESSFUL"){
                isOtpSuccess(true);
                sendsms();
                sendEmail();
                
            }
            setshowUpload(true)
           }).catch((error)=>{
                isOtpFailed(true);
                        console.log(error);
                    });  
    }

    function sendsms(){
        

        let data = {msisdn,otp}
        let txt = `Dear Customer, Congratulations! Welcome to the family of CHILI. Your reference for eKYC Corelation ID is- ${token} for ${data.msisdn} Enjoy the CHiLi services.`


        // const req =  Axios.get("https://ekyc.chili.mu:9443/otp/verifyOtp/"+"230"+data.msisdn+"/"+data.otp,
        // let text = 'Dear Customer, Congratulations! Welcome to the family of CHILI. Your reference for eKYC is'+token+' Enjoy the CHiLi services.\n'+'Best regards\n'+'MTML Chilli';

        const req = Axios.get("https://ekyc.chili.mu:9443/ekyc/v1/sms?msisdn="+"230"+data.msisdn+"&from=2306668&text="+txt+"&configId=2&locale=en",
            {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            console.log("result is ",res.data.status)
           
        
           }).catch((error)=>{
                        console.log(error);
                    });  
    }

    function sendEmail(){
        let token=localStorage.getItem('Token')
        
        const req = Axios.get("https://ekyc.chili.mu:9443/email?email="+mailid+"&token="+token+"&status=success",
        // const req = Axios.get("https://ekyc.chili.mu:9443/email?email=ajay@wpitservices.com&token=56445667asdafssfddfg&status=success",

        {
            headers:{'Content-Type':'application/json;charset=utf-8'}
        }).then((res)=>{
            console.log("email response is= ",res);
        }).catch((error)=>{
            console.log(error)
        });
    }

    function sendSmsToAlternativeNumber(){
        setcustomernumber(false)
        let data = {otp}
        let txt = `Dear Customer, Congratulations! Welcome to the family of CHILI. Your reference for eKYC Corelation ID is- ${token} for ${data.msisdn} Enjoy the CHiLi services.`


        // const req =  Axios.get("https://ekyc.chili.mu:9443/otp/verifyOtp/"+"230"+data.msisdn+"/"+data.otp,
        // let text = 'Dear Customer, Congratulations! Welcome to the family of CHILI. Your reference for eKYC is'+token+' Enjoy the CHiLi services.\n'+'Best regards\n'+'MTML Chilli';

        const req = Axios.get("https://ekyc.chili.mu:9443/ekyc/v1/sms?msisdn="+"230"+alternativeNumber+"&from=2306668&text="+txt+"&configId=2&locale=en",
            {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            console.log("result is ",res.data.status)
           
        
           }).catch((error)=>{
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
                

            {customer==""?
            <div  style={{textAlign:'center'}} >
                <div >
                <h5 style={{ color: '#f049ac' }}>
                    
                    Please Select  Customer Type
                </h5>
                <h6 style={{ color: 'Gray' }}>
                Please confirm Customer Type from below
                </h6>
                </div>


               <br></br><br></br><br></br>
                <div>
                {/* <button className="button_id"style={{ fontSize: 20,width: 200, padding:10}} onClick={()=>{ NewCustomer("Agent")}}>Agent</button> <br></br> */}
            <button  className="button_id"style={{ fontSize: 20,width: 290, padding:10}} onClick={()=>{NewCustomer("No")}}>New CHiLi Customer</button> 
            <button  className="button_id"style={{ fontSize: 20,width: 290, padding:10}} onClick={()=>{NewCustomer("Yes")}}>Re-Register Existing Customer</button><br></br>
                </div>
                
           
            </div>
            :customer=="Yes"?
                    <div>
                <form onSubmit={loginhandle} style={{textAlign:'center'}}>
                    <br></br>
                    <h4
                    style={{
                        textAlign: 'center',
                        color: '#f049ac',
                        marginLeft: 20,
                        marginTop: 20,
                    }}>Existing Customer Authentication</h4>
                    <br></br>
                        <TextField
                             
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
                        <div style={{textAlign:'center'}}>
                        <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={sendOTP}>Send OTP</button>
                        <button  className="button_id"style={{ fontSize: 16,width: 120,  padding:10}} onClick={()=>{
                        //     isOtpSent()
                        // NewCustomer("")
                        // isOtpFailed()
                        window.location.reload()
                        }}>Back</button>
                        </div>
                         : 
                         <div>
                            <TextField
                            
                            name="OTP"
                            type="password"
                            id="outlined-required"
                            label={<div  style={{color:'black'}}>OTP</div>}
                            variant="outlined"
                            inputProps={{maxLength:4}}
                            onChange={(e)=>{Setotp(e.target.value)}}

                            />
                            <br></br>
                            <br></br>

                            <button  className="button_id"style={{ fontSize: 16,width: 120 ,padding:10}} onClick={sendOTP}>Resend OTP</button>  
                            <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10 }} onClick={verifyOTP}>Verify</button> 
                            <button className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={()=>{
                                                        window.location.reload()

                            }}>Back</button>
                            <br></br> 
                            {
                                showUpload== true?
                                <div>
                                    <br></br> <br></br> <br></br>
                                <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                                    <Link className="link1" to="/logout"> Submit  </Link> </button>
                                </div>
                                :
                                <div>
                                   
                                </div>
                            }
                          </div>
                          
                    }   
                    
                </form>
                    </div>
            
                

                :customer=="No"?
                <div>
                        {customernumber?
                        <div>
                                <h4
                    style={{
                        textAlign: 'center',
                        color: '#f049ac',
                        marginLeft: 20,
                        marginTop: 20,
                    }}> New Customer </h4>
                                <h6 style={{color:'Gray'}}>Please Enter new CHili Number you want to activate </h6>
                                <TextField
                            name="msisdn"
                            type="tel"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Number</div>}
                            variant="outlined"
                            inputProps={{maxLength:8}}
                            onChange={(e)=>Setmsisdn(e.target.value)}
                            />
                            <br></br>
                            <br></br>
                                <button className="button_id"style={{ fontSize: 16,width: 120, padding:10}}
                                onClick={()=>{
                                    sendSmsToAlternativeNumber()
                                }}> Submit</button>
                            </div>
                        :
                        <div>
                            <img
                            className=""
                            src={thankyou}
                            style={{
                                height: 200,
                                marginTop: 0,
                            }}
                            alt="logoo"
                                    ></img>

                    {}        
                   <h4> Thank you! Customer data has been saved </h4>
                   <h6 style={{color:'green'}}>Customer's kyc Verified</h6>
                   <label>Customer E-KYC Token/Tracking Id is - <strong>{localStorage.getItem('Token')}</strong></label>
                   <br></br>
                   <button   className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                   <Link className="link1" onClick={()=>sendEmail()}
                    to="/categories"> Login again?  </Link>
                   </button>
                   <br></br>
                   <button   className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                   <Link className="link1" onClick={()=>sendEmail()}
                    to="/logout"> Exit  </Link>
                   </button>
                            </div>}
                            
                    </div>
                // :customer=="Agent"?
                // <div>
                //      <div style={{ textAlign: 'left' }}>
                // <h5
                //      style={{
                //         textAlign: 'center',
                //         color: '#f049ac',
                //         marginLeft: 20,
                //         marginTop: 20,}}
                // >
                    
                //    Agent Authentication
                // </h5>
               
                // </div>

                //     <div >
                //     <br></br><br></br>
                //     <h5>Please Login</h5>
                //     <br></br>
                //     <TextField
                //             required
                //             name="MSISDN"
                //             type="tel"
                //             id="outlined-required"
                //             label={<div>MSISDN</div>}
                //             variant="outlined"
                //             inputProps={{maxLength:8}}
                //             onChange={(e)=>{Setmsisdn(e.target.value)}}
                //         />

                //     <br></br>
                //     <br></br>
                //     {
                //         otpbox == false?
                //         <div style={{textAlign:'center'}}>
                //         <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={sendOTP}>Send OTP</button>
                //         <button  className="button_id"style={{ fontSize: 16,width: 120,  padding:10}} onClick={()=>{
                //         //     isOtpSent()
                //         // NewCustomer("")
                //         // isOtpFailed()
                //         window.location.reload()}}>Back</button>
                //         </div>
                //          : 
                //          <div>

                //         <TextField
                //             required
                //             name="OTP"
                //             type="password"
                //             id="outlined-required"
                //             label={<div>OTP</div>}
                //             variant="outlined"
                //             inputProps={{maxLength:4}}
                //             onChange={(e)=>{Setotp(e.target.value)}}

                //             />
                //             <br></br>
                //             <br></br>

                //             <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={sendOTP}>Resend OTP</button>   
                //             <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={verifyOTP}>Verify</button>
                //             <button className="button_id"style={{ fontSize: 16,width: 120, padding:10}} onClick={()=>{
                //                 showotpbox(false)
                //                 isOtpFailed()
                //                 otpSuccess()
                //             }}>Back</button> 
                //             <br></br> 
                //             <br></br> 
                //             <br></br> 

                //             {
                //                 showUpload== true?
                //                 <button  className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
                //                     <Link className="link1" to="/logout"> Upload profile  </Link>
                //                 </button>
                //                 :
                //                 <div>
                                   
                //                 </div>
                //             }
                //           </div>
                          
                //     }   
                    
                // </div>
                // </div>
                :null
            }
            <Bottomstrip/>
        </div>
    )
}