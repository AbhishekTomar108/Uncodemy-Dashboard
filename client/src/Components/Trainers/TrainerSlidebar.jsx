import React from 'react'
import { Link, useParams } from 'react-router-dom';
import "./AboutTrainer"



export default function TrainerSlidebar() {

    const { id } = useParams()

    return (

        <>
            {/***********************************
      Sidebar start
  ************************************/}
            <div className="dlabnav">
                <div className="dlabnav-scroll">
                    <ul className="metismenu" id="menu">
                        {/* <li className="nav-label first">Main Menu</li> */}
                        <li>



                            <Link className="has-arrow" to={`/trainer`}>Trainer Dashboard</Link>


                        </li>
                        <li>
                            <Link className="has-arrow" to={`/trainer/TrainerMessage`}> Message</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to={`/trainer/assignment`}> Assignment</Link>
                        </li>                      
                        <li>
                            <Link className="has-arrow" to={`/trainer/demooverview`}> Demo</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to="/trainer/SendMessage"> Log Out</Link>
                        </li>

                    </ul>
                </div>
            </div>


        </>





    )
}