import React, { useEffect, useState, useContext } from 'react'
import img from "../Components/img/7.jpg"
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import StudentSlidebar from './StudentSlidebar'


export default function StudentMessage() {
  document.title="StudentDashboard - Send Messages"
  let ContextValue = useContext(StudentContext);
  const navigation = useNavigate()

  const [message, setMessage] = useState()
  const [student, setStudent] = useState()

  useEffect(()=>{
    fetchStudentStatus()
  },[])

  async function fetchStudentStatus() {
    console.log('fetch student running')
    try {
      const status = await ContextValue.checkStudent();
      
  console.log('status of student =', status);
  if(status.status==="active"){
     setStudent(status.data)
  }
  else{
    console.log('else fecth')
    navigation('/')
    alert('you are not authorized')
  }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }


  const sendStudentMessage = async () => {

const currentDate = new Date();

const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const year = currentDate.getFullYear();

// Format the date in "DD-MM-YYYY" pattern
const formattedDate = `${day}-${month}-${year}`;

console.log(formattedDate); // Output: "06-09-2023"


    const formData = new FormData();
    formData.append("message",message)
    formData.append("receiverId",student.TrainerID)
    formData.append("senderId",student._id)
    formData.append("date",formattedDate)

    console.log("message =",message,student._id,student.TrainerID)
  
    let data = await fetch('http://localhost:8000/sendStudentMessage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    })
  }



  return (
    <>
   
      <Header />
      <div className='sidebar-main-container'>
<StudentSlidebar/>
    
      <div className="content-body">
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
        
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card message-card">
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


                    <form
                      onSubmit={(e) => sendStudentMessage(e)}
                      action="#"
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                   
                    </form>
                    <div className="text-left mt-4 mb-5">
                      <button
                        className="btn btn-primary btn-sl-sm mr-3"
                        type="button"
                        onClick={sendStudentMessage}
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
      </div>

      {/*---- Include the above in your HEAD tag --------*/}

    </>
  )
}
