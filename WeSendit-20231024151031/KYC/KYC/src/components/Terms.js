import react,{ useState } from "react"
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Terms.css'
import './style.scss';
import Bottomstrip from "./Bottomstrip";

export default function Terms(){

    return(
        <div className="Auth-container" >
            <div>
            <h3 style={{textAlign:'center',margin:5}}>MAHANAGAR TELEPHONE (MAURITIUS) LTD</h3>
            <label style={{fontWeight:900,textAlign:'center',margin:5}}>Terms & Conditions for GSM Voice, Data and ILD Services</label>
            <p>An agreement is formed between the Customer named overleaf hereinafter referred to as the ‘Client’ and Mahanagar Telephone 
                (Mauritius) Ltd (MTML) hereinafter referred to as ‘Supplier’ situated at 63, Cybercity, Ebene when the form overleaf or some
                 other form or order (eg mail order, Fax etc) has been signed/sent by or on behalf of the customer and SUPPLIER has accepted
                  the same, when used in these conditions.</p>

            <p> The Supplier will make available and provide access to its Services as chosen by the Client at the current price. 
                Client will pay SUPPLIER for the services provided at the specified rates or rates as may be published from time to time.
                 Client may purchase any compatible device for using the service.For availing certain services, the supplier reserves the
                  right to provide the device and customer premises equipment. In case some installation is to be done by Supplier at Clients
                   location, the client agrees to provide access to the place of installation to the Supplier or supplier’s appointed 
                   contractors upon presentation of the necessary identification documents for inspection, installation, maintenance and any
                    other related work as may be required.</p>
                    <br></br>

            <label style={{fontWeight:900,textAlign:'center'}}>Terms & Conditions for GSM Voice, Data and ILD Services</label>

            <p>The client can change the tariff plans anytime in future, as per the applicable charges.</p>

            <label style={{fontWeight:900,textAlign:'start'}}> Services:</label>

            <p>Mobile Voice and Data/Internet service can be availed by using Suppliers SIM card in compatible handset. International Long
                 Distance (ILD) Service: The client can subscribe this service and use it from any network operator’s phone by dialling
                  access code ‘060’.</p>

             <label style={{fontWeight:900,textAlign:'start'}}> terms of Use:</label> 

             <p><label style={{fontWeight:900,textAlign:'start'}}>1.Calling Rates:</label> The Client agrees to pay the supplier for the
              services provided at the current rates. The price schedule may change and it will be applicable as from the release date. 
              Rates are exclusive of VAT, which is chargeable at the local rate or any other rate as may be approved by the appropriate 
              authority. The applicable rate/tariff can be checked by dialling customer support (8960) or from MTML CHiLi website www.chili.mu</p>

                <p><label style={{fontWeight:900,textAlign:'start'}}>2.Billing & Payments:</label> In the case Postpaid services,
                 the bills will be sent by Post or electronically on email and are payable on a monthly basis by Direct Debit/cash/Cheque. 
                 In case of non payment on or before due date of the invoice, the supplier reserves the right to disconnect or suspend the 
                 service without notice or prejudice whatsoever. Late payment will result in a surcharge of 10% of the bill. Payments recovered
                  through legal proceedings after disconnection of service will entail the amount due, financial charges calculated at 2% above
                   the prevailing lending rate as published by the Bank of Mauritius and any legal cost involved.</p>

                   <p><label style={{fontWeight:900,textAlign:'start'}}>3.Effectiveness:</label>This agreement remains in effect from the date
                    of signing till the services are availed by the Client. The client can terminate any or all the services subscribed by him 
                    at any time he wishes, by giving a written request to any of customer care centres of SUPPLIER, surrendering the phone / data 
                    devices, if provided by SUPPLIER on rent for availing the service and clearing all dues till date.</p>

                    <p><label style={{fontWeight:900,textAlign:'start'}}>4.Third Party Claims:</label> The Supplier shall not be held 
                    responsible for any third party claim that may arise from client’s use of its service(s).</p>

                    <p><label style={{fontWeight:900,textAlign:'start'}}>5.Dispute Resolution:</label>The Supplier’s customer care service
                    (Tel 8960) is available to answer Client’s questions/queries and resolve problems to the best of its capacity.
                     In the event that the Client does not get satisfactory reply to his queries, latter may ask for or write to the SUPPLIER’s
                     Customer Care Unit at 63, Cyber City Ebene. When a complaint is made the supplier will make an investigation and the 
                     results will be reported to the client. </p>

                    <p><label style={{fontWeight:900,textAlign:'start'}}>6.Security Deposit:</label> The Client is requested to make a 
                    refundable deposit as mentioned in the tariff. On termination of the service, the security deposit will be refunded by
                     MTML Head office after deducting any outstanding amounts due from the use of telecommunication services provided by 
                     SUPPLIER.</p>

                    <label style={{fontWeight:900,textAlign:'start'}}>7.Documents to be submitted along with application:</label>

                    <p><label style={{fontWeight:900,textAlign:'start'}}>a)Resident Mauritius Citizen:</label>
                    (i) Copy of National Identity Card or copy of the personal details of passport (ii)Proof of address copy of recent Utility
                     Bill (electricity bill / telephone bill/water bill) or any other proof of address.</p>

                     <p><label style={{fontWeight:900,textAlign:'start'}}>b)Non-Citizen Mauritius Resident- :</label>
                     (i) Copy of personal details of passport (ii) Unique Identification No (iii) Copy of Residential
                      permit or occupation permit(iv) Copy of address proof recent utility bill or any other proof of address.</p>

                      <p><label style={{fontWeight:900,textAlign:'start'}}>c)Tourist in Mauritius - :</label>
                      (i) Copy of personal details of passport or any other valid travel document 
                      (ii) Copy of proof of address in Mauritius (iii) Copy of Visa (wherever applicable).</p>

                      <label style={{fontWeight:900,textAlign:'start'}}>d)On Behalf of Tourist -</label>
                      <p><label style={{fontWeight:900,textAlign:'start'}}> (A)</label>(i) Copy of National Identity Card or copy of the personal details of passport 
                       (iii) Copy of tourist enterprise license or tourist accommodation certificate. 
                       In case of Individual Copy of Business Registration No., in case of Company certificate of incorporation
                        (iv) copy of registered address proof. (v) Copy of authorization letter for representative collecting on behalf of
                         company<br></br><label style={{fontWeight:900,textAlign:'start'}}>B)</label>  Tourist details – i) Colour photo,
                          ii) Copy of personal details of passport, iii) Copy of Visa (where applicable)</p>

                          <label style={{fontWeight:900,textAlign:'start'}}>e)M2M SIM by Public Body/Corporate Body/Company – </label>
                          <p><label style={{fontWeight:900,textAlign:'start'}}> (A)</label>i) Copy of certificate of incorporation, 
                          ii) Copy of registered address proof.<br></br><label style={{fontWeight:900,textAlign:'start'}}> (B) </label>
                          Representative details – i) Colour photo, ii) copy of his National Identity card or personal details in passport, 
                          iii) copy of authorization letter.</p>

                          <label style={{fontWeight:900,textAlign:'start'}}>f)SIM other than M2M SIM on behalf of Public body/Corporate Body/Company  – </label>
                          <p><label style={{fontWeight:900,textAlign:'start'}}> (A)</label>i) Copy of certificate of incorporation
                           ii) Copy of registered address proof.<br></br><label style={{fontWeight:900,textAlign:'start'}}> (B) </label>
                           Representative details – i) Colour photo, ii) copy of his National Identity card or personal details in passport,
                            iii) copy of authorization letter.</p>

                            <p>
                            8.	Coloured Photograph will be taken and verified against i) National Identity card Photo retrieved from relevant 
                            public body data base for Mauritius Citizen ii) photo from the passport or such other identification document where
                             the person is non-citizen of Mauritius. The present agreement shall be subject to the ICTA Regulations and other
                              laws and regulation related to provision of telephone service / SIM in Mauritius from time to time.
                            </p>

                            <p><label style={{fontWeight:900,textAlign:'start'}}>9.	Credit Limits:</label>:
                             In the case of postpaid services, at the time of registration of service initial credit limit of Rs 500/- will be
                              given against minimum security deposit of Rs 500/-. Clients requiring more than Rs 500/- credit will be required 
                              to make security deposit for the additional credit required. It may be noted that on crossing the credit limit,
                               clients will not be able to make further calls/use internet till payments are made. It may be noted that the 
                               credit limit provided is just to help the client to monitor his usage and calls made/data used in excess of the
                                credit limit prescribed shall be payable by the client. </p>

                            <p>10.	For the Prepaid SUPPLIER will activate the Mobile Telephone Services/ Data services to the Client with a
                             telephone number for the use through the SUPPLIER network with a ‘Pre-paid Account’ with the value defined in the 
                             package to make calls/ use data through the MTML System. Subsequently, the Client shall purchase MTML prepaid 
                             Recharge/scratch cards to enable him to top-up his Prepaid Account’. This Service allows the holder of an MTML 
                             Prepaid Mobile Phone to make and receive national and international calls. </p>

                             <p>
                             11.The International Services (ILD) through MTML ‘060’ will be charged as per the ILD rate approved by the ICT 
                             authority and will be debited from the client’s prepaid account or billed to postpaid account, as the case may be.
                             </p>

                             <p>
                             12.SUPPLIER also offers various value Added Services (VAS) for use by Clients. Value Added Services will be
                              provided upon the Client’s request and SUPPLIER’s acceptance. A fee or fees shall be payable for this, apart from
                               the normal Voice/ SMS/ data charges as used for accessing these services.
                             </p>

                             <p>
                             13.The Client agrees to SUPPLIER deducting any fee or charges which may occur in the provision of the Service, 
                             as well as the charges for calls in accordance with the tariff charged for the Service including calls and the 
                             fees or charges for the Value Added Services at the rates established by SUPPLIER and that the Prepaid Account
                             shall then be debited of the amount of the aforesaid fee or charges. SUPPLIER reserves the right to change the
                             terms, conditions, and provisions under which Service is offered, including but not limited to variation of
                             any or all of its charges/tariffs and charging mechanisms for the Services, by giving reasonable prior notice
                             wherever possible to Clients and by publishing an amended tariffs at the main place of business of MTML or 
                             which shall be available at such other place or published by the means of such other medium as may be 
                             decided by SUPPLIER from time to time. Such amendments and/or variations shall have immediate effect and this agreement shall be amended and/or varied accordingly.
                             </p>

                             <p>
                             14.For topping-up the Pre-paid Account, the Prepaid Recharge/Scratch Card shall be available in and be valid 
                             for different values corresponding to the respective validity periods intimated on the cards for use on the 
                             MTML network within the validity period. While topping up, the relevant validity period of the account will 
                             be intimated. On the expiry of the validity period of the account or if the balance of the account is fully 
                             used whichever occurs first, the account shall become suspended. Any unused amount shall be carried forward 
                             upon recharge (top-up) within a specific period of time as may be determined by SUPPLIER from time to time.
                             </p>

                             <p>
                             15.The Client may check his prepaid account credit by dialling *222# and no printed bill will be issued to the Client.
                             </p>

                             <p>
                             16.Once the validity period of the Prepaid account has expired and the Client does not recharge the Client equipment
                             with a new Prepaid Recharge/Scratch Card within the prescribed period as specified by SUPPLIER, the Mobile Phone/Data
                             services shall become deactivated and shall be disconnected from the system by SUPPLIER. SUPPLIER is not bound to give
                             any further notice whatsoever to the initial Client and may reassign the deactivated number to any Client.
                             </p>

                             <p>
                             17.SUPPLIER may at any time and from time to time, due to any illegal use/ misuse of services by client, modify or
                              discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice if SUPPLIER 
                              considers such modification, discontinuation desirable, in which event, SUPPLIER shall not be liable for any loss
                              for inconvenience to the Client or to any third party resulting there from SUPPLIER shall not incur any liability
                              by reason of the suspension or the termination of the Service, thereof.
                             </p>

                             <p>
                             18.SUPPLIER shall not be liable for any loss or damage which may be occasioned through any interruption or loss of
                              the Service from any cause whatsoever including but not limited to lack of coverage.
                             </p>

                             <p>
                             19.SUPPLIER shall not be liable to the Client or any third party with respect to any action taken or omitted to be 
                             taken by SUPPLIER in connection with or arising out of this agreement. SUPPLIER shall not be liable to the Client
                             or any third party for indirect or unforeseeable losses SUPPLIER shall in no event be liable to third parties for
                             the execution of the Service.
                             </p>

                             <p>
                             20.SUPPLIER shall not be liable for loss, damage to health and/or property or otherwise through use of mobile cellular phones.
                             </p>

                             <p>
                             21.Under no circumstances shall the liability of SUPPLIER exceed the aggregate value of the Client Equipment if 
                             provided by SUPPLIER and any amount remaining on the active prepaid account provided by SUPPLIER.
                             </p>

                             <p>
                             22.SUPPLIER reserves the right to disclose any information of the Client and the details of the service provided to
                              the relevant authorities upon production of a court or government order.
                             </p>

                             <p>
                             23.MTML and/or its Suppliers make no representations about the suitability, reliability, availability, timeliness,
                              quality, variety, speed and accuracy of the information, products and Services. All such information, products and
                              Service are provided “AS IS” without warranty of any kind. MTML and/or its Suppliers hereby disclaim all warranties
                              and conditions with regard to the information, products and services. Notwithstanding to the foregoing. 
                              MTML will use its best endeavours to update or cause to make changes regularly. Such information or Service shall
                              however not be relied upon for personal, legal or financial decisions. MTML or its Suppliers shall not be liable 
                              for any loss whatsoever as a result of reliance placed on the aforesaid information or Service.
                             </p>

                             <p>
                             24.SUPPLIER does not make any warranty on the availability of complete array of Services provided by SUPPLIER to the
                              Client using Client Equipment not directly purchased from the SUPPLIER.
                             </p>

                             <p>
                             25.The Client hereby undertakes 
                             </p>
                             <p>(a)	to ensure that the service is not used for any unlawful purposes.</p>
                             <p>(b)	to ensure that the Client Equipment is lawfully possessed and does not contravene any law or regulation.</p>
                             <p>
                                (c)	to ensure that the service is not used at any time so as to cause irritation, annoyance, embarrassment,
                                 harassment, or nuisance of any kind whatsoever to others.
                            </p>

                            <p>
                            26.The Client (hereinafter called the Transferor) may transfer his subscription to another party (hereinafter called
                             the transferee) by informing MTML in writing AND ensuring that the transferee registers himself to the service and
                             submits the required documents and due verification as per guidelines from time to time. Until such time that the
                             above conditions are not met, it is deemed that the transfer is not effective and the transferor is still liable
                             for the service.
                            </p>

                            <p>
                                27.	The construction, validity and performance of this agreement shall be governed by the laws of the Republic of
                                Mauritius, and the parties irrevocably submit to the exclusive jurisdiction of the Mauritian courts for the purpose
                                of enforcing any claim arising hereunder.
                            </p> 

                            <p>
                                28.	SUPPLIER reserves the right to alter the number of any Client at any time without being liable for any loss, 
                                damage or inconvenience or otherwise attributable to the change of the telephone number whatever may be the cause
                                of the change.
                            </p>  

                            <p>
                                29.	SUPPLIER reserves the right to close or modify any service/plan as per the guidelines of ICTA without assigning
                                any reason thereof to the client.
                            </p>

                            <p>
                                30.	SUPPLIER Complies to Data Privacy as per The Data Protection Act 2017 of Mauritius.
                            </p>                        
            </div>
            <div style={{textAlign:"center"}}>
                         <Link to="/success"><button  className="button_id"style={{fontSize: 16, width: 120,}}>Back </button></Link> 
            </div>         
        </div>
    )
}