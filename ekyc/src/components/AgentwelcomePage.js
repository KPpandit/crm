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

export default function Agentwelcome()
{
    return(
        <div className="Auth-container" style={{textAlign:'center'}}>
            <h5 style={{ color: '#f049ac' }}>Welcome Agent/Dealer</h5>
            <h6 style={{ color: 'Gray' }}>Please choose your Login type</h6>
            <br></br>
            <br></br>
            <br></br>
            <button className="button_id"style={{ fontSize: 16,width: 150, padding:10}}>
                <Link to="/agentotp"  className="link1">Login with OTP</Link>
            </button>
            <br></br>
            <button className="button_id"style={{ fontSize: 16,width: 150, padding:10}}>
                <Link to='/askagent' className="link1"> Login with M-PIN</Link>
            </button>
            <br></br>
            <button className="button_id"style={{ fontSize: 16,width: 150, padding:10}}>
                <Link to='/' className="link1"> Back</Link>
            </button>

        </div>
    )
}