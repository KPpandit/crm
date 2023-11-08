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
function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return parseInt(Math.abs(age_dt.getUTCFullYear() - 1970));
}

function handleChange() {

}
const dateStr = localStorage.getItem('do');
if(dateStr!=null){
    
    var yy = dateStr.substring(0,2);
    var mm = dateStr.substring(2,4);
    var dd = dateStr.substring(4,6);
    if(yy>24){
        yy = '19'+yy;
    }else{
        yy = '20'+yy;
    }
    // localStorage.setItem('dob',dd+'-'+mm+'-'+yy);

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
            json_len: -1,
            loggedin,
            cnt: 1,
            cli: 1,
            details: {
                firstName: localStorage.getItem('fn'),
                lastName: localStorage.getItem('ln'),
                gender: 'Male',
                date: localStorage.getItem('dob'),
                country: localStorage.getItem('countryCode'),
                address: localStorage.getItem('address'),
                accountType: 'Savings Account',
                occupation: '',
                mother: '',
                place: '',
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
    onDateChange = (date) =>
        this.setState((prevState) => ({
            details: {
                ...prevState.details,
                date: date,
            },
        }));
    componentDidUpdate() {
        localStorage.setItem('data', JSON.stringify(this.state));
        localStorage.setItem('date1', '' + this.state.details.date.getTime());
        console.log(this.state.details.date);
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        let nam = this.state.details.firstName;
        let nam2 = this.state.details.lastName;
        let age = calculate_age(this.state.details.date);
        let cnt = this.state.cnt;

        let check = format.test(nam + nam2);
        if (check || !nam || !nam2) {
            alert('Enter Valid name without special characters and numbers');
        }
        if (nam && nam2 && !check && cnt === 1) {
            this.setState({ cnt: 2 });
            axios.post('http://localhost:3333/users/', {
                firstName: this.state.details.firstName,
                lastName: this.state.details.lastName,
                age: age,
                gender: this.state.details.gender,
                DOB:
                    this.state.details.date.getDate() +
                    '-' +
                    (this.state.details.date.getMonth() + 1) +
                    '-' +
                    this.state.details.date.getFullYear(),
            });
            // console.log(this.state.json_len);
            axios.get('http://localhost:3333/users/').then((res) => {
                this.setState({ json_len: res.data.length });
            });
        }
        if (nam && nam2 && cnt === 2) {
            axios.put(
                'http://localhost:3333/users/' + (this.state.json_len + 1),
                {
                    firstName: this.state.details.firstName,
                    lastName: this.state.details.lastName,
                    age: age,
                    gender: this.state.details.gender,
                    DOB:
                        this.state.details.date.getDate() +
                        '-' +
                        (this.state.details.date.getMonth() + 1) +
                        '-' +
                        this.state.details.date.getFullYear(),
                }
            );
            this.setState({ cnt: 2 });
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
                    <div
                        style={{
                            // height: 100,
                            marginLeft: -20,
                            marginTop: -50,
                            textAlign: 'center',
                        }}
                    >
                        
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            color: 'blue',
                            marginLeft: -10,
                            marginTop: -10,
                            marginBottom: 40,
                        }}
                    >
                        <h6 style={{ color: 'Gray' }}>
                            INDIVIDUAL ACCOUNT OPENING FORM
                        </h6>
                    </div>
                    <form onSubmit={this.mySubmitHandler}>
                        <FormControl
                            className={classes.formControl}
                            style={{ width: 250, marginLeft: 0 }}
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ color: 'Gray' }}
                            >
                                Choose Account Type
                            </InputLabel>
                            <Select
                                labelId="account-simple-select-label"
                                id="account-simple-select"
                                value={this.state.details.accountType}
                                onChange={this.handleChange}
                                className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                            >
                                <MenuItem value="current">Current Account</MenuItem>
                                <MenuItem value="savings">Savings Account</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <br></br>
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
                            <h6 style={{ backgroundColor: 'black', color: 'white' }}>
                                PERSONAL DETAILS
                            </h6>
                        </div>

                        <TextField
                            // required
                            name="firstName"
                            id="outlined-required"
                            label={<div>Surname & Name</div>}
                            variant="outlined"
                            onChange={this.myChangeHandler}
                            value={this.state.details.lastName + ' ' + this.state.details.firstName}
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
                            name="address"
                            id="outlined-required"
                            label={<div>Address</div>}
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
                            value={this.state.details.address}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            // required
                            name="nationality"
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
                            onChange={this.myChangeHandler}
                            value={this.state.details.country}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            // required
                            name="profession"
                            id="outlined-required"
                            label={<div>Occupation</div>}
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
                            value={this.state.details.occupation}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            // required
                            name="mother"
                            id="outlined-required"
                            label={<div>Mother's maiden name</div>}
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
                            value={this.state.details.mother}
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
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.details.gender}
                                onChange={this.handleChange}
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
                        <TextField
                            // required
                            name="lastName"
                            id="outlined-required"
                            label={<div>Place Of Birth</div>}
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
                            value={this.state.details.place}
                        />
                        <br></br>
                        <br></br>
                        {/* <MuiThemeProvider theme={customTheme}> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                clearable
                                value={this.state.details.date}
                                label={
                                    <div style={{ color: 'Gray' }}>
                                        Date of birth
                                    </div>
                                }
                                placeholder="10/10/2018"
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

                        <FormControl
                            className={classes.formControl}
                            style={{ width: 250, marginLeft: 0 }}
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ color: 'Gray' }}
                            >
                                Marital Status
                            </InputLabel>
                            <Select
                                labelId="married-simple-select-label"
                                id="married-simple-select"
                                value={this.state.details.marital}
                                onChange={this.handleChange}
                                className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                            >
                                <MenuItem value="Married">Married</MenuItem>
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <TextField
                            // required
                            name="spouse"
                            id="outlined-required"
                            label={<div>Name of Spouse</div>}
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
                            value={this.state.details.spouse}
                        />
                        <br></br>
                        <br></br>
                        <h7 style={{ backgroundColor: 'black', color: 'white' }}>
                                Please sign below
                            </h7>
                        <div className="app">
                            {/* <SignatureCanvas
                                penColor="blue"
                                canvasProps={{ width: 300, height: 100 }}
                            /> */}
                        </div>
                        <br></br>
                        <br></br>
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
                                to="/success"
                                className="link1"
                                onClick={
                                    this.state.details.firstName &&
                                        this.state.details.firstName &&
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
