import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { Grid } from '@mui/material';
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(2),
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))
 export default function Popup(props){
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} classes={{ paper: classes.dialogWrapper }}  >
            <DialogTitle style={{backgroundColor:'#8FE5FF', border:20}} >
                <Grid style={{ display: 'flex' }} lg={12}>
                   
                   <Typography variant="h6" component="div" style={{ flexGrow: 1 ,textAlign:'center', color:'white'}} >
                    {title}
                   </Typography>
                   <Grid
                   color='secondary'
                   onClick={()=>{setOpenPopup(false)}}
                   >
                    <CloseIcon/>

                   </Grid>

                </Grid>
            </DialogTitle>
            <DialogContent dividers>
               {children}
            </DialogContent>
        </Dialog>
    
    );
    
 }