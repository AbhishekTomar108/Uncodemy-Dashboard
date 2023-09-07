import React from 'react'
import { Link } from 'react-router-dom'

export default function StudentCompose() {
  return (
    <>
  {/***********************************
      Content body start
  ************************************/}
  <div className="content-body">
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6 p-md-0">
          <div className="welcome-text">
            <h4>Hi, welcome back!</h4>
            <span className="ml-1">Email</span>
          </div>
        </div>
        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Email</a>
            </li>
            <li className="breadcrumb-item active">
              <a href="#">Compose</a>
            </li>
          </ol>
        </div>
      </div>
      {/* row */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="email-left-box px-0 mb-5">
                <div className="p-0">
                <Link className="list-group-item active btn-block" to="/StudentCompose">Compose An Email</Link>
                </div>
                <div className="mail-list mt-4">
                <Link className="list-group-item active" to="/StudentInbox"><i className="fa fa-inbox font-18 align-middle mr-2" /> Inbox  <span className="badge badge-primary badge-sm float-right">
                      198
                    </span></Link>
                  <a href="javascript:void()" className="list-group-item">
                    <i className="fa fa-paper-plane font-18 align-middle mr-2" />
                    Sent
                  </a>{" "}
                  <a href="javascript:void()" className="list-group-item">
                    <i className="fa fa-star-o font-18 align-middle mr-2" />
                    Important{" "}
                    <span className="badge badge-danger text-white badge-sm float-right">
                      47
                    </span>
                  </a>
                  <a href="javascript:void()" className="list-group-item">
                    <i className="mdi mdi-file-document-box font-18 align-middle mr-2" />
                    Draft
                  </a>
                  <a href="javascript:void()" className="list-group-item">
                    <i className="fa fa-trash font-18 align-middle mr-2" />
                    Trash
                  </a>
                </div>
                <div className="intro-title d-flex justify-content-between">
                  <h5>Categories</h5>
                  <i className="fa fa-chevron-down" aria-hidden="true" />
                </div>
                <div className="mail-list mt-4">
                  <a href="email-inbox.html" className="list-group-item">
                    <span className="icon-warning">
                      <i className="fa fa-circle" aria-hidden="true" />
                    </span>
                    Work{" "}
                  </a>
                  <a href="email-inbox.html" className="list-group-item">
                    <span className="icon-primary">
                      <i className="fa fa-circle" aria-hidden="true" />
                    </span>
                    Private{" "}
                  </a>
                  <a href="email-inbox.html" className="list-group-item">
                    <span className="icon-success">
                      <i className="fa fa-circle" aria-hidden="true" />
                    </span>
                    Support{" "}
                  </a>
                  <a href="email-inbox.html" className="list-group-item">
                    <span className="icon-dpink">
                      <i className="fa fa-circle" aria-hidden="true" />
                    </span>
                    Social{" "}
                  </a>
                </div>
              </div>
              <div className="email-right-box ml-0 ml-sm-4 ml-sm-0">
                <div className="toolbar mb-4" role="toolbar">
                  <div className="btn-group mb-1">
                    <button type="button" className="btn btn-dark">
                      <i className="fa fa-archive" />
                    </button>
                    <button type="button" className="btn btn-dark">
                      <i className="fa fa-exclamation-circle" />
                    </button>
                    <button type="button" className="btn btn-dark">
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                  <div className="btn-group mb-1">
                    <button
                      type="button"
                      className="btn btn-dark dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-folder" />{" "}
                      <b className="caret m-l-5" />
                    </button>
                    <div className="dropdown-menu">
                      {" "}
                      <a className="dropdown-item" href="#">
                        Social
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Promotions
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Updates
                      </a>
                      <a className="dropdown-item" href="#">
                        Forums
                      </a>
                    </div>
                  </div>
                  <div className="btn-group mb-1">
                    <button
                      type="button"
                      className="btn btn-dark dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-tag" /> <b className="caret m-l-5" />
                    </button>
                    <div className="dropdown-menu">
                      {" "}
                      <a className="dropdown-item" href="#">
                        Updates
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Social
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Promotions
                      </a>
                      <a className="dropdown-item" href="#">
                        Forums
                      </a>
                    </div>
                  </div>
                  <div className="btn-group mb-1">
                    <button
                      type="button"
                      className="btn btn-dark dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      More <span className="caret m-l-5" />
                    </button>
                    <div className="dropdown-menu">
                      {" "}
                      <a className="dropdown-item" href="#">
                        Mark as Unread
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Add to Tasks
                      </a>
                      <a className="dropdown-item" href="#">
                        Add Star
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Mute
                      </a>
                    </div>
                  </div>
                </div>
                <div className="compose-content">
                  <form action="#">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder=" To:"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder=" Subject:"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        id="email-compose-editor"
                        className="textarea_editor form-control bg-transparent"
                        rows={15}
                        placeholder="Enter text ..."
                        defaultValue={""}
                      />
                    </div>
                  </form>
                  <h5 className="mb-4">
                    <i className="fa fa-paperclip" /> Attatchment
                  </h5>
                  <form
                    action="#"
                    className="d-flex flex-column align-items-center justify-content-center"
                  >
                    <div className="fallback w-100">
                      <input
                        type="file"
                        className="dropify"
                        data-default-file=""
                      />
                    </div>
                  </form>
                </div>
                <div className="text-left mt-4 mb-5">
                  <button
                    className="btn btn-primary btn-sl-sm mr-3"
                    type="button"
                  >
                    <span className="mr-2">
                      <i className="fa fa-paper-plane" />
                    </span>{" "}
                    Send
                  </button>
                  <button className="btn btn-dark btn-sl-sm" type="button">
                    <span className="mr-2">
                      <i className="fa fa-times" aria-hidden="true" />
                    </span>{" "}
                    Discard
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
