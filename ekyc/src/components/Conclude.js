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
export default function Conclude(){
    const[customernumber,setcustomernumber]=useState(false)
    const[msisdn,Setmsisdn] = useState()
    const token = localStorage.getItem('Token');
    const mailid=localStorage.getItem('email')

    function sendsms(){
        let data = {msisdn}
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
    return(
            <div className="Auth-container" style={{textAlign:'center'}}>
                {
                    customernumber ?
                    <div>
                                <h4
                    style={{
                        textAlign: 'center',
                        color: '#f049ac',
                        marginLeft: 20,
                        marginTop: 20,
                    }}>New Customer </h4>
                                <h6>Dear Customer please add your MSISDN</h6>
                                <TextField
                            name="msisdn"
                            type="tel"
                            id="outlined-required"
                            label={<div>MSISDN</div>}
                            variant="outlined"
                            inputProps={{maxLength:8}}
                            onChange={(e)=>Setmsisdn(e.target.value)}
                            />
                            <br></br>
                                <button className="button_id"style={{ fontSize: 16,width: 120, padding:10}}
                                onClick={()=>{
                                    setcustomernumber(false)
                                    sendsms()
                                }}> Submit</button>
                            </div>
                    :<div>
                    <img
                    className=""
                    src={thankyou}
                    style={{
                        height: 200,
                        marginTop: 100,
                    }}
                    alt="logoo"></img>
           <h4> Thank you! Your data has been saved </h4>
           <label>Your E-KYC Token/Tracking Id is - <strong>{localStorage.getItem('Token')}</strong> Please visit Our nearest Chili Store</label>
           <br></br>
           <Link onClick={()=>
        setcustomernumber(true)}>Want to add more number? click here</Link>
           <br></br>
            <br></br>
           <button   className="button_id"style={{ fontSize: 16,width: 120, padding:10}}>
           <Link className="link1" onClick={()=>sendEmail()}
            to="/logout"> Exit  </Link>
           </button>
                    </div>
                }

            </div>
    )
}