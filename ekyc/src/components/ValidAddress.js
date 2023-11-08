import React, { Component } from 'react';
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
        color: 'Gray',
    },
    input: {
        color: 'Blue',
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
        color: 'Blue',
    },
    icon: {
        fill: 'Gray',
    },
});



class Auth extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        const kycdata = localStorage.getItem('kyc-data');
        
        let loggedin = true;
        
        if (token == null) {
            loggedin = false;
        }
        this.state = {
            showproceedbtn:false,
            json_len: -1,
            loggedin,
            agentNumber : localStorage.getItem("AgentNumber"),
            cnt: 1,
            cli: 1,
            details: {
                firstName: '',//localStorage.getItem('fn'),
                lastName: '',//localStorage.getItem('ln'),
                gender: 'Male',
                date: '',//localStorage.getItem('dob'),
                cc: '',//localStorage.getItem('countryCode'),
                address: localStorage.getItem('address'),
                email:localStorage.getItem('email'),
                //accountType: 'Savings Account',
                //occupation: '',
                //mother: '',
                //place: '',
                nid:'',

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
    
    componentDidUpdate() {
        //localStorage.setItem('data', JSON.stringify(this.state));
        //localStorage.setItem('date1', '' + this.state.details.date.getTime());
        //console.log(this.state.details.date);
        
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        let nam = this.state.details.address;
        let nam2 = this.state.details.email;
       // let age = calculate_age(this.state.details.date);
        let cnt = this.state.cnt;
        if(nam == "" ){
            alert("Enter the Address");
        }
        else{
            
            const formData = new FormData();
            formData.append('address', localStorage.getItem('address'));
            formData.append('token', localStorage.getItem('Token'));
    
            const request = axios.put('https://ekyc.chili.mu:9443/api/processAddress', formData, {
                headers: {                    
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(function (response) {
                 this.state.showproceedbtn=true
                    console.log("Addressresponse",response);

                });
        }

    };
    hancli() {
        let cli = this.state.cli;
        cli = cli + 1;
        this.setState({ cli: cli });
    }
    myChangeHandler = (event) => {
        
       
        let nam = event.target.name;
        let val = event.target.value;
        this.setState((prevState) => ({
            details: {
                ...prevState.details,
                [nam]: val,
            },
        }));
        if(nam == 'address')
        {
           
            localStorage.setItem('address',val)
        }
        if(nam == 'email'){
            
                localStorage.setItem("email",val)
            
        }





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
                {
                    this.state.agentNumber==null || this.state.agentNumber.trim().length==0?
                    null
                    :<div  style={{marginTop:-50,textAlign:'center'}}>
                        <label><strong>Agent Number:{this.state.agentNumber}</strong></label>
                        <Link to="/logout" style={{textAlign:'end',marginLeft:20,color:'black'}}>Logout</Link>
                        <br></br>
                    </div>
                }

                    <h4 style={{ color: '#f049ac' }}>
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
                                OTHER DETAILS
                            </h6>
                        </div>

                        <TextField
                            required
                            name="address"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Address</div>}
                            variant="outlined"
                            onChange={this.myChangeHandler}
                            value={this.state.details.address}
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
                        /><br></br>
                        <sub style={{color:"red"}}>*Please ensure that the address provided is as per the address proof document attached.</sub>
                        <br></br>
                        <br></br>


                        <TextField
                            name="email"
                            type='email'
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Email</div>}
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
                            onChange={this.myChangeHandler}
                            // value={this.state.details.email}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            
                            name="Alternativenumber"
                            type="tel"
                            id="outlined-required"
                            label={<div style={{color:'black'}}>Alternative Number</div>}
                            variant="outlined"
                            inputProps={{maxLength:8}}
                            onChange={(e)=>{(localStorage.setItem('alternativeNumber',e.target.value))}}

                            />
                        <br></br>
                        <br></br>
                        
                        {this.state.details.address==null || this.state.details.address.trim().length==0 ?
                        null
                    :<button
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
                        to="/success"
                        className="link1"
                        
                    >
                        Save and Continue
                    </Link>
                </button>}
                        
                            
                        
                            
                        
                       
                    
                        {/* <button
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
                                to="/success"
                                className="link1"
                            >
                                Save and Continue
                            </Link>
                        </button> */}

                        {/* <Link to="/selfie">
                            <button className="button">Next Page</button>
                        </Link> */}
                    </form>
                    <Bottomstrip></Bottomstrip>
                </div>
            </React.Fragment>
        );
    }
}
Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Auth);
