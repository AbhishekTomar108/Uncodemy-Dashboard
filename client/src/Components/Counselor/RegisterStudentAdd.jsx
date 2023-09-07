import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Sidebar from "../Sidebar";
import Header from "../Header";

const RegisterStudentAdd = () => {
  const [allcourse, setAllCourse] = useState();

  let ContextValue = useContext(StudentContext);
  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    let allCourse = await ContextValue.getAllBatchCourse();
    console.log("course =", allCourse.batchCourse[0].Course);
    setAllCourse(allCourse.batchCourse[0].Course);
  };

  const [inpval, setINP] = useState({
    Name: "",
    Email: "",
    Number: "",
    Pname: "",
    Pnumber: "",
    RegistrationDate: "",
    Course: "",
    Counselor: "",
    RegistraionFees: "",
    TrainerName: "",
    BatchMode: "",
    Remark: "",
    file: null, // Add a file state
  });
  const handleFileChange = (e) => {
    console.log("file =", e.target.files[0])
    setINP({ ...inpval, file: e.target.files[0] });
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const field in inpval) {
      formData.append(field, inpval[field]);
    }
    try {
      const res = await fetch('http://localhost:8000/registerStudent', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log("Data", data)
    }
    catch (error) {
      console.log('error =', error.message)
    }
  };
  return (
    <>
    
    <Header/>
    <div className="content-body">
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Resigster Student</h4>
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
                        <input
                          type="text"
                          value={inpval.Name}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Name"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Number</label>
                        <input
                          type="number"
                          value={inpval.Number}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Number"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          value={inpval.Email}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Email"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Parent Name</label>
                        <input
                          type="text"
                          value={inpval.Pname}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Pname"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Parent Number</label>
                        <input
                          type="number"
                          value={inpval.Pnumber}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Pnumber"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Registration Date</label>
                        <input
                          type="date"
                          value={inpval.JoiningDate}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="RegistrationDate"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Counselor</label>
                        <input
                          type="text"
                          value={inpval.Counselor}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="Counselor"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Trainer Name </label>
                        <input
                          type="text"
                          value={inpval.TrainerName}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="TrainerName"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Registration Fees</label>
                        <input
                          type="text"
                          value={inpval.RegistraionFees}
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="RegistraionFees"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
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
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option disabled selected>
                            --select Batch Mode--
                          </option>
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Batch Course</label>
                        <select
                          id="exampleInputPassword1"
                          type="select"
                          name="Course"
                          class="form-control"
                          onChange={(e) =>
                            setINP({
                              ...inpval,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option disabled selected>
                            --select Batch Mode--
                          </option>
                          {allcourse &&
                            allcourse.map((data) => {
                              return <option value={data}>{data}</option>;
                            })}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group fallback w-100">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          name="file"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button
                        type="submit"
                        onClick={addinpdata}
                        className="btn btn-primary"
                      >
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
    </>
  );
};

export default RegisterStudentAdd;
