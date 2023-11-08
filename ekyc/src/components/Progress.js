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

import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_bk';
import './style.scss';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Bottomstrip from './Bottomstrip'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MuiAlert from "@material-ui/lab/Alert";
import TextField from '@material-ui/core/TextField';
import ImageList from '@material-ui/core/ImageList'



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

function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}


export default function Selfie(props) {
    const unique_id = uuid();
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const [UserType] = useState(localStorage.getItem("usertype"))
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const classes = useStyles();
    let loggedin = true;
    let isError = false;
    if (token == null) {
        loggedin = false;
    }
    

    // console.log("category = "+uservalue);                    Check for UserType
    const uservalue = localStorage.getItem("userType");
    const [userType, setUserType] = useState(uservalue);
    const [shownxtbtn, setshownxtbtn] = useState(false)



    function callSimApis() {
    
        const payload = JSON.stringify({
            "nicNum": "J2810923026892",
            "dateOfBirth": "28/10/1992",
            "gender": "F",
            "userType": "SELF"
        });
    
        let simPhoto = '';
    
        var querystring = require('querystring');
        const request = axios.post('http://182.71.12.122:8727/APICalling.php?' + querystring.stringify({
            nicNum: 'J2810923026892',
            dateOfBirth: '28/10/1992',
            gender: 'F',
            userType: 'SELF'
        }), {
            headers: {
                "Content-Type": "application/json"
    
            }
        }).then(function (response) {
            let correlationId = response.data.correlationId;
            console.log(response, response.data);
            if (correlationId != null) {
                console.log(correlationId);
                localStorage.setItem('correlationId', correlationId);
                localStorage.setItem('fn', response.data.firstName);
                localStorage.setItem('ln', response.data.lastName);
                localStorage.setItem('mn', response.data.maidenName);
    
                localStorage.setItem('dob', response.data.dateOfBirth );
                console.log(localStorage.getItem('dob'));
                
                if(JSON.stringify(response.data.gender).indexOf("F")>0){localStorage.setItem('gender',"Female" );}
                else{localStorage.setItem('gender',"Male" );}
                
    
                localStorage.setItem('id', response.data.nicNum);
                localStorage.setItem('photograph', response.data.photograph);
                simPhoto = response.data.photograph;
                ///setIctaPhoto(response.data.photograph);
                
                this.state.details.photograph = simPhoto;
                this.state.details.dob = response.data.dateOfBirth ;
            }
    
        })
            .catch(function (error) {
    
                if (error.response) {
                    console.log(error.response.data);
                }
            }
            );
    }
    
    
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [photoClk, setPhotoClk] = useState(false);
    const [validResponse, setValidResponse] = useState(true);
    const [isProcessComplete, setIsProcessComplete] = useState(false);
    const [status, setStatus] = useState(true);
    const [validId, setValidId] = useState(true);
    //const [isResponseError, setIsResponseError] = useState[false];

    
    useEffect(() => {

        
        window.addEventListener('online', () => setStatus(true))
        window.addEventListener('offline', () => setStatus(false))
    }, []);
    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
        // console.log(whichId);

        return (

            <Fragment>
                {!validId && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">Please upload a valid ID document. Refer to upload Tips.</Alert>
                    </div>
                )}
                {!validResponse && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">Error in validating provided details. Please try again.</Alert>
                    </div>
                )}
                {isProcessComplete && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="success">Successful. Please proceed </Alert>
                    </div>
                )}
                {!status && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">You are offline! Please check your internet connection.</Alert>
                    </div>
                )}
                 <div className="Auth-container">


<h4 style={{ color: '#f049ac' }}>
    ICTA Data Verification
</h4>

<form>

    <br></br>

    <div
        style={{
            textAlign: 'left',
            color: 'blue',
            marginLeft: -5,
            marginTop: -10,
            marginBottom: 40,
        }}
    >
        <h6 style={{ backgroundColor: 'gray', color: 'white' }}>
            ICTA SIM Details
        </h6>
    </div>


    <TextField
        // required
        name="firstName"
        id="outlined-required"
        label={<div>First Name</div>}
        variant="outlined"
        // onChange={this.myChangeHandler}
        value={this.state.details.firstName}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
        }}
    />
     <br></br>
    <br></br>
    <TextField
        // required
        name="maiden"
        id="outlined-required"
        label={<div>Maiden Name</div>}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
        }}
        variant="outlined"
        value={this.state.details.maiden}

    />

    <br></br>
    <br></br>


    <TextField
        // required
        name="lastName"
        id="outlined-required"
        label={<div>Last Name</div>}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
        }}
        variant="outlined"
        value={this.state.details.lastName}
    />
    <br></br>
    <br></br>
    <TextField
        // required
        name="cc"
        id="outlined-required"
        label={<div>Nationality</div>}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
        }}
        variant="outlined"
        value={this.state.details.cc}
    />
    <br></br>
    <br></br>
    <TextField
        // required
        name="nid"
        id="outlined-required"
        label={<div>ID Number</div>}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
        }}
        variant="outlined"
        value={this.state.details.nid}
    />

   
    <br></br>
    <br></br>
    <TextField
        // required
        name="gender"
        id="outlined-required"
        label={<div>Gender</div>}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
        }}
        variant="outlined"
        value={this.state.details.gender}
    />
    <br></br>
    <br></br>
   

    {/* <MuiThemeProvider theme={customTheme}> */}
    <TextField
        // required
        name="dob"
        id="outlined-required"
        label={<div>Date Of Birth</div>}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
        }}
        InputProps={{
            classes: {
                input: classes.input,
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
        }}
        variant="outlined"
        value={this.state.details.dob}
    />
    {/* </MuiThemeProvider> */}
    <br />
    
    <div >{localStorage.getItem('icta-process')!='done' || <Skeleton count={5} />}</div>
   
    <ImageList
    sx={{ width: 500, height: 500 }}
    variant="quilted"
    cols={3}
    rowHeight={200}>
    <img
                            className="selpic_selfiepage"
                            src={`data:image/jpeg;base64,${this.state.details.photograph}`}
                            alt="selpic_selfiepage"
                            style={{ marginTop: 5, marginLeft: 10}}
                        />
    </ImageList>
       
    <br></br>
    <br></br>



    {/*                         
    <br></br>
    <h6 style={{ backgroundColor: 'gray', color: 'white' }}>
        Please sign below
    </h6>
    <div className="app">
        <SignatureCanvas
            penColor="blue"
            canvasProps={{ width: 300, height: 100 }}
        />
    </div> */}
   
    <button
        className="button"
        onClick={this.mySubmitHandler}
        style={{
            marginLeft: 52,
            marginTop: 200,
            width: 150,
            textAlign: 'center',
            fontSize: 15,
        }}
    >
        <Link
            to="/selfie"
            className="link1"
            
        >
            Save and Continue
        </Link>
    </button>
    {/* <Link to="/selfie">
        <button className="button">Next Page</button>
    </Link> */}
</form>

</div>


                
                <Bottomstrip />
            </Fragment>
        );


    }




}
