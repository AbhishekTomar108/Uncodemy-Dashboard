import React, { useEffect, useState, useContext } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MessageIcon from '@mui/icons-material/Message';
import Swal from 'sweetalert2'
import { StudentContext } from '../context/StudentState'


// import EditFee from '../Fees/EditFee';


function FeeTable() {
  const [allStudent, setAllStudent] = useState()
  let ContextValue = useContext(StudentContext);

  const [Feedata, setFeedata] = useState("")

  const getTrainerdata = async () => {
    const res = await fetch("http://localhost:8000/FeeTable", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setFeedata(data)
    }
  }

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
        fetch(`http://localhost:8000/deleteFee/${id}`, {
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
            getTrainerdata();
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


  useEffect(() => {

    getAllStudent();
    getTrainerdata();

  }, [])

  const getAllStudent = async () => {
    let student = await ContextValue.getAllStudent()

    ContextValue.getPaymentStatus(student)
    setAllStudent(student)
  }




  return (
    <>
      <Sidebar />
      <Header />

      <div className="card-body fee-detail">
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Resigster Student</h4>
              </div>
            </div>
            <div className="table-responsive recentOrderTable">
              <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {allStudent && allStudent.map((data, index) => {

                    index = index;

                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.Name}</td>
                        <td>{data.Number}</td>
                        <td>{data.email}</td>
                        <td>{data.DueDate}</td>
                        <td>{data.paymentStatus}</td>
                        {/* <td>
                                <span className={`badge badge-rounded badge-${badgeStatus[data.status]}`}>
                                  {data.status}
                                </span>
                </td> */}
                        <td className='nav-link'>
                          <button className="btn btn-primary"> <NavLink to={`/EditFee/${data._id}`}> <CreateIcon /></NavLink></button>
                          <button className="btn btn-danger" onClick={() => deleteuser(data._id)} ><DeleteOutlineIcon /></button>
                          <button className="btn btn-warning text-light" ><MessageIcon /></button>
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
    </>
  )
}

export default FeeTable