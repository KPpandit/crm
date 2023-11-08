
import react,{ useState } from "react"
import React, { Component } from 'react';
import { ExternalLink } from 'react-external-link';

import './Bottomstrip.css'

export default function Bottomstrip(){

    return(
            <div className = "footer ">
               <ExternalLink href="https://www.chili.mu/"  style={{textAlign:'center'}}>
                                <span className="txt" >https://www.chili.mu</span>
                </ExternalLink>
            </div>
    )

}