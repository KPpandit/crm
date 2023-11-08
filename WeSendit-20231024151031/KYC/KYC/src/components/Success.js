import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style1.css';
import Bottomstrip from './Bottomstrip';
// import SignatureCanvas from "react-signature-canvas";

class Success extends Component {
    constructor(props) {
        super(props);
        const Selfie = localStorage.getItem('imgData');
        const Data = localStorage.getItem('data');
        const id_f = localStorage.getItem('imgId1');
        const id_b = localStorage.getItem('imgId2');
        const Data1 = JSON.parse(Data);
        const UserType = localStorage.getItem("userType")
       

        const whichid = localStorage.getItem('whichid');
        // this.state = {
        //     isComplete: Data1 && Selfie ? true : false,
        //     Selfie: Selfie,
        //     Data: Data1,
        //     id_f: id_f,
        //     id_b: id_b,
        // };
    }
    myChangeHandler = (event) => {
        event.preventDefault();
        localStorage.setItem('oksubmit', 'oksubmit');
        window.location.reload(false);
    };
    // componentWillUpdate() {
    //     if (this.Data1 != null && this.Selfie != null) {
    //         this.setState({ isComplete: true });
    //     }
    // }
    render() {
        // console.log(this.state.isComplete);
        // if (!this.state.isComplete) {
        //     return (
        //         <div className="Auth-container">
        //             {alert('Details are pening\nPlease fill all the details ')}
        //             <Redirect to="/validateadd"></Redirect>;
        //         </div>
        //     );
        // }
        //  else {
           
        // }
        return (
            <div className="Auth-container" style={{ textAlign: 'center' }}>
                
                <div style={{ marginTop: -20 }}>
                    <h3 style={{ color: '#1EC4DC' }}>Confirmation Page</h3>
                    <div style={{ fontWeight: 'Bold', color: 'Gray' }}>
                        Please confirm your details
                    </div>
                    {/* <div style={{ fontSize: 13, color: 'Gray' }}>
                        Navigation is enabled for editing purposes
                    </div> */}
                </div>
                {/* <Example data={this.state.Selfie} /> */}
                <div>
                    <h5
                        style={{
                            color: '#1EC4DC',
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
                                            color: '#1EC4DC',
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
                                            color: '#1EC4DC',
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
                                            color: '#1EC4DC',
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
                                            color: '#1EC4DC',
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
                                            color: '#1EC4DC',
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
                            color: '#1EC4DC',
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
                            color: '#1EC4DC',
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
                    <div style={{ color: '#1EC4DC', padding: 15 }}>
                    <h5
                                    style={{
                                            color: '#1EC4DC',
                                            textDecoration: 'underline',
                                             }}
                                >
                                     Additional Document
                                </h5>
                        
                    </div>
                </div>

                <img
                    className="classid_b_succ"
                    src={`data:image/jpeg;base64,${localStorage.getItem('imgId7')}`}
                    alt="classid_b_succ"
                    height="160"
                    width="260"
                    style={{ marginLeft: -129, marginTop: -10 }}
                    />
                <div>
                </div>
                        
        <div>
        <div style={{ marginTop: 170, marginLeft: -20 }}>
        <h6 style={{ backgroundColor: 'gray', color: 'white' }}> Please sign below </h6>
                        <div className="app">
                            {/* <SignatureCanvas
                                penColor="blue"
                                canvasProps={{ width: 300, height: 100 }}
                            /> */}
                        </div>
                        <hr></hr>
                        
                        <input value="checked" type="checkbox" checked disabled /><span> I Agree </span>
                        <Link to="/terms">Terms&Conditions </Link><br></br>

                    <button
                        className="button_id"
                        onClick={this.myChangeHandler}
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
        </div>
                
                
            </div>
        );
    }
}

export default Success;
