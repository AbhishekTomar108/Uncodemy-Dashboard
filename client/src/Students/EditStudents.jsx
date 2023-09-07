import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigation } from 'react-router-dom'
import { updatedata } from '../context/ContextProvider';
import Header from '../Components/Header';

export default function EditStudents() {


  // const history = useNavigation("");

  const [inpval, setINP] = useState({
    Name: "",
    Number: "",
    Pname: "",
    Pnumber: "",
    JoiningDate: "",
    Course: "",
    Counselor: "",
    Fees: "",
    TrainerName: "",
    BatchStartDate: "",
    BatchTiming: "",
    BatchMode: "",
    Payment: "",
    Remark: "",
    status:""
  })

  const setdata = (e) => {
    console.log(e.target.value);
    const { Name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [Name]: value
      }
    })
  }


  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {

    const res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setINP(data.userIndividual)
      console.log("get data");

    }
  }

  useEffect(() => {
    getdata();
  }, []);


  const updateuser = async (e) => {
    
  document.title="StudentDashboard - Edit Student"

    e.preventDefault();

    

    const { Name, Number, Pname, status, Pnumber, JoiningDate, Course, Counselor, Fees, TrainerName, BatchStartDate, BatchTiming, BatchMode, Payment, Remark } = inpval;

    const res2 = await fetch(`http://localhost:8000/updateuser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Name, Number, Pname, status, Pnumber, JoiningDate, Course, Counselor, Fees, TrainerName, BatchStartDate, BatchTiming, BatchMode, Payment, Remark
      })
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      // history.push("/Home")
      // setUPdata(data2);
    }

  }
  return (

    <>
    <Header/>
      {/***********************************
      Content body start
  ************************************/}
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Edit Student</h4>
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
                  <a href="javascript:void(0);">Add Student</a>
                </li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Basic Info</h5>
                </div>
                <div className="card-body">
                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input type="text" value={inpval.Name} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Number</label>
                          <input type="number" value={inpval.Number} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Number" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Parent Name</label>
                          <input type="text" value={inpval.Pname} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Pname" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Parent Number</label>
                          <input type="number" value={inpval.Pnumber} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Pnumber" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Joining Date</label>
                          <input type="date" value={inpval.JoiningDate} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="JoiningDate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Course</label>
                          <select
                            id="exampleInputPassword1"
                            type="select"
                            name="Course"
                            class="form-control"
                            // value={inpval.Course}
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Course--</option>
                            <option value="Java Full stack">Java Full stack</option>
                            <option value="Data Structure">Data Structure</option>
                            <option value="Mern Full stack">Mern Full stack</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Python Full Stack">Python Full Stack</option>
                            <option value="Kuchh Bhi">Kuchh Bhi</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Counselor</label>
                          <input type="text" value={inpval.Counselor} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Counselor" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Fees</label>
                          <input type="text" value={inpval.Fees} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Fees" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Trainer Name </label>
                          <input type="text" value={inpval.TrainerName} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="TrainerName" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">
                            Batch Start  Date
                          </label>
                          <input type="date" value={inpval.JoiningDate} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="BatchStartDate" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">BatchTiming</label>
                          <input type="text" value={inpval.BatchTiming} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="BatchTiming" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Batch mode</label>
                          <select
                            id="exampleInputPassword1"
                            type="select"
                            name="BatchMode"
                            class="form-control"
                            value={inpval.BatchMode}
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Batch Mode--</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Payment Mode</label>
                          <select
                            id="exampleInputPassword1"
                            type="select"
                            name="Payment"
                            class="form-control"
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Payment--</option>
                            <option value="online">EMI</option>
                            <option value="offline">Installment</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group fallback w-100">
                          <label className="form-label">Remark</label>
                          <input type="text" value={inpval.Remark} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Remark" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group fallback w-100">
                          <label className="form-label">Status</label>
                          <br></br>
                          <label className="form-label">Active</label>
                          <input class="form-control" type='radio' value="active" name='status'  checked={inpval.status==="active"?true:false}  onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                          <label className="form-label">Deactive</label>

                          <input class="form-control" type='radio' value="deactive" name='status' checked={inpval.status==="deactive"?true:false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                          <label className="form-label">BackOut</label>

                          <input class="form-control" type='radio' value="backout" name='status' checked={inpval.status==="backout"?true:false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                          <label className="form-label">Pending</label>

                          <input class="form-control" type='radio' value="pending" name='status' checked={inpval.status==="pending"?true:false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}></input>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <button type="submit" onClick={updateuser} className="btn btn-primary">
                          Submit
                        </button>
                        <button type="submit" className="btn btn-light">
                          Cencel
                        </button>
                      </div>
                    </div>
                  </form>
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
