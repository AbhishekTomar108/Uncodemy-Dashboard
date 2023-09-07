import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom"
import { StudentContext } from '../context/StudentState';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom';
import ReadMessage from "./ReadMessage";


function AllMessage() {


  const { id } = useParams()
  console.log('id =', id)
  let ContextValue = useContext(StudentContext);

  const [message, setMessage] = useState()
  const [student, setStudent] = useState()
  const [status, setStatus] = useState("Assignment")


  async function fetchStudent(id) {
    console.log('fetch student running')
    try {
      const status = await ContextValue.getSingleStudent(id);

      console.log('status of student =', status);
      if (status.status === "active") {
        console.log('activedata =', status.userIndividual)
        receivemessage(status.userIndividual._id)
        localStorage.setItem('studentData', JSON.stringify(status.userIndividual))
        setStudent(status.userIndividual)
      }
      else {
        console.log('else fecth')

      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }
  const receivemessage = async (id) => {
    console.log('receive message')
    const messageRes = await fetch(`http://localhost:8000/receivemessage/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    });

    const messageData = await messageRes.json();
    console.log("message", messageData)
    setMessage(messageData.message)


  }

  // -----Read Meassage

  const showMessagedialog = async (id) => {
  
    if (ContextValue) {
  
      Swal.fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        html: '<div id="customDiv"> your message </div>'
      });
  
    } 
  };

  useEffect(() => {
    fetchStudent(id)
  }, [])
  return (
    <>
      <div className="all-message">

        {/* <hr /> */}
        <div className="table_area1">
          <div className="container_area">
          <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Message</th>
                  <th scope="col">From</th>
                  <th scope="col">Date</th>
                  <th scope="col">view</th>
                </tr>
              </thead>
              <tbody>
                {message && message.map((data, index) => {
                  return (
                    <tr >
                      <td > {index + 1}</td>
                      <td > {data.message}</td>
                      <td > {data.from}</td>
                      <td > {data.date}</td>
                      <td > <button className="btn btn-success" onClick={() => showMessagedialog(data._id)}><RemoveRedEyeIcon/></button></td>
                    </tr>

                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllMessage;
