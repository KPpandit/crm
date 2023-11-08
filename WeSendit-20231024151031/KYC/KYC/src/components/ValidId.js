import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import SignatureCanvas from "react-signature-canvas";


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
const dateStr = localStorage.getItem('dob');
if (dateStr != null) {

    var yy = dateStr.substring(0, 2);
    var mm = dateStr.substring(2, 4);
    var dd = dateStr.substring(4, 6);
    if (yy > 24) {
        yy = '19' + yy;
    } else {
        yy = '20' + yy;
    }
    // localStorage.setItem('dob', dd + '-' + mm + '-' + yy);

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
        color: '#1EC4DC',
    },
    input: {
        color: '#1EC4DC',
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
        color: '#1EC4DC',
    },
    icon: {
        fill: 'Gray',
    },
});



class Auth extends Component {
    constructor(props) {
        super(props);
        // const [id,setid]=useState(localStorage.getItem('IDtype') ) //Getting here Govtid proof
        const token = localStorage.getItem('token');
        const kycdata = localStorage.getItem('kyc-data');
        let loggedin = true;
        if (token == null) {
            loggedin = false;
        }
       
        this.state = {
            json_len: -1,
            loggedin,
            cnt: 1,
            cli: 1,
            details: {
                firstName: localStorage.getItem('fn'),   //localStorage.getItem('fn'),
                lastName: localStorage.getItem('ln'),    //localStorage.getItem('ln'),
                gender: 'Male',
                date: new Date(),       //localStorage.getItem('dob'),
                cc: localStorage.getItem('countryCode'), //localStorage.getItem('countryCode'),
                nid:localStorage.getItem('id'),
                email:'',
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
        const date1 = new Date(parseInt(localStorage.getItem('date1'), 10));
        console.log(date1);
        localStorage.getItem('date1');
        if (localStorage.getItem('date1')) {
            this.setState((prevState) => ({
                details: {
                    ...prevState.details,
                    date: date1,
                },
            }));
        }
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

       let dateis = day+"-"+month+"-"+year;
        localStorage.setItem("dob",dateis);
        console.log("dob",dateis);

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
        if (nam=="email"){
            localStorage.setItem('Email',val)
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
                <div className="Auth-container">


                    <h4 style={{ color: '#1EC4DC' }}>
                        Please Validate Your Information
                    </h4>

                    <form onSubmit={this.mySubmitHandler}>

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
                                PERSONAL DETAILS
                            </h6>
                        </div>


                        <TextField
                            // required
                            name="firstName"
                            id="outlined-required"
                            label={<div>First Name</div>}
                            variant="outlined"
                            // onChange={this.myChangeHandler}
                            onChange={(e) => this.handleChange(e)}
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
                            onChange={(e) => this.handleChange(e)}
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
                            onChange={(e) => this.handleChange(e)}
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
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.details.nid}
                        />
                        
                        <br></br>
                        <br></br>
                        <TextField
                            // required
                            name="email"
                            id="outlined-required"
                            label={<div>Email Address</div>}
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
                            value={this.state.details.email}
                            onChange={(e) => this.handleChange(e)}
                        />
                        
                        <br></br>
                        <br></br>
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
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
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
                                label={
                                    <div style={{ color: 'Gray' }}>
                                        Date of birth
                                    </div>
                                }
                                placeholder="Date of birth"
                                onChange={this.onDateChange}
                                maxDate={new Date()}
                                format="MM/dd/yyyy"
                                InputProps={{
                                    classes: { input: classes.input },
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        {/* </MuiThemeProvider> */}
                        <br />

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
                                width: 150,
                                textAlign: 'center',
                                fontSize: 15,
                            }}
                        >
                            <Link
                                to="/selfie"
                                className="link1"
                                onClick={
                                    this.state.details.firstName &&
                                        this.state.details.lastName &&
                                        !format.test(
                                            this.state.details.firstName
                                        ) &&
                                        !format.test(this.state.details.lastName)
                                        ? null
                                        : (e) => e.preventDefault()
                                }
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
Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Auth);
