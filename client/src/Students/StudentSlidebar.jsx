import React from 'react'
import { Link, useParams } from 'react-router-dom';



export default function StudentSlidebar() {

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



                            <Link className="has-arrow" to={`/student`}>Student Dashboard</Link>


                        </li>
                        <li>
                            <Link className="has-arrow" to={`/student/SendMessage`}> Message</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to="/student/StudentAssig"> Assignment</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to={`/student/fullattendance`}> Full Attendance</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to="/SendMessage"> Links</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to="/SendMessage"> Log Out</Link>
                        </li>

                    </ul>
                </div>
            </div>


        </>





    )
}