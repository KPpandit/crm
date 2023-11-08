import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style1.css';
import Bottomstrip from './Bottomstrip';
import SignatureCanvas from "react-signature-canvas";
import Axios from "axios";

class Success extends Component {
    
    constructor(props) {
        super(props);
        const Selfie = localStorage.getItem('imgData');
        const Data = localStorage.getItem('data');
        const id_f = localStorage.getItem('imgId1');
        const id_b = localStorage.getItem('imgId2');
        const Data1 = JSON.parse(Data);
       
        localStorage.setItem('IconType','check');

        const whichid = localStorage.getItem('whichid');
        // this.state = {
        //     isComplete: Data1 && Selfie ? true : false,
        //     Selfie: Selfie,
        //     Data: Data1,
        //     id_f: id_f,
        //     id_b: id_b,
        // };
        this.state = {
         UserType : localStorage.getItem("userType"),
         agentNumber : localStorage.getItem("AgentNumber"),
         token:localStorage.getItem('Token'),
         customernumber:localStorage.getItem('CustomerNumber'), 
         mailid:localStorage.getItem('email') ,
         addressprooftype:localStorage.getItem("adressdocumentType") 
        }
    }
    myChangeHandler = (event) => {
        event.preventDefault();
        localStorage.setItem('oksubmit', 'oksubmit');
        // window.location.reload(false);
    };
    // componentWillUpdate() {
    //     if (this.Data1 != null && this.Selfie != null) {
    //         this.setState({ isComplete: true });
    //     }
    // }


     sendsms(){
        let txt = `Dear Customer, Congratulations! Welcome to the family of CHILI. Your reference for eKYC Corelation ID is- ${this.state.token} for ${this.state.customernumber} Enjoy the CHiLi services.`


        // const req =  Axios.get("https://ekyc.chili.mu:9443/otp/verifyOtp/"+"230"+data.msisdn+"/"+data.otp,
        // let text = 'Dear Customer, Congratulations! Welcome to the family of CHILI. Your reference for eKYC is'+token+' Enjoy the CHiLi services.\n'+'Best regards\n'+'MTML Chilli';
        // const req = Axios.get("https://ekyc.chili.mu:9443/ekyc/v1/sms?msisdn="+"23058935671"+"&from=2306668&text="+txt+"&configId=2&locale=en",

        const req = Axios.get("https://ekyc.chili.mu:9443/ekyc/v1/sms?msisdn="+"230"+this.state.customernumber+"&from=2306668&text="+txt+"&configId=2&locale=en",
            {
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then((res) => {
            console.log("result is ",res.data.status)
           
        
           }).catch((error)=>{
                        console.log(error);
                    });  
    }

     sendEmail(){
        let token=localStorage.getItem('Token')
        const req = Axios.get("https://ekyc.chili.mu:9443/email?email="+this.state.mailid+"&token="+token+"&status=success",
        // const req = Axios.get("https://ekyc.chili.mu:9443/email?email=gagandeep@wpitservices.com&token=56445667asdafssfddfg&status=success",

        {
            headers:{'Content-Type':'application/json;charset=utf-8'}
        }).then((res)=>{
            console.log("email response is= ",res);
        }).catch((error)=>{
            console.log(error)
        });
    }
    render() {
        // console.log(this.state.isComplete);
        // if (!this.state.isComplete) {
        //     return (
        //         <div className="Auth-container">
        //             {alert('Details are pening\nPlease fill all the details ')}
                    // <Redirect to="/validateadd"></Redirect>;
        //         </div>
        //     );
        // }
        //  else {
           
        // }
        return (
            <div className="Auth-container" style={{ textAlign: 'left' }}>
                {
                    this.state.agentNumber==null || this.state.agentNumber.trim().length==0?
                    null
                    :<div  style={{marginTop:-50,textAlign:'center'}}>
                        <label><strong>Agent Number:{this.state.agentNumber}</strong></label>
                        <Link to="/logout" style={{textAlign:'end',marginLeft:20,color:'black'}}>Logout</Link>
                        <br></br>
                    </div>
                }
                <div style={{ marginTop: 0, marginLeft: 20 }}>
                    <h4 style={{ color: '#f049ac' }}>Confirmation Page</h4>
                    <div style={{ fontWeight: 'Bold', color: 'Gray' }}>
                    {
                        this.state.agentNumber==null ||  this.state.agentNumber.trim().length==0 ?
                        <div>Please Confirm Your Details</div>
                        :<div>Please Confirm Customer Details</div>

                    }
                        
                    </div>
                    {/* <div style={{ fontSize: 13, color: 'Gray' }}>
                        Navigation is enabled for editing purposes
                    </div> */}
                </div>
                {/* <Example data={this.state.Selfie} /> */}
                <div style={{marginLeft: 20}}>
                    <h5
                        style={{
                            color: '#f049ac',
                            textDecoration: 'underline',
                        }}
                    > {
                        this.state.agentNumber==null ||  this.state.agentNumber.trim().length==0?
                        <div>Your KYC Details</div>
                        :<div> Customer KYC Details</div>

                    }
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
                                            textAlign: 'left',
                                        }}
                                    >
                                        Full Name
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'left',
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
                                            textAlign: 'left',
                                        }}
                                    >
                                        Gender
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'left',
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
                                            textAlign: 'left',
                                        }}
                                    >
                                        Date of Birth
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'left',
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
                                            textAlign: 'left',
                                        }}
                                    >
                                        Document Type & Number
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'left',
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
                                            textAlign: 'left',
                                        }}
                                    >
                                        Contact Details
                                    </div>
                                }
                                secondary={
                                    <div
                                        style={{
                                            color: 'gray',
                                            textAlign: 'left',
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
                            textDecoration: 'underline'
                            , marginLeft: 20
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
                    style={{ marginLeft: -120, marginTop: 0, marginLeft: 20 }}
                />
                </div>
                
                <br></br>
                <br></br>
                <div style={{ marginTop: 220 }}>
                    <h5
                        style={{
                            color: '#f049ac',
                            textDecoration: 'underline', marginLeft: 20
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
                    style={{ marginTop: 0 }}
                />
                </div>
                
                <div style={{ marginTop: 160 }}>
                    <div style={{ color: '#f049ac', padding: 15 }}>
                    <h5
                                    style={{
                                            color: '#f049ac',
                                            textDecoration: 'underline'
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
                    style={{ marginTop: 0}}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    

                    {this.state.addressprooftype == "Consent"?
                    
                    <div>
                        <br></br>
                    <br></br>
                    <br></br>
                        <img
                    className="classid_b_succ"
                    src={`data:image/jpeg;base64,${localStorage.getItem('imgId10')}`}
                    alt="classid_b_succ"
                    height="160"
                    width="260"
                    style={{ marginTop: 0}}
                    />
                    <br></br>
                    <br></br>
                    </div>
                :null}
                    
                    
 
                    
                    {
                        this.state.UserType == "resident"?
                    
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                            <img
                    className="classid_b_succ"
                    src={`data:image/jpeg;base64,${localStorage.getItem('imgId8')}`}
                    alt="classid_xxxx_succ"
                    height="160"
                    width="260"
                    style={{   marginTop: 0 }}
                    />
                        </div>
                    
                    :null
                    } 
                <div>
                    
                </div>
                <br></br>
        <br></br>
        <br></br>
                    <hr></hr>
        
        <div style={{textAlign:'center'}}>
            <p>I declare that the information provided above are correct and I agree for the terms and conditions.</p>
                <input value="checked" type="checkbox" checked disabled /><span> I Agree </span>
                        <Link to="/terms">Terms&Conditions </Link><br></br>
                    </div>
                <div style={{textAlign:'center', marginTop:30}}>

                    { this.state.agentNumber==null?
                    <button
                    className="button_id"
                    onClick={this.myChangeHandler}
                    style={{
                        fontSize: 16,
                        width:150,
                    }}
                >
                     <Link className="link1" to="/conclude"
                     onClick={()=>{this.sendEmail();this.sendsms()}}
                     >
                        Submit
                    </Link>  
                    </button>
                    :<button
                    className="button_id"
                    onClick={this.myChangeHandler}
                    style={{
                        fontSize: 16,
                        width:150,
                        
                    }}
                >
                    <Link className="link1" to="/customer">
                        Save and Continue
                    </Link>
                 
                    

                </button>}
                    
                
                </div>
            </div>
        );
    }
}

export default Success;