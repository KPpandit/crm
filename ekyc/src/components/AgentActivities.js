import React, { Component } from "react";
import react,{ useState } from "react"
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';


export default function Agentactivities(){
    return(
        <div className="Auth-container" style={{textAlign:'center'}}>
           <h5 style={{ color: '#f049ac' }}>
                    Agent Operations 
                </h5>
                <h6 style={{ color: 'Gray' }}>
                Please Click on the Operation you want to perform from below.
                </h6>
                
                
                <br></br>
                <br></br>
                <button className="button"  style={{ fontSize: 16,width: 120, padding:10}} ><Link className="link1" to="simactivation">Activation</Link> </button><br></br>
                <Link className="link1 button" to="/" style={{ fontSize: 16,width: 120, padding:10}} >New EKYC</Link><br></br>
                <button className="button" style={{ fontSize: 16,width: 120, padding:10}} >
                    <Link className="link1" to="/askagent">Back</Link>
                </button>
        </div>
    )
}