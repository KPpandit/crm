import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Moment from 'moment';
import SignatureCanvas from "react-signature-canvas";
import MuiAlert from "@material-ui/lab/Alert";

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
import Bottomstrip from './Bottomstrip'; 





function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return parseInt(Math.abs(age_dt.getUTCFullYear() - 1970));
}

function handleChange() {

}

function Alert(props) {
    return <MuiAlert elevation={6}
        variant="filled" {...props} />;
}


const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;
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

let error = false;
let notfound = false;

class Auth extends Component {
    constructor(props) {
        super(props);
        //msg = ;
        if(localStorage.getItem('icta-process') == 'error'){
            error = true;
        }
        if(localStorage.getItem('icta-process') == 'retry'){
            notfound = true;
        }
        console.log('icta-process message ', localStorage.getItem('icta-process'));
        // const [id,setid]=useState(localStorage.getItem('IDtype') ) //Getting here Govtid proof
        const token = localStorage.getItem('token');
        const kycdata = localStorage.getItem('kyc-data');
        localStorage.removeItem('icta-process');
        let loggedin = true;
        if (token == null) {
            loggedin = false;
        }
        let ccStr = '';
        if(localStorage.getItem("userType") == 'citizen'){
            ccStr = 'MAU';
            localStorage.setItem('type','SELF')
        }
        if(localStorage.getItem("userType")=="tourist"){
            localStorage.setItem('type','TOURIST')
        }
        if(localStorage.getItem('countryCode')!=null && localStorage.getItem('countryCode')!="" ){
            ccStr = localStorage.getItem('countryCode').toUpperCase();
            
        }
        localStorage.setItem('countryCode',ccStr);
        let dob = localStorage.getItem('dob');
        if(localStorage.getItem("userType") == 'resident'){
            localStorage.setItem('type','RESIDENT')
            if(dob!=null && dob.length==6){
                let yy = new String(dob).substring(0,2);
                let mm = new String(dob).substring(2,4);
                let dd = new String(dob).substring(4,6);
                if(yy > 25){
                    yy = '19'+yy;
                }else{ yy = '20'+yy}
                dob = dd+'/'+mm+'/'+yy
                localStorage.setItem('dob',dob);
                console.log('resident dob',dob);
                //dob = new Date(dob);
                //let dateis = Moment(dob).format('DD/MM/YYYY');
                //console.log('converted resident dob',dateis);
                //dob = dateis;
            }

        }
        this.state = {
            agentNumber : localStorage.getItem("AgentNumber"),
            uservalue : localStorage.getItem("userType"),
            IDTYPE : localStorage.getItem('IDtype'),
            json_len: -1,
            loggedin,
            cnt: 1,
            cli: 1,
            details: {
                firstName: localStorage.getItem('fn'),   //localStorage.getItem('fn'),
                lastName: localStorage.getItem('ln'),    //localStorage.getItem('ln'),
                gender: localStorage.getItem('gender'),
                date: dob,       //localStorage.getItem('dob'),
                cc: ccStr, //localStorage.getItem('countryCode'),
                
                nid:localStorage.getItem('id'),
                type:'',
                puid:localStorage.getItem('pmUid'),

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
    
    componentWillMount() {
       
        // this.setState({ date: date1 });
    }
    onDateChange = (date) =>{
        this.setState((prevState) => ({
            details: {
                ...prevState.details,
                date: date
            },
        })
        );
        let d = new Date(date);
       let  month = d.getMonth()+1;
       let  year =d.getFullYear();
       let day =d.getDate();

       let dateis = day+"/"+month+"/"+year;
       dateis = Moment(d).format('DD/MM/YYYY');
        localStorage.setItem("dob",dateis);
        console.log("dob",dateis);
        this.state.details.date = dateis;

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
    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState((prevState) => ({
            details: {
                ...prevState.details,
                [nam]: val,
            },
        }));
        if (nam=="firstName"){
            localStorage.setItem('fn',val)
        }
        if (nam=="lastName"){
            localStorage.setItem('ln',val)
        }
        if (nam=="gender"){
            localStorage.setItem('gender',val)
        }
        if (nam=="cc"){
            localStorage.setItem('countryCode',val)
        }
        if (nam=="nid"){
            localStorage.setItem('id',val)
        }
        if (nam=="type"){
            localStorage.setItem('type',val)
        }
        if(nam=="puid"){
            localStorage.setItem('puid',val)
        }
        
        console.log(nam, val);

            // this.setState(prevState=>{
            //     let details = Object.assign({}, prevState.details);
            //     nam = val;
            // })
            
    };
    render() {
        // console.log(this.state.age);
        if (this.state.loggedin === false) {
            return <Redirect to="/"></Redirect>;
        }
        const { classes } = this.props;
        return (
            <React.Fragment>
                {error && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">Verification Failed - ICTA Error.</Alert>
                    </div>
                )}
                {notfound && (
                    <div style={{ marginTop: -20, marginLeft: 90 }}>
                        <Alert severity="error">Verification Failed - Record Not Found.</Alert>
                    </div>
                )}
                <div className="Auth-container" style={{textAlign:'center'}}>
                {
                    this.state.agentNumber==null || this.state.agentNumber.trim().length==0?
                    null
                    : <div  style={{marginTop:-50,textAlign:'center', }}>
                    <label><strong>Agent Number:{this.state.agentNumber}</strong></label>
                    <Link to="/logout" style={{textAlign:'end',marginLeft:20,color:'black'}}>Logout</Link>
                    <br></br>

                </div>
                }

                    <h4 style={{ color: '#f049ac' }}>
                        
                        {
                            this.state.agentNumber==null || this.state.agentNumber.trim().length==0?
                            <div>Please fill your Valid & Correct information </div>
                            :<div>Please fill Valid & Correct customer information</div>
                        }
                    </h4>

                    <form onSubmit={this.mySubmitHandler}>

                        <br></br>
                        
                        <div
                            style={{
                                textAlign: 'left',
                                color: 'blue',
                                marginLeft: -5,
                                marginTop: -10,
                                marginBottom: 10,
                            }}
                        >
                            <h6 style={{ backgroundColor: 'gray', color: 'white' }}>
                                PERSONAL DETAILS
                            </h6>
                        </div>
                            

                        <TextField
                            // required
                            name="cc"
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
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.details.cc}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            // required
                            name="nid"
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
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.details.nid}
                        />
                        
                       
                        
                        <br></br>
                        <br></br>
                        {
                                 this.state.uservalue =="resident"?
                                 <div>
                                    <TextField
                            // required
                            name="puid"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Permit-ID</div>}
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
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.details.puid}
                        />
                        
                                 </div>
                                 :null
                            }
                        <FormControl
                            className={classes.formControl}
                            style={{ width: 250, marginLeft: 0 }}
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ color: 'Gray' }}
                            >
                                Gender
                            </InputLabel>
                            <Select
                                name="gender"
                                style={{textAlign:'left'}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.details.gender}
                                onChange={(e) => this.handleChange(e)}
                                className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                            >
                                <MenuItem value="N">Choose</MenuItem>
                                <MenuItem value="F">Female</MenuItem>
                                <MenuItem value="M">Male</MenuItem>
                            </Select>
                        </FormControl>
                        <br></br>
                        <br></br>
                       
                        {/* <MuiThemeProvider theme={customTheme}> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                clearable
                                name="date"
                                value={this.state.details.date}

                                placeholder="Date of birth"
                                onChange={this.onDateChange}
                                maxDate={new Date()}
                                format="dd/MM/yyyy"
                                InputProps={{
                                    classes: { input: classes.input },
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        {/* </MuiThemeProvider> */}
                        <br />
                        <br />
                        {/* <FormControl
                            className={classes.formControl}
                            style={{ width: 250, marginLeft: 0 }}
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ color: 'Gray' }}
                            >
                                User Type
                            </InputLabel>
                            {
                        //     this.state.uservalue == "citizen"?
                        //     <Select
                        //     name="type"
                        //     style={{textAlign:'left'}}
                        //     labelId="demo-simple-select-label"
                        //     id="demo-simple-select"
                        //     value={this.state.details.type}
                        //     onChange={(e) => this.handleChange(e)}
                        //     className={classes.select}
                        //     inputProps={{
                        //         classes: {
                        //             icon: classes.icon,
                        //         },
                        //     }}
                        // >
                        //     <MenuItem value="SELF">Self</MenuItem>
                        //     <MenuItem value="GUARDIAN">Guardian</MenuItem>
                        //     <MenuItem value="ORGANIZATION">Organization</MenuItem>
                        // </Select>
                        
                        this.state.uservalue =="resident"?
                        <Select
                        name="type"
                        style={{textAlign:'left'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.details.type}
                        onChange={(e) => this.handleChange(e)}
                        className={classes.select}
                        inputProps={{
                            classes: {
                                icon: classes.icon,
                            },
                        }}
                    >
                        <MenuItem value="RESIDENT">Resident</MenuItem>
                    </Select>
                            :this.state.uservalue =="tourist"?
                            <Select
                            name="type"
                            style={{textAlign:'left'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.details.type}
                            onChange={(e) => this.handleChange(e)}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="TOURIST">Tourist</MenuItem>
                            
                        </Select>
                        
                        
                        :null}
                            
                        </FormControl> */}
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
                      
                      { this.state.uservalue=="resident" || this.state.uservalue=="tourist"  ?(
                        <button
                            className="button"
                            onClick={this.mySubmitHandler}
                            style={{
                                marginLeft: 0,
                                width: 150,
                                textAlign: 'center',
                                fontSize: 15,
                            }}
                        >
                            <Link
                                to="/passport"
                                className="link1"
                                //</button>onClick={
                                    //callSimApis()
                                //}
                               
                            >
                                Verify
                            </Link>
                        </button>):
                        <button
                        className="button"
                        onClick={this.mySubmitHandler}
                        style={{
                            marginLeft: 0,
                            width: 150,
                            textAlign: 'center',
                            fontSize: 15,
                        }}
                    >
                        { this.state.IDTYPE =="passport"?
                        <Link
                        to="/passport"
                        className="link1"
                        //</button>onClick={
                            //callSimApis()
                        //}
                       
                    >
                        Verify
                    </Link>
                    :<Link
                    to="/sim"
                    className="link1"
                    //</button>onClick={
                        //callSimApis()
                    //}
                   
                >
                    Verify
                </Link>}
                        
                    </button>
    }

                        {/* <Link to="/selfie">
                            <button className="button">Next Page</button>
                        </Link> */}
                    </form>
                    
                </div>
                

            </React.Fragment>
        );
    }
}
Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Auth);