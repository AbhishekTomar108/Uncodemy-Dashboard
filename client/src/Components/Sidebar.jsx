import React from 'react'
import { Link, useParams } from 'react-router-dom';



export default function Sidebar() {

  const { id } = useParams()

  return (

    <>
      {/***********************************
      Sidebar start
  ************************************/}
      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>
            <li>



              <Link className="has-arrow" to={`/admin`}>Admin Dashboard</Link>


            </li>
            <li>
              <Link className="has-arrow" to={`/admin/SendMessage`}>Send Message</Link>
            </li>

            <li>
              <a
                className="has-arrow"
                href="#"
                aria-expanded="false"
              >
                <span className="nav-text">Students</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to="/admin/AllStudents">All Students</Link>
                  {/* <a href="AllStudents.jsx">All Students</a> */}
                </li>
                <li>
                  <Link to="/admin/AddStudents">Add Students</Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                className="has-arrow"
                href="#"
                aria-expanded="false"
              >
                <span className="nav-text">Trainers</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to="/AllTrainer">All Trainer</Link>
                  
                </li>
                <li>
                  <Link to="/AddTrainer">Add Trainer</Link>
                </li>

              </ul>
            </li>

            <li>
              
                <Link to={`/admin/attendenceSheet`}> <span className="nav-text">Attendance</span></Link>
            

            </li>
            <li>
              <a
                className="has-arrow"
                href="#"
                aria-expanded="false"
              >
                <span className="nav-text">Register Student</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to="/RegisterStudentAdd">Register Student Add</Link>
                  {/* <a href="AllStudents.jsx">All Students</a> */}
                </li>
                <li>
                  <Link to="/RegisteredStudent">Register Student Table</Link>
                </li>
              </ul>
            </li>
            <li>

                <Link to={`/admin/New-Batch`}> <span className="nav-text">New Batch</span></Link>
              

            </li>
            <li>
              <Link to={`/admin/Running-batches`}> <span className="nav-text">Running Batches</span></Link>
            </li>

            <li>
              <a
                className="has-arrow"
                href="#"
                aria-expanded="false"
              >
                <span className="nav-text">Fees</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to="/FeesTable">Fees Table</Link>

                </li>
                <li>
                  <Link to="/AddFees">Add Fees</Link>

                </li>
                <li>
                  <Link to="/FeeRecipt">Fees Receipt</Link>

                </li>
                <li>
                  <Link to="/DemoSidebar">Demo Sidebar</Link>

                </li>
                {/* <li>
                  <Link to="/FeesReceipt">Fees Receipt</Link>

                </li> */}
              </ul>
            </li>

            {/* ..............................Counselor ......................................................*/}

            <li>
              <a
                className="has-arrow"
                href="#"
                aria-expanded="false"
              >
                <span className="nav-text">Counsellor</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to="/admin/AllCounselor">All Counsellor</Link>
                  {/* <a href="AllStudents.jsx">All Students</a> */}
                </li>
                <li>
                  <Link to="/admin/AddCounselor">Add Counsellor</Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
      {/***********************************
      Sidebar end
*/}
    </>





  )
}
