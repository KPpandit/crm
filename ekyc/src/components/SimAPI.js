import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ImageList from '@material-ui/core/ImageList'
// import SignatureCanvas from "react-signature-canvas";
import Moment from 'moment';

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import './style1.css';
import axios from 'axios';
import './style.scss';
import user from '../user.svg';
import bank from '../mansabank.png';
import { Input } from '@material-ui/core';
import { Label } from 'reactstrap';
import Bottomstrip from './Bottomstrip'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MuiAlert from "@material-ui/lab/Alert";



let accessToken = '';
let simPhoto = '';
let validResponse = true;
let isProcessComplete = false;
let validId = true;


function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}


function callSimApis() {
    localStorage.removeItem('icta-process');
    const payload = JSON.stringify({
        "nicNum": "J2810923026892",
        "dateOfBirth": "28/10/1992",
        "gender": "F",
        "userType": "SELF"
    });

    let simPhoto = '';
    let nid = localStorage.getItem('id');
    
    let dob = localStorage.getItem('dob');
    console.log('simapi',dob);
    if(dob!=null && dob.indexOf(' ')!=-1){
        dob = Moment(dob).format('DD/MM/YYYY');
    }
   
    let type = localStorage.getItem('type');
    let gender = localStorage.getItem('gender');
    if(gender == "Female"){
        gender = 'F';
    }
    if(gender == "Male"){
        gender = 'M';
    }
    
    console.log(nid,dob, type,gender);
    //http://182.71.12.122:8727/APICalling.php?
    var querystring = require('querystring');
    const request = axios.post('https://ekyc.chili.mu:9443/sim/verify?' + querystring.stringify({
        nicNum: nid,
        dateOfBirth: dob,
        gender: gender,
        userType: type
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

            localStorage.setItem('dateOfBirth', response.data.dateOfBirth );
            console.log(localStorage.getItem('dob'));
            console.log(localStorage.getItem('dateOfBirth'));
            
            if(JSON.stringify(response.data.gender).indexOf("F")>0){localStorage.setItem('gender',"Female" );}
            else{localStorage.setItem('gender',"Male" );}
            

            localStorage.setItem('id', response.data.nicNum);
            localStorage.setItem('photograph', response.data.photograph);
            simPhoto = response.data.photograph;
            ///setIctaPhoto(response.data.photograph);
            localStorage.setItem('icta-process','done');
            console.log('*****',localStorage.getItem('icta-process'));
            window.location.reload(false);
            this.state.details.photograph = simPhoto;
            this.state.details.dob = response.data.dateOfBirth ;
            
            
        } 
        else{
            localStorage.setItem('icta-process','retry');
            //window.location.reload(false);
            window.history.back();
  
        }

    })
        .catch(function (error) {
            //localStorage.setItem('icta-process','error');
            if (error.response) {
                console.log(error.response.data);
                localStorage.setItem('icta-process','error');
                //window.location.reload(false);
            }
        }
        );
}




const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789`]/
const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    cssLabel: {
        color: '#f049ac',
    },
    input: {
        color: '#f049ac',
    },

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
        },
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'Gray !important',
    },
    select: {
        '&:before': {
            borderColor: 'Gray',
        },
        color: '#f049ac',
    },
    icon: {
        fill: 'Gray',
    },
});



class SimAPI extends Component {
    
    
    constructor(props) {
        super(props);
        
        // const [id,setid]=useState(localStorage.getItem('IDtype') ) //Getting here Govtid proof
        const token = localStorage.getItem('token');
        
        
        let loggedin = true;

        if (token == null) {
            loggedin = false;
        }
        console.log('*****',localStorage.getItem('icta-process'));
        if(localStorage.getItem('icta-process')!='done'){
            console.log('*****',localStorage.getItem('icta-process'));
            callSimApis();

        }
        
        

        this.state = {
            agentNumber : localStorage.getItem("AgentNumber"),
            json_len: -1,
            loggedin,
            cnt: 1,
            cli: 1,
            details: {
                firstName: localStorage.getItem('fn'),   //localStorage.getItem('fn'),
                lastName: localStorage.getItem('ln'),    //localStorage.getItem('ln'),
                maiden: localStorage.getItem('mn'),
                gender: localStorage.getItem('gender'),
                dob: localStorage.getItem('dateOfBirth'),
                cc: 'MAU', //localStorage.getItem('countryCode'),
                nid: localStorage.getItem('id'),
                process: false,
                photograph: localStorage.getItem('photograph'),
                corrId: localStorage.getItem('correlationId'),
                //address: localStorage.getItem('address'),
                //accountType: 'Savings Account',
                //occupation: '',
                //mother: '',
                //place: '',  

            },
        };
        this.hancli = this.hancli.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        var gen = event.target.value;
        this.setState((prevState) => ({
            details: {
                ...prevState.details,
                gender: gen,
            },
        }));
        console.log(this.state.details.date);
    }
    componentWillMount() {
        const data = localStorage.getItem('data');
        if (data) {
            this.setState(JSON.parse(data));
        }
        
        
        // this.setState({ date: date1 });
    }
    onDateChange = (date) => {
        this.setState((prevState) => ({
            details: {
                ...prevState.details,
                date: date
            },
        })
        );
        
    }




    componentDidUpdate() {

        //localStorage.setItem('data', JSON.stringify(this.state));
        //localStorage.setItem('date1', '' + this.state.details.date.getTime());
        //console.log(this.state.details.date);
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        let nam = this.state.details.firstName;
        let nam2 = this.state.details.lastName;
        // let age = calculate_age(this.state.details.date);
        let cnt = this.state.cnt;

        let check = format.test(nam + nam2);


    };
    hancli() {
        let cli = this.state.cli;
        cli = cli + 1;
        this.setState({ cli: cli });
    }
   
    render() {
        
        // console.log(this.state.age);
        if (this.state.loggedin === false) {
            return <Redirect to="/"></Redirect>;
        }
        const { classes } = this.props;
        return (
            <React.Fragment>
                {
                    this.state.agentNumber==null || this.state.agentNumber.trim().length==0?
                    null
                    : <div className='Auth-container' style={{marginTop:-50,textAlign:'center', }}>
                    <label><strong>Agent Number:{this.state.agentNumber}</strong></label>
                    <Link to="/logout" style={{textAlign:'end',marginLeft:20,color:'black'}}>Logout</Link>
                    <br></br>

                </div>
                }
                {!validId && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">Please upload a valid ID document. Refer to upload Tips.</Alert>
                    </div>
                )}
                {localStorage.getItem('icta-process')=='retry' && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="warning">Please verify the details, restart the process.</Alert>
                    </div>
                )}
                {localStorage.getItem('icta-process')=='error' && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="error">Error in validating provided details. Please try again.</Alert>
                    </div>
                )}
                {localStorage.getItem('icta-process')=='done' && (
                    <div style={{ marginTop: 0, marginLeft: 90 }}>
                        <Alert severity="success">Verification Successful. Please proceed </Alert>
                    </div>
                )}
                
                <div className="Auth-container">
                

                    <h4 style={{ color: '#f049ac' }}>
                        ICTA Data Verification
                    </h4>

                    <form onSubmit={this.mySubmitHandler} style={{textAlign:'center'}}>

                        

                        <div
                            style={{
                                textAlign: 'left',
                                color: 'blue',
                                marginLeft: -5,
                                marginTop: -10,
                                marginBottom: 5,
                            }}
                        >
                            <h6 style={{ backgroundColor: 'gray', color: 'white' }}>
                                ICTA SIM Details
                            </h6>
                        </div>
                        <div >{localStorage.getItem('icta-process')=='done' || <Skeleton count={50} />}</div>
                        <TextField
                            // required
                            name="corrId"
                            style={{marginBottom:5}}
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Correlation ID</div>}
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
                            value={this.state.details.corrId}
                        />
                        <br></br>
                        

                        <TextField
                            // required
                            name="firstName"
                            style={{marginBottom:5}}
                            id="outlined-required"
                            label={<div style={{color:'black'}}>First Name</div>}
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
                         
                        <TextField
                            // required
                            name="maiden"
                            style={{marginBottom:5}}
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Maiden Name</div>}
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

                       


                        <TextField
                            // required
                            name="lastName"
                            style={{marginBottom:5}}

                            id="outlined-required"
                            label={<div style={{color:'black'}}>Last Name</div>}
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
                        
                        <TextField
                            // required
                            name="cc"
                            style={{marginBottom:5}}
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Nationality</div>}
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
                        
                        <TextField
                            // required
                            name="nid"
                            style={{marginBottom:5}}
                            id="outlined-required"
                            label={<div style={{color:'black'}}>ID Number</div>}
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

                        <TextField
                            // required
                            name="gender"
                            style={{marginBottom:5}}
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Gender</div>}
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
                        
                        {/* <MuiThemeProvider theme={customTheme}> */}
                        <TextField
                            // required
                            name="dob"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Date Of Birth</div>}
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
                      
                        
                        
                       
                        {/* <ImageList
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
                        </ImageList> */}
                           
                        



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
                        <br></br>
                       
                        <button
                            className="button"
                            onClick={this.mySubmitHandler}
                            style={{
                                marginLeft: 0,
                                marginTop: 10,
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


            </React.Fragment>
        );
    }
}
SimAPI.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(SimAPI);
