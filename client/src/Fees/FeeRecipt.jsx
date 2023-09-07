import React from "react";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';


function FeeRecipt() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="card-body fee-detail">
        <div className="card-header">
          <h4 className="text-primary mb-4">Fee Receipt</h4>
        </div>
        <div className="tab-content">
          <div id="about-me" className="tab-pane fade active show">

            <div className="profile-personal-info pt-4 fee-recipt">
              <h4 className="text-primary mb-4">
                Student Details
              </h4>
              <hr />
              <div className="fee-information">
                <div >
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Name <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Email <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Joining Date <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Trainer <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Batch <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Toal Fee <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Paid Fee <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Remaining Fee <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <h5 className="f-w-500">
                        Status <span className="pull-right">:</span>
                      </h5>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" fee-recipt mt-4">
              <h4 className="text-primary mt-4">
                Installment Details
              </h4>
              <div className="table-responsive recentOrderTable">
                <table
                  id="datatable"
                  className="table table-striped table-bordered "
                  cellspacing="0"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">File</th>
                      <th scope="col">Invoice No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>20-7-2023</td>
                      <td>10000</td>
                      <td>Emi.jpg</td>
                      <td>7266255</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeeRecipt;
