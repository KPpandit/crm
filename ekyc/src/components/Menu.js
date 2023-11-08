import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import Fullscreen from 'react-full-screen';
import idcard from '../id_card.png';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import logo from '../logo.png';
import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_bk';
import './style.scss';
import axios from 'axios';
import newlogo from '../newlogo.png';

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



export default function Selfie(props) {
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const classes = useStyles();
    let loggedin = true;
    if (token == null) {
        loggedin = true;
    }
    const idwhich = localStorage.getItem('whichid');
    if (idwhich) {
        console.log(idwhich);
    }

    const id_f = localStorage.getItem('imgId1');
    const id_b = localStorage.getItem('imgId2');
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    const [whichId, setWhichId] = useState(idwhich ? idwhich : '');
  
    

   

    useEffect(() => {
        localStorage.setItem('whichid', whichId);
        localStorage.setItem('token', 'asadsfaddf');
        localStorage.removeItem('oksubmit');
    });

        // console.log(whichId);
        return (
            <Fragment>
                <div className="text-center">
                    <img
                        
                        src={newlogo}
                        style={{ height: 135 }}
                        alt="logoo"
                    ></img>
                    <h3 className="title-zest">Hello! Welcome to CHiLi Self e-KYC</h3>
                    <h5>KYC solution</h5>
               
                <div
                    className="whichid"
                    style={{ marginLeft: 50, marginTop: 0 }}
                >
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id="demo-simple-select-label"
                            style={{ marginLeft: -20, color: 'Gray' }}
                        >
                           Choose one 
                        </InputLabel>
                        <Select
                            style={{ marginLeft: -20 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={whichId}
                            onChange={(e) => {
                                setWhichId(e.target.value);
                                
                            }}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="resident">Resident</MenuItem>
                            <MenuItem value="visitor">
                                Tourist
                            </MenuItem>
                            <MenuItem value="work">Work visa</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                            
                        </Select>
                        <br/>
                        <br/>
                        <Link
                        style={{ marginLeft: -20 }}
                                        to="/Govtid"
                                        
                                    >
                                        <button
                                            className="button_id"
                                            style={{
                                                fontSize: 16,
                                                width: 120,
                                            }}
                                          
                                        >
                                            Next Page
                                        </button>
                                    </Link>
                    </FormControl>
                </div>
                <div className="selfie_page">
                    
                   
                        <GlobalStyle />
                    </div>
                   
              
                </div>
            </Fragment>
        );


    }





