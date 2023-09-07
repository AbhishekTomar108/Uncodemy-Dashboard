import React from 'react'
import { Link, useParams } from 'react-router-dom';



export default function Cslidebar() {

    const { id } = useParams()

    return (

        <>

            <div className="dlabnav">
                <div className="dlabnav-scroll">
                    <ul className="metismenu" id="menu">
                        <li className="nav-label first">Main Menu</li>
                        <li>
                            <Link className="has-arrow" to={`/counsellor`}> Dashboard</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to={`/counselor/SendMessage`}>Send Message</Link>
                        </li>
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                <i className="la la-users" />
                                <span className="nav-text">Students</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <Link to="/counselor/AllStudents">All Students</Link>
                                    {/* <a href="AllStudents.jsx">All Students</a> */}
                                </li>
                                <li>
                                    <Link to="/counselor/AddStudents">Add Students</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                <i className="la la-users" />
                                <span className="nav-text">Register Student</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <Link to="/counselor/RegisterStudentAdd">Register Student Add</Link>
                                    {/* <a href="AllStudents.jsx">All Students</a> */}
                                </li>
                                <li>
                                    <Link to="/counselor/RegisteredStudent">Register Student Table</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to={`/counselor/Demo`}> <span className="nav-text">Demo</span></Link>


                        </li>
                        <li>
                            <Link to={`/counselor/demooverview`}> <span className="nav-text">Overview Demo</span></Link>
                        </li>

                    </ul>
                </div>
            </div>

        </>

    )
}
