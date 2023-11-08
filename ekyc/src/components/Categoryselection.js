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
import logo from '../logo.png';
import newlogo from '../newlogo.png'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { Root, Preview, GlobalStyle } from '../styles';
import mauritius from '../mauritius.png';
import globe from '../globe.png'
import plane from '../plane.png'

export default function Categoryselection(){

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
    }));

    const classes = useStyles();
    const [whichId, setWhichId] = useState();
    const[show,setshow]=useState(false);
    const agentNumber = localStorage.getItem("AgentNumber")
    localStorage.removeItem('Token');

    return(
        <div className="Auth-container"  style={{textAlign:'center'}}>
           {
            agentNumber==null || agentNumber.trim().length==0?
            null
            :<div style={{marginTop:-50}}>
                <label><strong>Agent Number:{agentNumber}</strong></label>
                <Link to="/logout" style={{textAlign:'end',marginLeft:20,color:'black'}}>Logout</Link>
            </div>
           }
            {/* <h3 style={{marginTop: 10 }} className="title-zest">Hello! Welcome to CHiLi Self e-KYC</h3> */}
            <br></br>
            <br></br>
            <br></br>
            {
                            agentNumber==null || agentNumber.trim().length==0?
                            <h5  style={{textAlign:'center'}}>Please Select Category</h5>
                            :<h5  style={{textAlign:'center'}}>Please Choose Customer Type</h5>

                        }
       
        <div
            className="whichid"
            style={{ marginLeft: 0, marginTop: 10,textAlign:'center' }}>
            <br></br>
            <br></br>
            <br></br>
            
            <Link to="govtid">
                 <button className="button_id" style={{fontSize:18,width:240, padding:10}} 
                         onClick={(e)=>{
                            localStorage.setItem("userType","citizen");
                            localStorage.setItem("IDtype",'nid')
                         }}>
                        <img src={mauritius}
                        style={{
                            height:30, width:30
                        }}></img> &nbsp; Mauritian Citizen
                </button>
            </Link> 
            <br></br>

           <Link to="govtid">
                <button className="button_id" style={{fontSize:18,width: 240,padding:10}} 
                    onClick={(e)=>{
                        localStorage.setItem("userType","resident")
                        localStorage.setItem("IDtype",'Passport')
                        }}>
                     <img src={globe}
                        style={{
                            height:30, width:30
                        }}></img> &nbsp;Non-Citizen-Resident
                </button>
            </Link>
            <br></br>

           <Link to="govtid">
                <button className="button_id" style={{fontSize:18,width: 240,padding:10}}
                    onClick={(e)=>{
                        localStorage.setItem("userType","tourist")
                        localStorage.setItem("IDtype",'Passport')
                        }}> 
                   <img src={plane}
                        style={{
                            height:30, width:30
                        }}></img> &nbsp; Tourist&nbsp; &nbsp; &nbsp;
                </button>
            </Link><br></br>

           
            

        </div>
        
        <div className="selfie_page">
            
           
                <GlobalStyle  />
            </div>
        </div>
    )
}