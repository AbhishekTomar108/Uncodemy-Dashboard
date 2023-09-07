import React from 'react'

export default function CEditStudents() {
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
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Deangelo"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Sena"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="info@example.com"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Registration Date</label>
                      <input
                        name="datepicker"
                        className="datepicker-default form-control"
                        id="datepicker"
                        defaultValue="07 August, 2020"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Roll No.</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={52}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Class</label>
                      <select className="form-control">
                        <option value="Class">Class</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript" selected="">
                          JavaScript
                        </option>
                        <option value="angular">Angular</option>
                        <option value="angular">React</option>
                        <option value="vuejs">Vue.js</option>
                        <option value="ruby">Ruby</option>
                        <option value="php">PHP</option>
                        <option value="asp">ASP.NET</option>
                        <option value="python">Python</option>
                        <option value="mysql">MySQL</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select className="form-control">
                        <option value="Gender">Gender</option>
                        <option value="Male" selected="">
                          Male
                        </option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="+01 123 456 7890"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Parents Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="James Jones"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">
                        Parents Mobile Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="+01 987 654 3210"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Date of Birth</label>
                      <input
                        name="datepicker"
                        className="datepicker-default form-control"
                        id="datepicker1"
                        defaultValue="31 July 1998"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Blood Group</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="+AB"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={
                          "Demo Address #8901 Marmora Road Chi Minh City, Vietnam"
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group fallback w-100">
                      <input
                        type="file"
                        className="dropify"
                        data-default-file=""
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

