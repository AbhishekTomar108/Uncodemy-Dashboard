import React, { useEffect, useState, useContext } from 'react'
import img from "../../Components/img/7.jpg"
import Header from '../Header';
import { StudentContext } from '../../context/StudentState';
import { useNavigate } from 'react-router-dom';

export default function TrainerMessage() {
  document.title="StudentDashboard - Send Messages"
  let ContextValue = useContext(StudentContext);

  const navigation = useNavigate()

  useEffect(()=>{
    fetchTrainerStatus()
  },[])

  async function fetchTrainerStatus() {
    try {
      const status = await ContextValue.checkTrainer();
      
  console.log('status of trainer =', status);
  if(status.status==="active"){
    // getTrainerData(status.data)
  }
  else{
    navigation('/')
    alert('you are not authorized')
  }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const [isChecked, setIsChecked] = useState(false);
  const [fileName, setFileName] = useState()
  const [selectedImage, setSelectedImage] = useState();

  const [end, setEnd] = useState(10)
  const [start, setStart] = useState(0)
  const [allStudentData, setAllStudentData] = useState(JSON.parse(localStorage.getItem('allStudent')))

  const [currentStudent, setCurrentStudent] = useState(JSON.parse(localStorage.getItem('allStudent')).slice(start, end).map(data => {
    return data
  })
  )
  const totalItem = JSON.parse(localStorage.getItem('allStudent')).length
  const [file, setFile] = useState()
  let tempCurrentStudent;
  const individual = allStudentData.map(data => {
    console.log('current student')
    return (
      {
        status: "off",
        check: false
      })
  })
  console.log('individual check =', individual)
  const [individualCheck, setIndividualCheck] = useState(individual)

  const [detail, setDetail] = useState({

    trainer: null,
    batch: null,
    course: null
  })
  const [message, setMessage] = useState()
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setFileName(event.target.files[0].name)
  };




  const moveItem = () => {
    console.log('move item', totalItem - end, JSON.parse(localStorage.getItem('allStudent')), totalItem);
    // console.log('move item',totalItem);



    if ((totalItem - end) <= 10) {
      console.log('if end')
      setStart(end)
      setEnd(end + (totalItem - end))
      tempCurrentStudent = [...currentStudent]

      tempCurrentStudent = allStudentData.slice(end, (end + (totalItem - end))).map(data => {
        return data
      })


      setCurrentStudent(tempCurrentStudent)

    }
    else if ((totalItem - end) > 10) {
      console.log('else end')

      setStart(end)
      setEnd(end + 10)
      tempCurrentStudent = [...currentStudent]

      tempCurrentStudent = allStudentData.slice(end, end + 10).map(data => {
        return data
      })


      setCurrentStudent(tempCurrentStudent)
    }

  }

  const backItem = () => {

    if (start == 0) {
      setStart(start)
      setEnd(end)
      setCurrentStudent(currentStudent)
    }

    else {
      setEnd(start)
      setStart(start - 10)

      tempCurrentStudent = [...currentStudent]

      tempCurrentStudent = allStudentData.slice((start - 10), start).map(data => {
        return data
      })


      setCurrentStudent(tempCurrentStudent)
    }


  }

  const IndividualChecked = (event, index) => {
    console.log('check =', event.target.checked, index)

    let tempInd = [...individualCheck]

    tempInd[index] = { ...tempInd[index], status: 'on', check: event.target.checked };
    setIndividualCheck(tempInd)
  }

  const allcheck = (event) => {
    setIsChecked(event.target.checked)

    let tempInd = individualCheck.map(data => {
      return ({
        status: "off",
        check: event.target.checked
      }
      )
    })

    setIndividualCheck(tempInd)
  }

  const sendMessage = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);

    await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    })

    let checkedId = currentStudent.filter((data, index) => {


      if (individualCheck[index].check === true) {

        return true;
      }
      return false;
    })
      .map((data, index) => {
        return {
          id: data._id,
        };
      });

    console.log('check id =', checkedId)

    let data = await fetch('http://localhost:8000/sendmessage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message, from: "admin", checkid: checkedId, fileName: fileName })
    })
  }

  const filterStudent = () => {
    console.log('all student =', allStudentData)
    let filterStudent = allStudentData.filter((data, index) => {

      return (detail.trainer != null ? data.TrainerName === detail.trainer : data.TrainerName) && (detail.batch != null ? data.BatchTiming === detail.batch : data.BatchTiming) && (detail.course != null ? data.Course === detail.course : data.Course)

    })   
    const individual = filterStudent.map(data => {
      console.log('current student')
      return (
        {
          status: "off",
          check: false
        })
    })
    console.log('individual check =', individual)
    setIndividualCheck(individual)
    setCurrentStudent(filterStudent)
  }

  return (
    <>
   
      <Header />
    
      <div className="content-body">
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
            <div className='message-form'>
              
              <div className="batch-thumb thumb">
                <label className="form-label">Batch :</label>
                <select className="custom-select mr-sm-2" required name='batch' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })} >
                  <option selected>Choose...</option>
                  <option>All </option>
                  <option>12pm</option>
                  <option>1pm</option>
                  <option>2pm</option>
                  <option>3pm</option>
                  <option>4pm</option>
                  <option>5pm</option>
                </select>
              </div>
              <div className="preference-thumb thumb">
                <label className="form-label">Courses :</label>
                <select className="custom-select mr-sm-2" required name='course' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })}>
                  <option selected>Choose...</option>
                  <option>All </option>
                  <option>Software Testing</option>
                  <option>Data Science</option>
                  <option>Full Stack Development</option>
                </select>
              </div>
              <button className='filter-btn' onClick={filterStudent}>Filter</button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="email-right  ml-sm-4 ml-sm-0">
                    <div className="compose-content">
                      <div className="form-group">
                        <textarea
                          id="email-compose-editor"
                          className="textarea_editor form-control bg-transparent"
                          rows={15}
                          placeholder="Enter a Message ..."
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <h4 className='stu'>Please Select Students</h4>
                        <div className="table-responsive">
                        <table id="datatable"  className="table table-striped table-bordered"cellspacing="0" width="100%" >
                            <thead>
                              <tr>
                                <th scope="col"><input type='checkbox' onClick={event => allcheck(event)}></input></th>
                                <th scope="col">Name</th>
                                <th scope="col">Assigned Professor</th>
                                <th scope="col">Contact No.</th>
                                <th scope="col">Subject</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentStudent && currentStudent.map((data, index) => {
                                index = start + index;
                                return (
                                  <tr key={index}>
                                    <td>
                                      <input type='checkbox'
                                        checked={individualCheck[index].status === 'off' ? isChecked : individualCheck[index].check}
                                        onClick={(event) => IndividualChecked(event, index)}
                                      />
                                    </td>
                                    <td>{data.Name}</td>
                                    <td>{data.TrainerName}</td>
                                    <td>{data.Number}</td>
                                    <td>{data.Course}</td>
                                  </tr>
                                )
                              })
                              }

                            </tbody>
                          </table>

                          <div className="clearfix" />
                          <div className='right-left-arrow right-left-arrow-sendmessage'>
                            <i class="fa-solid fa-left-long" onClick={backItem}></i>
                            <i class="fa-solid fa-right-long" onClick={moveItem}></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 className="mb-4">
                      <i className="fa fa-paperclip" /> Attatchment
                    </h5>
                    <form
                      onSubmit={(e) => sendMessage(e)}
                      action="#"
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <div className="fallback w-100">
                        <input
                          type="file"
                          className="dropify"
                          name="file"
                          onChange={handleFileChange}
                        />
                      </div>
                    </form>
                    <div className="text-left mt-4 mb-5">
                      <button
                        className="btn btn-primary btn-sl-sm mr-3"
                        type="button"
                        onClick={sendMessage}
                      >
                        <span className="mr-2">
                          <i className="fa fa-paper-plane" />
                        </span>{" "}
                        Send
                      </button>
                      <button className="btn btn-dark btn-sl-sm" type="button" onClick={e => setMessage("")}>
                        <span className="mr-2">
                          <i className="fa fa-times" aria-hidden="true" />
                        </span>{" "}
                        Discard
                      </button>

                      <div
                        className="modal fade"
                        id="edit"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="edit"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                              >
                                <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                              </button>
                              <h4 className="modal-title custom_align" id="Heading">
                                Edit Your Detail
                              </h4>
                            </div>
                            <div className="modal-body">
                              <div className="form-group">
                                <input className="form-control " type="text" placeholder="Mohsin" />
                              </div>
                              <div className="form-group">
                                <input className="form-control " type="text" placeholder="Irshad" />
                              </div>
                              <div className="form-group">
                                <textarea
                                  rows={2}
                                  className="form-control"
                                  placeholder="Noida"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="modal-footer ">
                              <button
                                type="button"
                                className="btn btn-warning btn-lg"
                                style={{ width: "100%" }}
                              >
                                <span className="glyphicon glyphicon-ok-sign" />
                                &nbsp;Update
                              </button>
                            </div>
                          </div>
                          {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                      </div>
                      <div
                        className="modal fade"
                        id="delete"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="edit"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                              >
                                <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                              </button>
                              <h4 className="modal-title custom_align" id="Heading">
                                Delete this entry
                              </h4>
                            </div>
                            <div className="modal-body">
                              <div className="alert alert-danger">
                                <span className="glyphicon glyphicon-warning-sign" /> Are you sure
                                you want to delete this Record?
                              </div>
                            </div>
                            <div className="modal-footer ">
                              <button type="button" className="btn btn-success">
                                <span className="glyphicon glyphicon-ok-sign" />
                                &nbsp;Yes
                              </button>
                              <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                              >
                                <span className="glyphicon glyphicon-remove" />
                                &nbsp;No
                              </button>
                            </div>
                          </div>
                          {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>


      <>





        <div className="content-body">
          <div className="container-fluid">

            {/* row */}
            <div className="row">






              <div className="col-xl-4 col-lg-4 col-xxl-4 col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Timeline</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="DZ_W_TimeLine"
                      className="widget-timeline dz-scroll"
                      style={{ height: 370 }}
                    >
                      <ul className="timeline">
                        <li>
                          <div className="timeline-badge primary" />
                          <a className="timeline-panel text-muted" href="#">
                            <span>10 minutes ago</span>
                            <h6 className="m-t-5">
                              Youtube, a video-sharing website, goes live.
                            </h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge warning"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>10 minutes ago</span>
                            <h6 className="m-t-5">
                              Mashable, a news website and blog, goes live.
                            </h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge danger"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>30 minutes ago</span>
                            <h6 className="m-t-5">Google acquires Youtube.</h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge success"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>15 minutes ago</span>
                            <h6 className="m-t-5">StumbleUpon is acquired by eBay. </h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge warning"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>10 minutes ago</span>
                            <h6 className="m-t-5">
                              Mashable, a news website and blog, goes live.
                            </h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge dark"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>10 minutes ago</span>
                            <h6 className="m-t-5">
                              Mashable, a news website and blog, goes live.
                            </h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge info"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>30 minutes ago</span>
                            <h6 className="m-t-5">Google acquires Youtube.</h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge danger"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>30 minutes ago</span>
                            <h6 className="m-t-5">Google acquires Youtube.</h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge success"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>15 minutes ago</span>
                            <h6 className="m-t-5">StumbleUpon is acquired by eBay. </h6>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge warning"></div>
                          <a className="timeline-panel text-muted" href="#">
                            <span>10 minutes ago</span>
                            <h6 className="m-t-5">
                              Mashable, a news website and blog, goes live.
                            </h6>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>


                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-xxl-4 col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Notifications</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="DZ_W_Todo"
                      className="widget-todo dz-scroll"
                      style={{ height: 370 }}
                    >
                      <ul className="timeline">
                        <li>
                          <div className="timeline-badge primary" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Dr sultads Send you Photo</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge warning" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Resport created successfully</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge danger" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Reminder : Treatment Time!</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge success" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Dr sultads Send you Photo</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge warning" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Resport created successfully</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge dark" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Reminder : Treatment Time!</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge info" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Dr sultads Send you Photo</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge danger" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Resport created successfully</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge success" />
                          <a
                            className="timeline-panel text-muted mb-3 d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Reminder : Treatment Time!</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="timeline-badge warning" />
                          <a
                            className="timeline-panel text-muted d-flex align-items-center"
                            href="#"
                          >
                            <img
                              className="rounded-circle"
                              alt="image"
                              width={50}
                              src={img}
                            />
                            <div className="col">
                              <h5 className="mb-1">Dr sultads Send you Photo</h5>
                              <small className="d-block">29 July 1010 - 02:26 PM</small>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Messages</h5>
                  </div>
                  <div className="card-body">
                    <div
                      id="DZ_W_Message"
                      className="widget-message dz-scroll"
                      style={{ height: 350 }}
                    >
                      <div className="media mb-3">
                        <img
                          className="mr-3 rounded-circle"
                          alt="image"
                          width={50}
                          src={img}
                        />
                        <div className="media-body">
                          <h5>
                            Jacob Tucker
                            <small className="text-primary">April 29, 1018</small>
                          </h5>
                          <p className="mb-2">
                            I shared this on my fb wall a few months back, and I
                            thought.
                          </p>
                          <a
                            href="javascript:void()"
                            className="btn btn-primary btn-sm d-inline-block px-3"
                          >
                            Reply
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-danger btn-sm d-inline-block px-3"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                      <div className="media mb-3">
                        <img
                          className="mr-3 rounded-circle"
                          alt="image"
                          width={50}
                          src={img}
                        />
                        <div className="media-body">
                          <h5>
                            Noah Baldon{" "}
                            <small className="text-primary">April 28, 1018</small>
                          </h5>
                          <p className="mb-2">
                            I shared this on my fb wall a few months back, and I
                            thought.
                          </p>
                          <a
                            href="javascript:void()"
                            className="btn btn-primary btn-sm d-inline-block px-3"
                          >
                            Reply
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-danger btn-sm d-inline-block px-3"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                      <div className="media mb-3">
                        <img
                          className="mr-3 rounded-circle"
                          alt="image"
                          width={50}
                          src={img}
                        />
                        <div className="media-body">
                          <h5>
                            Muhammad Clay{" "}
                            <small className="text-primary">March 24, 1010</small>
                          </h5>
                          <p className="mb-2">
                            I shared this on my fb wall a few months back, and I
                            thought.
                          </p>
                          <a
                            href="javascript:void()"
                            className="btn btn-primary btn-sm d-inline-block px-3"
                          >
                            Reply
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-danger btn-sm d-inline-block px-3"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                      <div className="media">
                        <img
                          className="mr-3 rounded-circle"
                          alt="image"
                          width={50}
                          src={img}
                        />
                        <div className="media-body">
                          <h5>
                            William Logan{" "}
                            <small className="text-primary">Dec 24, 1019</small>
                          </h5>
                          <p className="mb-2">
                            I shared this on my fb wall a few months back, and I
                            thought.
                          </p>
                          <a
                            href="javascript:void()"
                            className="btn btn-primary btn-sm d-inline-block px-3"
                          >
                            Reply
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-danger btn-sm d-inline-block px-3"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


















              <div className="col-xl-8 col-lg-8 col-xxl-8 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Recent Payments Queue</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive recentOrderTable">
                      <table className="table verticle-middle table-responsive-md">
                        <thead>
                          <tr>
                            <th scope="col">Ward No.</th>
                            <th scope="col">Patient</th>
                            <th scope="col">Dr Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Bills</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>12</td>
                            <td>Mr. Bobby</td>
                            <td>Dr. Jackson</td>
                            <td>01 August 1010</td>
                            <td>
                              <span className="badge badge-rounded badge-primary">
                                Checkin
                              </span>
                            </td>
                            <td>$110</td>
                            <td>
                              <div className="dropdown custom-dropdown mb-0">
                                <div data-toggle="dropdown">
                                  <i className="fa fa-ellipsis-v" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Details
                                  </a>
                                  <a
                                    className="dropdown-item text-danger"
                                    href="javascript:void(0);"
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>10 </td>
                            <td>Mr. Dexter</td>
                            <td>Dr. Charles</td>
                            <td>31 July 1010</td>
                            <td>
                              <span className="badge badge-rounded badge-warning">
                                Panding
                              </span>
                            </td>
                            <td>$540</td>
                            <td>
                              <div className="dropdown custom-dropdown mb-0">
                                <div data-toggle="dropdown">
                                  <i className="fa fa-ellipsis-v" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Details
                                  </a>
                                  <a
                                    className="dropdown-item text-danger"
                                    href="javascript:void(0);"
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>03 </td>
                            <td>Mr. Nathan</td>
                            <td>Dr. Frederick</td>
                            <td>30 July 1010</td>
                            <td>
                              <span className="badge badge-rounded badge-danger">
                                Canceled
                              </span>
                            </td>
                            <td>$301</td>
                            <td>
                              <div className="dropdown custom-dropdown mb-0">
                                <div data-toggle="dropdown">
                                  <i className="fa fa-ellipsis-v" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Details
                                  </a>
                                  <a
                                    className="dropdown-item text-danger"
                                    href="javascript:void(0);"
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>05</td>
                            <td>Mr. Aurora</td>
                            <td>Dr. Roman</td>
                            <td>29 July 1010</td>
                            <td>
                              <span className="badge badge-rounded badge-success">
                                Checkin
                              </span>
                            </td>
                            <td>$099</td>
                            <td>
                              <div className="dropdown custom-dropdown mb-0">
                                <div data-toggle="dropdown">
                                  <i className="fa fa-ellipsis-v" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Details
                                  </a>
                                  <a
                                    className="dropdown-item text-danger"
                                    href="javascript:void(0);"
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>06</td>
                            <td>Mr. Matthew</td>
                            <td>Dr. Samantha</td>
                            <td>28 July 1010</td>
                            <td>
                              <span className="badge badge-rounded badge-success">
                                Checkin
                              </span>
                            </td>
                            <td>$510</td>
                            <td>
                              <div className="dropdown custom-dropdown mb-0">
                                <div data-toggle="dropdown">
                                  <i className="fa fa-ellipsis-v" />
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a
                                    className="dropdown-item"
                                    href="javascript:void(0);"
                                  >
                                    Details
                                  </a>
                                  <a
                                    className="dropdown-item text-danger"
                                    href="javascript:void(0);"
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

















            </div>
          </div>
        </div>





      </>







      {/*---- Include the above in your HEAD tag --------*/}

    </>
  )
}
