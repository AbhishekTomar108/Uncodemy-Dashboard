import React, { useEffect, useState, useContext } from "react";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';


function Addfee() {

 const {id} = useParams()
 console.log('id params=',id)
  const [student, setStudent] = useState()
  let ContextValue = useContext(StudentContext);

  const [inpval, setINP] = useState({
    Name: '',
    Batch: '',
    email: '',
    Number: '',
    Pname: '',
    Pnumber: '',
    RegistrationDate: '',
    Course: '',
    Counselor: '',
    Fees: '',
    remainingFees:'',
    RegistrationFees:'',
    TrainerName: '',
    BatchStartDate: '',
    BatchTiming: '',
    BatchMode: '',
    Payment: '',
    Remark: [],
    status: 'active',
    Days: '',
    file: null,
    DueDate:'',
    url: '' // Add a file state
  });

  const [feeData, setFeeData]=useState({
    InvoiceNumber:"",
    Paymentmode:"",
    amount:"",
    Detail:"",
    CollectionDate:"",
    installment:"",
    file:"",
    })

  useEffect(()=>{
    fetchStudent(id)
  },[])

  async function fetchStudent(id) {
    console.log('fetch student running')
    try {
      const status = await ContextValue.getSingleStudent(id);

      console.log('status of student =', status);
      if (status.status === "active") {
        console.log('activedata =', status.userIndividual)
        localStorage.setItem('studentData', JSON.stringify(status.userIndividual))
        setStudent(status.userIndividual)
        let tempInpval  ={...inpval}
        for(let data in status.userIndividual){
          console.log("inside data =",data)
          tempInpval[data]  = status.userIndividual[data]
        }

        console.log('inp val =',tempInpval,tempInpval.RegistrationFees)
        setINP(tempInpval)
      }
      else {
        console.log('else fecth')

      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const handleFileChange = (e) => {
    console.log("file =", e.target.files[0])
    setFeeData({ ...feeData, file: e.target.files[0] });
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    console.log('fee data before=',feeData)
    const formData = new FormData();
    for (const field in feeData) {
      formData.append(field, feeData[field]);
    }
    console.log('fee data =',feeData)

    try {
      const res = await fetch(`http://localhost:8000/AddFee/${id}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log("Data",data)
    }
    catch (error) {
      console.log('error =', error.message)
    }
  }
  return (
    <>
      <Header />
      <Sidebar />
      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card fee-detail">
            <div className="card-header">
              <h5 className="card-title">Add Fees</h5>
            </div>
            <div className="card-body ">
              <form action="#" method="post">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        required
                        type="text"
                        value={inpval.Name}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
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
                        required
                        type="number"
                        value={inpval.Number}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
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
                        required
                        type="email"
                        value={inpval.email}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="email"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Course</label>
                      <input
                        required
                        type="text"
                        value={inpval.Course}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="course"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                      <label className="form-label">Batch</label>
                      <input
                        required
                        type="text"
                        value={inpval.Batch}
                        name="course"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                      <label className="form-label">Total Fees</label>
                      <input
                        required
                        type="text"
                        value={inpval.Fees}
                        name="course"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                      <label className="form-label">Remaining Fees</label>
                      <input
                        required
                        type="text"
                        value={inpval.remainingFees}
                        name="course"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Registraion Fees</label>
                      <input
                        required
                        type="number"
                        value={inpval.RegistrationFees}
                        onChange={(e) =>
                          setINP({ ...inpval, [e.target.name]: e.target.value })
                        }
                        name="RegistraionFees"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </div>
              </form>

              <div className="card-header">
                <h5 className="card-title">Add Fee Type</h5>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Amount</label>
                    <input
                      required
                      type="number"
                      value={feeData.amount}
                      onChange={(e) =>
                        setFeeData({ ...feeData, [e.target.name]: e.target.value })
                      }
                      name="amount"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Collection Date</label>
                    <input
                      required
                      type="date"
                      value={feeData.CollectionDate}
                      onChange={(e) =>
                        setFeeData({ ...feeData, [e.target.name]: e.target.value })
                      }
                      name="CollectionDate"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Invoice Number</label>
                    <input
                      required
                      type="text"
                      value={feeData.InvoiceNumber}
                      onChange={(e) =>
                        setFeeData({ ...feeData, [e.target.name]: e.target.value })
                      }
                      name="InvoiceNumber"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Payment Mode</label>
                    <select
                      required
                      id="exampleInputPassword1"
                      type="select"
                      name="Paymentmode"
                      class="form-control"
                      onChange={(e) =>
                        setFeeData({ ...feeData, [e.target.name]: e.target.value })
                      }
                    >
                      <option disabled selected>
                        --select Payment Mode--
                      </option>
                      <option value="online">Cash</option>
                      <option value="offline">Cheque</option>
                      <option value="offline">UPI</option>
                      <option value="offline">Draft</option>
                      <option value="offline">Other</option>
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
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Details</label>
                    <input
                      required
                      type="text"
                      value={feeData.Detail}
                      onChange={(e) =>
                        setFeeData({ ...feeData, [e.target.name]: e.target.value })
                      }
                      name="Detail"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="card-header">
                <h5 className="card-title">Installment</h5>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Amount</label>
                    <input
                      required
                      type="number"
                      value={inpval.amount}
                      onChange={(e) =>
                        setFeeData({ ...feeData, [e.target.name]: e.target.value })
                      }
                      name="installment"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label">Collection Date</label>
                    <input
                      required
                      type="date" 
                      value={feeData.CollectionDate}
                      onChange={(e) =>
                        setFeeData({ ...feeData, [e.target.name]: e.target.value })
                      }
                      name="CollectionDate"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
              </div> */}

              <div className="col-lg-12 col-md-12 col-sm-12">
                <button
                  type="submit"
                  onClick={addinpdata}
                  className="btn btn-primary"
                >
                  Submit
                </button>
                <button className="btn btn-light">
                  Cencel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addfee;
