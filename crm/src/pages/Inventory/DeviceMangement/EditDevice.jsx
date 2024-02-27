import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import { Label } from '@mui/icons-material';
import axios from "axios";
// import Notification from '../Components/Notification/Notification';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function EditDevice(){
    const navigate = useNavigate();

    const location = useLocation();   
    const selectObj = location.state && location.state.selectObj;
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });
    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({ ...notification, open: false });
    }


  
    const toDevicemanagement=()=>{
        navigate('/devicemanagement')
      }

      const tokenValue = localStorage.getItem('token');
      const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
        initialValues: {
           
            imei_primary: "",
            imei_list: "",
            user_agent: "",
            foot_print: '',
            eir_track_id: '',
            is_esim: '',
            is_uicc: '',
            registration_date: '',
            status: '',


        },

        onSubmit: async (values) => {
            // console.log(values);
            // setResult(values);
            const res = await axios.put('http://172.5.10.2:9696/api/device/mgmt/detail/update/' + selectObj.device_id,
                { ...values }, {
                headers: {
                    "Authorization": `Bearer +${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
            ).then(res => {
                console.log(res.status + "status code ")
                if (res.status === 200) {
                    toast.success('Device Record Updated Successfully', { autoClose: 2000 });
                }
                // location.reload();
            }).catch(err => {
                toast.error(err.response.data.message, { autoClose: 2000 });

            })


        }
    })
    useEffect(() => {
        if (selectObj) {
            setValues((prevValues) => ({
                ...prevValues,
                imei_primary: selectObj.imei_primary || '',
                imei_list: selectObj.imei_list || '',
                user_agent: selectObj.user_agent || '',
                foot_print: selectObj.foot_print || '',
                eir_track_id: selectObj.eir_track_id || '',
                is_esim: selectObj.is_esim || '',
                is_uicc: selectObj.is_uicc || '',
                registration_date: selectObj.registration_date || '',
                status: selectObj.status || '',
                
            }));
        }
    }, [selectObj]);

    return(
        <Box component="form"  >
             <ToastContainer position="bottom-left" />
              <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                  <Paper elevation={10} sx={{ padding: 1, paddingLeft: 3, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                      <Grid>
                          <Typography
                              style={{
  
                                  fontSize: '20px',
                                  paddingLeft: 15,
                                  fontWeight: 'bold',
                                  textAlign:'center'
  
                              }}
                          >Edit Device </Typography>
                      </Grid>
                  </Paper>
              </Box>
              <Snackbar
                  open={notification.open}
                  autoHideDuration={6000}
                  onClose={handleCloseNotification}
              >
                  <MuiAlert
                      elevation={6}
                      variant="filled"
                      onClose={handleCloseNotification}
                      severity={notification.severity}
                  >
                      {notification.message}
                  </MuiAlert>
              </Snackbar>
              <Paper elevation={15} sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                  <Box
                      sx={{
                          marginTop: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
  
                      }}
                  >
  
                      <Grid2 >
                          
                          <Grid 
                              container
                              spacing={6} // Adjust the spacing between items as needed
                              paddingBottom={2} // Padding for the entire container
                              paddingTop={2} // Padding for the entire container
                          >
                                  <Grid item lg={12} >
                                <Grid container spacing={2}>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="Primary IMEI"

                                            type='number'
                                            fullWidth
                                            required
                                            name='imei_primary'
                                            value={values.imei_primary}
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="IMEI List"
                                            type="text"
                                            fullWidth
                                            required
                                            name='imei_list'
                                            value={values.imei_list}
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="User Agent"
                                            type="number"
                                            fullWidth
                                            required
                                            name='user_agent'
                                            value={values.user_agent}
                                            onChange={handleChange}


                                        />
                                    </Grid>

                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Foot Print"
                                            type="text"
                                            fullWidth
                                            required
                                            name='foot_print'
                                            value={values.foot_print}
                                            onChange={handleChange}


                                        />
                                    </Grid>

                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="EIR Track ID"
                                            type="number"
                                            fullWidth
                                            required
                                            name='eir_track_id'
                                            value={values.eir_track_id}
                                            onChange={handleChange}


                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >e-SIM</InputLabel>
                                            <Select
                                                fullWidth
                                                label="e-SIM"
                                                name='is_esim'
                                                value={values.is_esim}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >UICC</InputLabel>
                                            <Select
                                                fullWidth
                                                label="UICC"
                                                required
                                                name='is_uicc'
                                                value={values.is_uicc}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Status</InputLabel>
                                            <Select
                                                fullWidth
                                                label="Status"
                                                name='status'
                                                value={values.status}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>Inactive</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item lg={4} md={4} sm={4} xs={6}>


                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            label="Registration Date"
                                            type="date"
                                            required
                                            fullWidth
                                            name='registration_date'
                                            value={values.registration_date}
                                            onChange={handleChange}
                                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                                        />

                                    </Grid>

                                </Grid>
                            </Grid>
                              
                          </Grid>
                      </Grid2>
  
                  </Box>
                  
                 
              </Paper>
              <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ paddingTop: 4, textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                  <Button
  
                      style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                      // onClick={submitMainForm2}
                      sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 15 }}
                      onClick={handleSubmit}
                  >
                      Update
                  </Button>
                  <Button
                      style={{ width: '100px', backgroundColor: '#FBB716', color: 'black', marginLeft:30 }}
                      // onClick={submitMainForm2}
                      sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                      onClick={toDevicemanagement}
                  >
                      Back
                  </Button>
                  
              </Grid>
  
  
          </Box>

    )
}