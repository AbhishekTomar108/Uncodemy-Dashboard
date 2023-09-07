import React, { useEffect, useContext, useState } from 'react'
import { StudentContext } from '../../context/StudentState';
import Cslidebar from './Cslidebar'
import Header from '../Header';

// import Home from '../Components/Home'
// import Header from '../Components/Header'

export default function AllStudents() {
  let ContextValue = useContext(StudentContext);
  document.title = "StudentDashboard - All Student"

  const [allStudent, setAllStudent] = useState()

  useEffect(() => {
    getdata()
  }, [])

  

  const getdata = async (id) => {

    let studentData = await fetch('http://localhost:8000/getStudentByCounselor', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CounselorID : id })
    })

    studentData = await studentData.json()
    console.log("student",studentData)
    setAllStudent(studentData)
    localStorage.setItem('couselorStudent',JSON.stringify(studentData))
    

  }

  return (

    <>

      <Header />
      <Cslidebar />

      <div className="content-body" style={{ minWidth: "876px" }}>
        {/* row */}
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>All Student</h4>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row tab-content">
                <div id="list-view" className="tab-pane fade active show col-lg-12">
                  <div className="card">
                    <div class="container">
                      <div class="row">
                        <div class="col-md-12">
                          <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Trainer</th>
                                <th>Admission</th>
                                <th>course</th>
                                <th>Fees</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allStudent && allStudent.map((data, index) => {

                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{data.Name}</td>
                                    <td>{data.TrainerName}</td>
                                    <td>{data.JoiningDate}</td>
                                    <td>{data.Course}</td>
                                    <td>{data.Fees}</td>
                                    <td>
                                      <a
                                        href=""
                                        className="btn btn-sm btn-primary"
                                      >
                                        <i className="la la-pencil" />
                                      </a>
                                    </td>
                                    <td>
                                      <a
                                        href="#"
                                        className="btn btn-sm btn-danger"
                                      >
                                        <i className="la la-trash-o" />
                                      </a>
                                    </td>

                                  </tr>
                                )
                              })
                              }

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
