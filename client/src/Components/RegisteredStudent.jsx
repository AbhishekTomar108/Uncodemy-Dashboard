import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MessageIcon from "@mui/icons-material/Message";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const RegisteredStudent = () => {
  const [Registerdata, setRegisterdata] = useState();

  const getTrainerdata = async () => {
    const res = await fetch("http://localhost:8000/getregisterStudent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setRegisterdata(data);
    }
  };

  useEffect(() => {
    getTrainerdata();
  });
  return (
    <>
     
      <Header />
      <div className="content-body">
        <div className="container-fluid">
          <div className='d-none d-lg-flex'>
            <div className='message-form'>
              <div className="batch-thumb thumb">
                <label className="form-label">Trainer Name :</label>
                <select className="custom-select mr-sm-2" required name='course'>
                  <option selected>Choose Trainer...</option>
                  <option >data</option>
                  <option >data</option>
                  <option >data</option>
                  <option >data</option>
                </select>
              </div>
              <div className="batch-thumb thumb">
                <label className="form-label"> Counselor :</label>
                <select className="custom-select mr-sm-2" required name='course'>
                  <option selected>Choose Counselor...</option>
                  <option >data</option>
                  <option >data</option>
                  <option >data</option>
                  <option >data</option>
                </select>
              </div>             
              <button className='filter-btn' >Filter</button>
            </div>
          </div>
        </div>
        <div className="card-body Registrated-detail">
          <div className="table-responsive recentOrderTable">
            <table
              id="datatable"
              className="table table-striped table-bordered"
              cellspacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Number</th>
                  <th scope="col">Registration Date</th>
                  <th scope="col">Course </th>
                  <th scope="col">Counselor</th>
                  <th scope="col">Batch Mode</th>
                </tr>
              </thead>
              <tbody>
                {Registerdata &&
                  Registerdata.map((data, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.Name}</td>
                        <td>{data.Number}</td>
                        <td>{data.RegistrationDate}</td>
                        <td>{data.Course}</td>
                        <td>{data.Counselor}</td>
                        <td>{data.BatchMode}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteredStudent;
