import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import TrainerSlidebar from './TrainerSlidebar'
import Header from '../Header'
import { StudentContext } from '../../context/StudentState'


export default function AboutTrainer() {

  document.title = "StudentDashboard - About Trainer"
  let ContextValue = useContext(StudentContext);

  const navigation = useNavigate()

  const [allStudent, setAllStudent] = useState()
  const [trainer, setTrainer] = useState()
  const [currentStudent, setCurrentStudent] = useState()
  const [runningBatch, setRunningBatch] = useState()
  const [filter, setFilter] = useState(
    {
      course: "",
      batch: ""
    }
  )
  const [filterStatus, setFilterStatus] = useState(false)
  const { id } = useParams()
  console.log('id =', id)
  useEffect(() => {

    fetchTrainer(id)


  }, [])


  const getBatch = async (trainerName) => {
    let batchData = await ContextValue.getRunningBatch();

    batchData = batchData.runningBatches.filter(data => {
      return data.Trainer === trainerName
    })
    console.log('batch data =', batchData)
    setRunningBatch(batchData)

  }


  async function fetchTrainer(id) {
    try {
      const status = await ContextValue.getSingleTrainer(id);

      console.log('status of trainer =', status);
      if (status.status === "active") {
        getTrainerData(status.userIndividual)
        localStorage.setItem('trainerId', status.userIndividual._id)
        getBatch(status.userIndividual.Name)
      }


    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  // const {id} = useParams()
  // console.log('trainer id=',id)



  const getTrainerData = async (trainerData) => {

    localStorage.setItem('TrainerName', trainerData.Name);

    const response = await fetch("http://localhost:8000/getStudentByTrainer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ TrainerName: trainerData.Name })
    });

    const responseData = await response.json();
    console.log('response data= ', responseData.data)
    setAllStudent(responseData.data)
    setCurrentStudent(responseData.data)
    console.log('trainer data =', trainerData)
    setTrainer(trainerData)
  }

  const filterStudent = () => {
    setFilterStatus(true)
    console.log('filter =', filter)
    localStorage.setItem('trainerBatch', filter.batch)


    let filterStudent = allStudent.filter(data => {
      return ((filter.course === "" ? data.Course : data.Course === filter.course) && (filter.batch === "" ? data.Batch : data.Batch === filter.batch))
    })

    console.log('filter student =', filterStudent)
    setCurrentStudent(filterStudent)
    localStorage.setItem('filterStudent', JSON.stringify(filterStudent))
  }

  return (
    <>
      <Header />
      {/***********************************
        Content body start
    ************************************/}
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>About Trainer</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="javascript:void(0);">Students</a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="javascript:void(0);">About Student</a>
                </li>
              </ol>
            </div>
          </div>
          <div className="row">
          <div className="col-xl-3 col-xxl-4 col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div
                      className="text-center p-3 overlay-box"
                      style={{ backgroundImage: "url(images/big/img1.jpg)" }}
                    >
                      <div className="profile-photo">
                        <img
                          src="images/profile/profile.png"
                          width={100}
                          className="img-fluid rounded-circle"
                          alt=""
                        />
                      </div>
                      <h3 className="mt-3 mb-1 text-white">{trainer && trainer.Name}</h3>
                    </div>
                  
                    
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-title">about me</h2>
                    </div>
                    <div className="card-body pb-0">
                      <p>
                      {trainer && trainer.bio}
                      </p>
                      <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex px-0 justify-content-between">
                          <strong>Email</strong>
                          <span className="mb-0">{trainer && trainer.Email}</span>
                        </li>
                        <li className="list-group-item d-flex px-0 justify-content-between">
                          <strong>Phone</strong>
                          <span className="mb-0">{trainer && trainer.Number}</span>
                        </li>
                        <li className="list-group-item d-flex px-0 justify-content-between">
                          <strong>Code</strong>
                          <span className="mb-0">{trainer && trainer.code}</span>
                        </li>
                        <li className="list-group-item d-flex px-0 justify-content-between">
                          <strong>Company Name</strong>
                          <span className="mb-0">{trainer && trainer.CompanyName}</span>
                        </li>
                        
                      </ul>
                    </div>

                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header d-block">
                      <h4 className="card-title">Address </h4>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                      {trainer && trainer.Address}
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-xl-9 col-xxl-8 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="profile-tab">
                    <div className="custom-tab-1">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a
                            href="#about-me"
                            data-toggle="tab"
                            className="nav-link active show"
                          >
                            About Me
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#my-posts"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            Demo
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#my-posts"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            Result
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div id="about-me" className="tab-pane fade active show">
                          <div className="profile-personal-info pt-4">
                            <h4 className="text-primary mb-4">
                              Personal Information
                            </h4>
                            <div className="row mb-4">
                              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                <h5 className="f-w-500">
                                  Name <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                <span>{trainer && trainer.Name}</span>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                <h5 className="f-w-500">
                                  Email <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                <span>{trainer && trainer.Email}</span>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                <h5 className="f-w-500">
                                  Course <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                {trainer && trainer.Course.map(data => {
                                  return (
                                    <span style={{ "marginRight": "50px" }}>{data}</span>
                                  )
                                })}
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                <h5 className="f-w-500">
                                  Bio <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                <span>{trainer && trainer.bio}</span>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                <h5 className="f-w-500">
                                  Headline <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                <span>{trainer && trainer.Headline}</span>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                                <h5 className="f-w-500">
                                  LinkedIn <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                                <Link to={trainer && trainer.LinkedinId}><button className='linkedin-btn'>show</button></Link>
                              </div>
                            </div>
                          </div>



                        </div>


                        <div className="batch-course-filter">
                          {trainer && <select className="custom-select mr-sm-2" name="batch" onChange={(e) => { setFilter({ ...filter, [e.target.name]: e.target.value }) }}>
                            <option disabled selected >WeekDays</option>

                            {trainer.weekDaysBatch.map(data => {
                              return (
                                <option value={data}>{data}</option>
                              )
                            })}
                          </select>



                          }
                          {trainer && <select className="custom-select mr-sm-2" name="batch" onChange={(e) => { setFilter({ ...filter, [e.target.name]: e.target.value }) }}>
                            <option disabled selected >WeekendDays</option>

                            {trainer.WeekEndBatch && trainer.WeekEndBatch.map(data => {
                              return (
                                <option value={data}>{data}</option>
                              )
                            })}
                          </select>



                          }


                          {trainer && <select className="custom-select mr-sm-2" name="batch" onChange={(e) => { setFilter({ ...filter, [e.target.name]: e.target.value }) }}>
                            <option disabled selected>Batch</option>

                            {runningBatch && runningBatch.map(data => {
                              return (
                                <option value={data.Batch}>{data.Batch}</option>
                              )
                            })}
                          </select>
                          }

                          <button className='btn btn-primary' onClick={filterStudent} disabled={(filter.course === "" && filter.batch === "") ? true : false}>Filter</button>
                          <Link to='attendence'><button className='btn btn-primary' disabled={filterStatus === false ? true : false}>Attendence</button></Link>
                        </div>



                        <div className="card-body">
                          <div className="table-responsive recentOrderTable">
                            <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                              <thead>
                                <tr>
                                  <th scope="col">No.</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Number</th>
                                  <th scope="col">Batch</th>
                                  <th scope="col">Course</th>
                                  <th scope="col">Attendance</th>

                                </tr>
                              </thead>
                              <tbody>
                                {currentStudent && currentStudent.map((data, index) => {



                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{data.Name}</td>
                                      <td>{data.Number}</td>
                                      <td>{data.BatchTiming}</td>
                                      <td>{data.Course}</td>
                                      <Link to="attendencedetail"><td><i class="fa-solid fa-clipboard-user"></i></td></Link>
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
      </div>
      {/***********************************
        Content body end
    ************************************/}
    </>
  )
}
