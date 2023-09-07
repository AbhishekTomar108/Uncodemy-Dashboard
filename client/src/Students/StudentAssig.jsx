import React, { useState } from 'react'
import Header from '../Components/Header'
import AssignmnetStatus from './AssignmnetStatus'
import Assignment from './Assignment'
import VideoAssignment from './VideoAssignment'
import StudentSlidebar from './StudentSlidebar'


function StudentAssig() {

    const [status, setStatus] = useState("Assignment")
    const [assignment, setAssignment] = useState("pending")
    return (
        <>
            <Header />
              
      <div className='sidebar-main-container'>
<StudentSlidebar/>
            <div className="Assignment-section">
                <div className='dashboard-navigation-section'>

                    <h4 onClick={e => setStatus("Assignment")}>Assignment</h4>
                    <h4 onClick={e => setStatus("Video")}>Video</h4>
                </div>
                {status === "Assignment" && <div>
                    <ul className="nav nav-tabs" >
                        <li className="nav-item" >
                            <a
                                onClick={e => setAssignment("pending")}
                                data-toggle="tab"
                                className="nav-link active show"
                            >
                                Pending Assignment
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                onClick={e => setAssignment("submitted")}
                                data-toggle="tab"
                                className="nav-link"
                            >
                                Submitted Assignment
                            </a>
                        </li>
                    </ul>


                    {assignment === "pending" ? <Assignment />
                        : <AssignmnetStatus />}
                </div>
                }
                {status === "Video" && <VideoAssignment/>}
            </div>
            </div>
        </>
    )
}

export default StudentAssig