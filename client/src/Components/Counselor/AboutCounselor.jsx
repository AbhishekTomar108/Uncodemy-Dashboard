import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MessageIcon from '@mui/icons-material/Message';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Header from '../Header';
import { StudentContext } from '../../context/StudentState';
import Cslidebar from './Cslidebar';

export default function AboutCounselor() {
  let ContextValue = useContext(StudentContext);

  document.title = "StudentDashboard - Admin panel"

  const {id} = useParams

useEffect(()=>{
    getCounsellor(id)
},[])

  const navigation = useNavigate()

  const [allStudent, setAllStudent] = useState()
  const [totalStudent, setTotalStudent] = useState()
  const [newStudent, setNewStudent] = useState()
  const [pastSevenStudent, setPastSevenStudent] = useState()
  const [processBar, setProcessBar] = useState()
  // const [searchQuery, setSearchQuery] = useState();
  const [allStudentData, setAllStudentData] = useState()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(20)
  const [totalItem, setTotalItem] = useState()
  const [currentTrainer, setCurrentTrainer] = useState()
  const [user, setUser] = useState("student")
  const [currentStudent, setCurrentStudent] = useState()
  const [counselor, setCounselor] = useState()



  //All Trainer
  let tempCurrentStudent;
  const [getuserdata, setUserdata] = useState("");

  const getCounsellor =async(id)=>{
    console.log('get counseolor')
    try {
      const status = await ContextValue.checkCounsellor(id);
      
            console.log('status of counselor =', status);
           setCounselor(status.userIndividual)
           getCounselorStudent(status.data.Name)

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const getCounselorStudent = async(counselorName)=>{
    let CounselorStudent = await fetch(`http://localhost:8000/counselorStudent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "CounselorName":counselorName
        }
      });
      CounselorStudent = await CounselorStudent.json()
      setCurrentStudent(CounselorStudent.counselorStudent)
      console.log("student counselor =",CounselorStudent)
    }

  const showMessagedialog = async (id) => {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })

    if (text) {
      Swal.fire(text)
    }

    let checkId = [{ id }]

    console.log('value of swal =', text, checkId)
    let sendData = await fetch('http://localhost:8000/sendmessage', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, checkid: checkId, from: "Counselor" })
    })

    let fetchData = await sendData.json();
    console.log("data = ", fetchData)
  }
  const getdata = async (counselorName) => {

    let studentData = await fetch('http://localhost:8000/getStudentByCounselor', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Counselor: counselorName })
    })

    studentData = await studentData.json()
    setAllStudent(studentData)
    console.log('student data =', studentData)
    localStorage.setItem('couselorStudent',JSON.stringify(studentData))

    // total student new student
    let total = 66;
    let newjoin = 7;
    let currentMonthStudent = 0;
    let pastMonthStudent = 0;
    let pastSevenDaysStudent = 0;


    setTotalStudent(total)
    setNewStudent(newjoin)
    setPastSevenStudent(pastSevenDaysStudent)
    console.log('current student =', currentMonthStudent)
    console.log('past seven days =', pastSevenDaysStudent)
    console.log('past month =', pastMonthStudent)

    setProcessBar(parseInt(((currentMonthStudent - pastMonthStudent) / pastMonthStudent) * 100))
    setPastSevenStudent(parseInt(((pastSevenDaysStudent - currentMonthStudent) / pastSevenDaysStudent) * 100))
    let processBar = ((currentMonthStudent - pastMonthStudent) / pastMonthStudent) * 100;
    console.log('process bar =', processBar)


      setAllStudent(studentData)
      setAllStudentData(studentData)
      setCurrentStudent(studentData)



  }

  //sweetalert


  //Delete student 
  const deleteuser = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/deleteuser/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }

        }).then(response => {

          const deletedata = response.json();

          if (deletedata.status === 422 || !deletedata) {
            console.log("error");
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          else {
            console.log("user deleted", deletedata);
            // setDLTdata(deletedata)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            getdata("Anam");
          }
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          });

        })
      }
    })

  }

  //search
  const fetchQueryData = (Query) => {
    console.log('fetch query =', Query)

    let filterQueryData = allStudentData.filter(data => {
      console.log('data name =', data, data.Name, Query)
      return data.Name.toLowerCase().includes(Query.toLowerCase())
    })
    console.log('filter query - ', filterQueryData)
    setCurrentStudent(filterQueryData)
  }

  const badgeStatus = {
    pending: "warning",
    backout: "dark",
    deactive: "danger",
    active: "success"
  }

  return (

    <>

      <Header/>
      
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card bg-primary">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-users" />
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">Total Students</p>
                      <h3 className="text-white">{totalStudent ? totalStudent : ""}</h3>
                      <div className="progress mb-2 bg-white">
                        <div
                          className={`progress-bar progress-animated ${processBar >= 0 ? "bg-light" : "bg-danger"}`}
                          style={{ width: `${processBar >= 0 ? processBar : 100 + processBar}%` }}
                        />
                      </div>
                      <small>{processBar >= 0 ? `${processBar}% Increase` : `${(-processBar)}% Decrease`} in 20 Days</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card bg-warning">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-user" />
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">New Students</p>
                      <h3 className="text-white">{newStudent ? newStudent : ""}</h3>
                      <div className="progress mb-2 bg-white">
                        <div
                          className={`progress-bar progress-animated ${pastSevenStudent >= 0 ? "bg-light" : "bg-danger"}`}
                          style={{ width: `${pastSevenStudent >= 0 ? pastSevenStudent : 100 + pastSevenStudent}%` }}


                        />
                      </div>
                      <small>{pastSevenStudent >= 0 ? `${pastSevenStudent}% Increase` : `${(-pastSevenStudent)}% Decrease`} in past 7 Days</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card bg-secondary">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-graduation-cap" />
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">Total Course</p>
                      <h3 className="text-white">28</h3>
                      <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "76%" }}
                        />
                      </div>
                      <small>76% Increase in 20 Days</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-3 col-sm-6">
              <div className="widget-stat card bg-danger">
                <div className="card-body">
                  <div className="media">
                    <span className="mr-3">
                      <i className="la la-dollar" />
                    </span>
                    <div className="media-body text-white">
                      <p className="mb-1">Fees Collection</p>
                      <h3 className="text-white">50000</h3>
                      <div className="progress mb-2 bg-white">
                        <div
                          className="progress-bar progress-animated bg-light"
                          style={{ width: "30%" }}
                        />
                      </div>
                      <small>30% Increase in 30 Days</small>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            {user === "student" && <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Student List</h4>
                </div>
                <div class="d-flex" role="search">
                  <input class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name='search'
                    onChange={(e) => fetchQueryData(e.target.value)}
                  />
                  {/* <button class="btn btn-outline-dark" type="submit" onClick={fetchQueryData}>Search</button> */}

                </div>
                <div className="card-body">
                  <div className="table-responsive recentOrderTable">
                    <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Name</th>
                          <th scope="col">Assigned Professor</th>
                          <th scope="col">Date Of Admit</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Fees</th>
                          <th scope="col">Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStudent && currentStudent.map((data, index) => {

                          index = start + index;

                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{data.Name}</td>
                              <td>{data.TrainerName}</td>
                              <td>{data.JoiningDate}</td>
                             
                              <td>{data.Course}</td>
                              <td>{data.Fees}</td>
                              <td className='nav-link'>
                                {/* <button className="btn btn-success"> <NavLink to={`/Aboutstudent/${data._id}`}> <RemoveRedEyeIcon /></NavLink></button>
                                <button className="btn btn-primary"> <NavLink to={`/EditStudents/${data._id}`}> <CreateIcon /></NavLink></button> */}
                                <button className="btn btn-danger" onClick={() => deleteuser(data._id)}><DeleteOutlineIcon /></button>
                                <button className="btn btn-warning text-light" onClick={() => showMessagedialog(data._id)}><MessageIcon /></button>
                                {/* <button className="btn btn-danger"><NavLink to={`/student/${data._id}/fullattendance`}><i class="fa-solid fa-clipboard-user text-light"></i></NavLink></button> */}
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
            </div>}

            {user === "trainer" &&
              <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Trainer List</h4>
                  </div>
                  <div class="d-flex" role="search">
                    <input class="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      name='search'
                      onChange={(e) => fetchQueryData(e.target.value)}
                    />
                    {/* <button class="btn btn-outline-dark" type="submit" onClick={fetchQueryData}>Search</button> */}
                  </div>
                  <div className="card-body">
                    <div className="table-responsive recentOrderTable">
                      <table className="table verticle-middle table-responsive-md">

                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>


                          </tr>
                        </thead>
                        <tbody>
                          {currentTrainer && currentTrainer.map((Trainerdata, index) => {



                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{Trainerdata.Name}</td>
                                <td>{Trainerdata.Number}</td>
                                <td>{Trainerdata.Email}</td>
                                <td>{Trainerdata.Address}</td>
                                <td>
                                  <NavLink to={`/trainer/${Trainerdata._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                  <NavLink to={`/EditStudents/${Trainerdata._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                  <button className="btn btn-danger" onClick={() => deleteuser(Trainerdata._id)}><DeleteOutlineIcon /></button>
                                  <button className="btn btn-warning text-light" onClick={() => showMessagedialog(Trainerdata._id)}><MessageIcon /></button>
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
            }

            {/* <div className='right-left-arrow'>
            <i class="fa-solid fa-left-long" onClick={backItem}></i>
            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
            </div> */}

          </div>
        </div>
      </div>




      
    </>

  )
}
