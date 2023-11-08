import React from 'react'
import { useState } from 'react';
import { Route, Navigate, Routes, useNavigate, redirect, useLocation } from 'react-router-dom';
import {createTheme,ThemeProvider } from "@mui/material/styles";
import { useFormik } from 'formik';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, NativeSelect, Select, FormControl } from "@mui/material";
import Grid from '@mui/material/Grid';
import axios from 'axios'
export default function SignIn() {

  const navigate=useNavigate();
  const [user, setUser] = useState({
      email: "",
      password: "",
      role: ""
  });

  
  

  
  const defaultTheme = createTheme();
  //     const handleSubmit = async (event) => {
  //         console.log(user.email+"----------------")
  //     event.preventDefault();
  //     await  axios.get('http://localhost:3000/users?'+"email="+user.email)
  //     .then(res => {
  //         setResult(res.data);
  //         console.log(...result+"email from response");
  //         console.log(result[0].id+"--------------");  
  //         console.log(result[0].email+"--------------");
  //         console.log(result[0].role+"--------------");  
  //         console.log(result[0].status+"--------------");
  //         const role=result[0].role;
  //         console.log(role+"role in new variable");

  //         console.log(result[0].email+" b email "+user.email+" user email "+result[0].status+" bk status "+result[0].role + " bk role "+user.role+"uer role");
  //         console.log(role+" role b y backedbnd "+user.role+"role defined by user");
  //         if(result[0].email===user.email && result[0].role===user.role && result[0].status=="true"){


  //             if(result[0].role=="customer_care"){
  //                 navigate("customer",{state:{result:result}});
  //             }
  //             if(result[0].role=="finance"){
  //                 console.log("this is from fiance");
  //             }
  //         }else{
  //             alert("something is wromng please check    "+result[0].name);
  //         }})
  //     // const data = new FormData(event.currentTarget);
  //     // console.log({
  //     //   email: data.get('email'),
  //     //   password: data.get('password'),
  //     // });
  //     console.log(user.email+"emil of user -------")
  //   };
  //   const handleChange=(e)=>{
  //     const name=e.target.name;


  //   }
  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
      initialValues: {
          email: "",
          password: "",
          role: "",
      },
      onSubmit: async (values) => {
          console.log(values);
         // const res = await axios.post('http://localhost:3000/users', values.email)
         // console.log(res);
          
      }
  })
  const [result, setResult] = useState();
  
  const getApi =async ()=>{
     await  axios.get('http://localhost:3000/users?'+"email="+values.email)
     .then(res=>{
      console.log(res+"--------------");
          setResult(res.data);
      
          console.log(...result);
          console.log(result[0].email+"mail by response");
          if(values.email==result[0].email && values.role==result[0].role && result[0].status=="true")
          {
              console.log("if condition is working ");
              navigate("/temp");
          }
          else{
              console.log("else consdition is working");
          }

     }).catch(err=>console.log(err));
  }



  return (
      // <div className="bg-image">
      //     <div className="cover">
      //        <div className="">
      //        <form onSubmit={handleSubmit}>
      //        <h1 className="login-heading">User Login</h1>
      //         <div className="">
      //         <input type="text" placeholder="username" name="name"
      //         className="input-field"
      //         value={user.email} 
      //         onChange={e=>setUser({...user,email:e.target.value})}
      //         />

      //         </div>
      //         <div className="">
      //         <input  type="text" placeholder="password"  name="password"
      //         onChange={e=>setUser({...user,password:e.target.value})}
      //         value={user.password}
      //         className="input-field"
      //         />
      //         </div >
      //         <h3 className="select-role"> Select Role Please</h3>
      //        <div className="p-10 rounded bg-red">
      //        <select className=""
      //         onChange={e=>setUser({...user,role:e.target.value})}
      //         >

      //         <option value="ROLES"> ROLES </option>
      //         <option value="finance"> Finance </option>
      //         <option value="customer_care"> Customer-care </option>
      //         <option value="NOC"> NOC </option>
      //         <option value="SUPER"> SUPER </option>
      //         <option value="ADMIN"> ADMIN </option>
      //        </select>
      //        </div>
      //        <button className="login-btn" onClick={handleSubmit}>
      //              Login
      //          </button> 
      //        </form>
      //        </div>
      //         {/* <button className="login-btn"
      //             onClick={()=>navigate('profile',{state:{data:user,select:select}})} 
      //         > Login </button> */}


      //     </div>
      //     </div>
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                  sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
              >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Login in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                      <TextField
                          // margin="normal"
                          label="email"
                          type="text"
                          required
                          fullWidth
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      <TextField
                          margin="normal"
                          label="password"
                          type="password"
                          required
                          fullWidth
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {/* <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                          /> check box for future puropse*/}

                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Role</InputLabel>
                          <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.role}
                              label="Age"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="role"
                          >
                              <MenuItem value={"customer_care"}>Customer Care</MenuItem>
                              <MenuItem value={"finance"}>Finance</MenuItem>
                              <MenuItem value={"admin"}>Admin</MenuItem>
                          </Select>
                      </FormControl>

                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          onClick={getApi}
                          sx={{ mt: 3, mb: 2 }}
                      >
                          Sign In
                      </Button>


                      <Grid container>
                          <Grid item xs>
                              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
                          </Grid>
                          <Grid item>
                              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
                          </Grid>
                      </Grid>
                  </Box>
              </Box>

          </Container>
      </ThemeProvider>
  )
}
