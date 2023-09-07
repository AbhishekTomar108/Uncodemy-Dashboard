import React from 'react'

export default function CFeeReceipt() {
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
              <h4>Fees Receipt</h4>
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
                <a href="javascript:void(0);">Fees Receipt</a>
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card mt-3">
              <div className="card-header">
                {" "}
                Invoice <strong>01/01/01/2018</strong>{" "}
                <span className="float-right">
                  <strong>Status:</strong> Pending
                </span>{" "}
              </div>
              <div className="card-body">
                <div className="row mb-5">
                  <div className="mt-4 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <h6>From:</h6>
                    <div>
                      {" "}
                      <strong>Webz Poland</strong>{" "}
                    </div>
                    <div>Madalinskiego 8</div>
                    <div>#8901 Marmora Road Chi Minh City</div>
                    <div>Email: info@example.com</div>
                    <div>Phone: +01 123 456 7890</div>
                  </div>
                  <div className="mt-4 col-xl-6 text-right col-lg-6 col-md-6 col-sm-12">
                    <h6>To:</h6>
                    <div>
                      {" "}
                      <strong>Bob Mart</strong>{" "}
                    </div>
                    <div>Attn: Daniel Marek</div>
                    <div>#8901 Marmora Road Chi Minh City</div>
                    <div>Email: info@example.com</div>
                    <div>Phone: +02 987 654 3210</div>
                  </div>
                </div>
                <div className="table-responsive-sm">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="center">#</th>
                        <th>Fees Type</th>
                        <th>Frequency</th>
                        <th className="right">Invoice number</th>
                        <th className="center">Date</th>
                        <th className="right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="center">1</td>
                        <td className="left strong">Annual Fees</td>
                        <td className="left">Monthly</td>
                        <td className="right">#54620</td>
                        <td className="center">8 August 2020</td>
                        <td className="right">$999,00</td>
                      </tr>
                      <tr>
                        <td className="center">2</td>
                        <td className="left">Annual Fees</td>
                        <td className="left">Yearly</td>
                        <td className="right">#54310</td>
                        <td className="center">7 August 2020</td>
                        <td className="right">$3.000,00</td>
                      </tr>
                      <tr>
                        <td className="center">3</td>
                        <td className="left">Tuition Fees</td>
                        <td className="left">Monthly</td>
                        <td className="right">#24315</td>
                        <td className="center">6 August 2020</td>
                        <td className="right">$499,00</td>
                      </tr>
                      <tr>
                        <td className="center">4</td>
                        <td className="left">Tuition Fees</td>
                        <td className="left">Yearly</td>
                        <td className="right">#32541</td>
                        <td className="center">5 August 2020</td>
                        <td className="right">$3.999,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-sm-5"> </div>
                  <div className="col-lg-4 col-sm-5 ml-auto">
                    <table className="table table-clear">
                      <tbody>
                        <tr>
                          <td className="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td className="right">$8.497,00</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Discount (20%)</strong>
                          </td>
                          <td className="right">$1,699,40</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>VAT (10%)</strong>
                          </td>
                          <td className="right">$679,76</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Total</strong>
                          </td>
                          <td className="right">
                            <strong>$7.477,36</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 text-right">
                    <button className="btn btn-primary" type="submit">
                      {" "}
                      Proceed to payment{" "}
                    </button>
                    <button
                      onclick="javascript:window.print();"
                      className="btn btn-light"
                      type="button"
                    >
                      {" "}
                      <i className="fa fa-print" /> Print{" "}
                    </button>
                  </div>
                </div>
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
