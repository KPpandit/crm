import React, { Component } from "react";
import react,{ useState } from "react"
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style1.css';
import Bottomstrip from './Bottomstrip';

export default function Simactivation(){

    const [TokenNumber,SetTokenNumber] = useState("")
    const [TokendetailsBlock,SetTokendetailsBlock]=useState(true)

    function DisplayForm(){
        SetTokendetailsBlock(false)
    }
   

    return(
        <div className="Auth-container" style={{textAlign:'center'}}>
             <h5 style={{ color: '#f049ac' }}>
                    SIM Activation
                </h5>
                <h6 style={{ color: 'Gray' }}>Please Enter 9-digit Token Number below</h6>
             <br></br>{
                TokendetailsBlock ==true?
                    <div>
                        <TextField
                            required
                            name="TokenNumber"
                            type="tel"
                            id="outlined-required"
                            label={<div>Token Number</div>}
                            variant="outlined"
                            inputProps={{maxLength:9}}
                            onChange={(e)=>{SetTokenNumber(e.target.value)}}
                        />
                            <br></br>
                            <br></br>
                            { TokenNumber.length>=9 ?
                            <button className="button" style={{ fontSize: 16,width: 120, padding:7}} onClick={DisplayForm} >Check</button>
                            :null
                            }
                    </div>
                :
                                // this is when TokendetailsBlock==false condition
                <div>
                        <div>
                    <h5
                        style={{
                            color: '#f049ac',
                            textDecoration: 'underline',
                        }}
                    >
                        User Details
                    </h5>
                </div>

                <div style={{ marginTop: -20 }}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <div
                                        style={{
                                            color: '#f049ac',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Full Name
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'center',
                                            fontSize: 18,
                                        }}
                                    >                                 
                                        {localStorage.getItem('fn')+" "+localStorage.getItem('ln')}
                                    </div>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <div
                                        style={{
                                            color: '#f049ac',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Gender
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'center',
                                            fontSize: 18,
                                        }}
                                    >
                                       
                                        {localStorage.getItem("gender")}
                                    </div>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <div
                                        style={{
                                            color: '#f049ac',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Date of Birth
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'center',
                                            fontSize: 18,
                                        }}
                                    >
                                        
                                            {localStorage.getItem('dob')}
                                    </div>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <div
                                        style={{
                                            color: '#f049ac',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Document Type & Number
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'center',
                                            fontSize: 18,
                                        }}
                                    >
                                        
                                            {localStorage.getItem('IDtype')+" : "+localStorage.getItem('id')}
                                    </div>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <div
                                        style={{
                                            color: '#f049ac',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Contact Details
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'center',
                                            fontSize: 18,
                                        }}
                                    >
                                        
                                            {localStorage.getItem('address')}<br></br>
                                            {localStorage.getItem('email')}
                                    </div>
                                }
                            />
                        </ListItem>
                        
                    </List>
                </div>

                <div>
                    <h5
                        style={{
                            color: '#f049ac',
                            textDecoration: 'underline',
                        }}
                    >
                        Profile Photo
                    </h5>
                </div>
                <div>
                <img
                    className="selpic_successpage"
                    src={`data:image/jpeg;base64,${localStorage.getItem('imgData')}`}
                    alt="selpic_successpage"
                    style={{ marginLeft: -120, marginTop: 0 }}
                />
                </div>

                <br></br>
                <br></br>
                <div style={{ marginTop: 220 }}>
                    <h5
                        style={{
                            color: '#f049ac',
                            textDecoration: 'underline',
                        }}
                    >
                        Identity Card
                    </h5>
                </div>
                {/* <div className="header"> */}
                
                <div>
                <img
                    className="classid_f_succ"
                    src={`data:image/jpeg;base64,${localStorage.getItem('imgId1')}`}
                    alt="classid_f_succ"
                    height="160"
                    width="260"
                    style={{ marginLeft: -129, marginTop: -10 }}
                />
                </div>

                <div style={{ marginTop: 160 }}>
                    <div style={{ color: '#f049ac', padding: 15 }}>
                    <h5
                                    style={{
                                            color: '#f049ac',
                                            textDecoration: 'underline',
                                             }}
                                >
                                     Additional Document
                                </h5>
                        
                    </div>
                </div>
                <div>
                <img
                    className="classid_b_succ"
                    src={`data:image/jpeg;base64,${localStorage.getItem('imgId7')}`}
                    alt="classid_b_succ"
                    height="160"
                    width="260"
                    style={{ marginLeft: -129, marginTop: -10 }}
                    />
                </div>
                <br></br>
                <br></br>
                <br></br>

                <button
                        className="button_id"
                        
                        style={{
                            marginLeft: 35,
                            fontSize: 16,
                            width:150
                        }}
                    >
                        <Link className="link1" to="/customer">
                            Save and Continue
                        </Link>
                    </button>

                </div>

             }
             
        </div>
    )
}