import React from 'react'

export default function CAddFee() {
  return (
    <>
    {/***********************************
        Content body start
    ************************************/}
    <div className="content-body">
      {/* row */}
      <div className="container-fluid">
        <div className="row page-titles mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="welcome-text">
              <h4>Add Fees</h4>
            </div>
          </div>
          <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="javascript:void(0);">Fees</a>
              </li>
              <li className="breadcrumb-item active">
                <a href="javascript:void(0);">Add Fees</a>
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-xxl-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Add Department</h5>
              </div>
              <div className="card-body">
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Roll No.</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Student Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Department</label>
                        <select className="form-control">
                          <option value="Department">Department</option>
                          <option value="Computer">Computer</option>
                          <option value="Arts">Arts</option>
                          <option value="Commerce">Commerce</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group mb-4">
                        <label className="form-label" />
                        <select className="form-control">
                          <option value="Fess Type">Fess Type</option>
                          <option value="Annual">Annual</option>
                          <option value="Exam">Exam</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group row">
                        <label className="radio-inline col-lg-4">
                          <input type="radio" name="add-date" /> Monthly
                        </label>
                        <label className="radio-inline col-lg-4">
                          <input type="radio" name="add-date" /> Yearly
                        </label>
                        <label className="radio-inline col-lg-4">
                          <input type="radio" name="add-date" /> Session
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Ammount</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group mb-4">
                        <label className="form-label">Collection Date</label>
                        <input
                          name="datepicker"
                          className="datepicker-default form-control"
                          id="datepicker"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group mb-4">
                        <label className="form-label" />
                        <select className="form-control">
                          <option value="Payment Type">Payment Type</option>
                          <option value="Annual">Cash</option>
                          <option value="Exam">Cheque</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">
                          Payment Reference Number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group mb-4">
                        <label className="form-label">Status</label>
                        <select className="form-control">
                          <option value="Status">Status</option>
                          <option value="Annual">Paid</option>
                          <option value="Exam">Unpaid</option>
                          <option value="Exam">Panding</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="form-label">Payment Details</label>
                        <textarea
                          className="form-control"
                          rows={5}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <button type="submit" className="btn btn-primary">
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

