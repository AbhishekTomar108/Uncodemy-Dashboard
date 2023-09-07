import React from 'react'

export default function CAboutStudents() {
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
              <h4>About Student</h4>
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
                <a href="javascript:void(0);">About Student</a>
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-xxl-4 col-lg-4">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div
                    className="text-center p-3 overlay-box"
                    style={{ backgroundImage: "url(images/big/img1.jpg)" }}
                  >
                    <div className="profile-photo">
                      <img
                        src="images/profile/profile.png"
                        width={100}
                        className="img-fluid rounded-circle"
                        alt=""
                      />
                    </div>
                    <h3 className="mt-3 mb-1 text-white">Deangelo Sena</h3>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="mb-0">Followers</span>{" "}
                      <strong className="text-muted">1204 </strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="mb-0">Following</span>{" "}
                      <strong className="text-muted">2540 </strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="mb-0">Friends</span>{" "}
                      <strong className="text-muted">2540</strong>
                    </li>
                  </ul>
                  <div className="card-footer text-center border-0 mt-0">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-primary btn-rounded px-4"
                    >
                      Follow
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-warning btn-rounded px-4"
                    >
                      Message
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">about me</h2>
                  </div>
                  <div className="card-body pb-0">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex px-0 justify-content-between">
                        <strong>Gender</strong>
                        <span className="mb-0">Male</span>
                      </li>
                      <li className="list-group-item d-flex px-0 justify-content-between">
                        <strong>Education</strong>
                        <span className="mb-0">PHD</span>
                      </li>
                      <li className="list-group-item d-flex px-0 justify-content-between">
                        <strong>Email</strong>
                        <span className="mb-0">info@example.com</span>
                      </li>
                      <li className="list-group-item d-flex px-0 justify-content-between">
                        <strong>Phone</strong>
                        <span className="mb-0">+01 123 456 7890</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer pt-0 pb-0 text-center">
                    <div className="row">
                      <div className="col-4 pt-3 pb-3 border-right">
                        <h3 className="mb-1 text-primary">150</h3>
                        <span>Projects</span>
                      </div>
                      <div className="col-4 pt-3 pb-3 border-right">
                        <h3 className="mb-1 text-primary">140</h3>
                        <span>Uploads</span>
                      </div>
                      <div className="col-4 pt-3 pb-3">
                        <h3 className="mb-1 text-primary">45</h3>
                        <span>Tasks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-block">
                    <h4 className="card-title">Address </h4>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">
                      Demo Address #8901 Marmora Road Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-block">
                    <h4 className="card-title">Interest </h4>
                  </div>
                  <div className="card-body">
                    <h6>
                      Photoshop
                      <span className="pull-right">85%</span>
                    </h6>
                    <div className="progress ">
                      <div
                        className="progress-bar bg-danger progress-animated"
                        style={{ width: "85%", height: 6 }}
                        role="progressbar"
                      >
                        <span className="sr-only">60% Complete</span>
                      </div>
                    </div>
                    <h6 className="mt-4">
                      Code editor
                      <span className="pull-right">90%</span>
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info progress-animated"
                        style={{ width: "90%", height: 6 }}
                        role="progressbar"
                      >
                        <span className="sr-only">60% Complete</span>
                      </div>
                    </div>
                    <h6 className="mt-4">
                      Illustrator
                      <span className="pull-right">65%</span>
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success progress-animated"
                        style={{ width: "65%", height: 6 }}
                        role="progressbar"
                      >
                        <span className="sr-only">60% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-xxl-8 col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="profile-tab">
                  <div className="custom-tab-1">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a
                          href="#about-me"
                          data-toggle="tab"
                          className="nav-link active show"
                        >
                          About Me
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#my-posts"
                          data-toggle="tab"
                          className="nav-link"
                        >
                          Posts
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div id="about-me" className="tab-pane fade active show">
                        <div className="profile-personal-info pt-4">
                          <h4 className="text-primary mb-4">
                            Personal Information
                          </h4>
                          <div className="row mb-4">
                            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                              <h5 className="f-w-500">
                                Name <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                              <span>Mitchell C.Shay</span>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                              <h5 className="f-w-500">
                                Email <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                              <span>info@example.com</span>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                              <h5 className="f-w-500">
                                Age <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                              <span>18</span>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                              <h5 className="f-w-500">
                                Location <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-6 col-6">
                              <span>Rosemont Avenue Melbourne, Florida</span>
                            </div>
                          </div>
                        </div>
                        <div className="profile-skills pt-2 border-bottom-1 pb-2">
                          <h4 className="text-primary mb-4">Skills</h4>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-dark btn-rounded px-4 my-3 my-sm-0 mr-3 m-b-10"
                          >
                            Admin
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-dark btn-rounded px-4 my-3 my-sm-0 mr-3 m-b-10"
                          >
                            Dashboard
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-dark btn-rounded px-4 my-3 my-sm-0 mr-3 m-b-10"
                          >
                            Photoshop
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-dark btn-rounded px-4 my-3 my-sm-0 mr-3 m-b-10"
                          >
                            Bootstrap
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-dark btn-rounded px-4 my-3 my-sm-0 mr-3 m-b-10"
                          >
                            Responsive
                          </a>
                          <a
                            href="javascript:void()"
                            className="btn btn-outline-dark btn-rounded px-4 my-3 my-sm-0 mr-3 m-b-10"
                          >
                            Crypto
                          </a>
                        </div>
                        <div className="profile-lang pt-5 border-bottom-1 pb-5">
                          <h4 className="text-primary mb-4">Language</h4>
                          <a
                            href="javascript:void()"
                            className="text-muted pr-3 f-s-16"
                          >
                            <i className="flag-icon flag-icon-us" /> English
                          </a>{" "}
                          <a
                            href="javascript:void()"
                            className="text-muted pr-3 f-s-16"
                          >
                            <i className="flag-icon flag-icon-fr" /> French
                          </a>
                          <a
                            href="javascript:void()"
                            className="text-muted pr-3 f-s-16"
                          >
                            <i className="flag-icon flag-icon-bd" /> Bangla
                          </a>
                        </div>
                        <div className="profile-about-me">
                          <div className="border-bottom-1 pb-4">
                            <p>
                              A wonderful serenity has taken possession of my
                              entire soul, like these sweet mornings of spring
                              which I enjoy with my whole heart. I am alone, and
                              feel the charm of existence was created for the
                              bliss of souls like mine.I am so happy, my dear
                              friend, so absorbed in the exquisite sense of mere
                              tranquil existence, that I neglect my talents.
                            </p>
                            <p>
                              A collection of textile samples lay spread out on
                              the table - Samsa was a travelling salesman - and
                              above it there hung a picture that he had recently
                              cut out of an illustrated magazine and housed in a
                              nice, gilded frame.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div id="my-posts" className="tab-pane fade">
                        <div className="my-post-content pt-3">
                          <div className="post-input">
                            <textarea
                              name="textarea"
                              id="textarea"
                              cols={30}
                              rows={5}
                              className="form-control bg-transparent"
                              placeholder="Please type what you want...."
                              defaultValue={""}
                            />{" "}
                            <a href="javascript:void()">
                              <i className="ti-clip" />{" "}
                            </a>
                            <a href="javascript:void()">
                              <i className="ti-camera" />{" "}
                            </a>
                            <a
                              href="javascript:void()"
                              className="btn btn-primary"
                            >
                              Post
                            </a>
                          </div>
                          <div className="profile-uoloaded-post border-bottom-1 pb-5">
                            <img
                              src="images/profile/8.jpg"
                              alt=""
                              className="img-fluid"
                            />
                            <a className="post-title" href="javascript:void()">
                              <h4>Collection of textile samples lay spread</h4>
                            </a>
                            <p>
                              A wonderful serenity has take possession of my
                              entire soul like these sweet morning of spare which
                              enjoy whole heart.A wonderful serenity has take
                              possession of my entire soul like these sweet
                              morning of spare which enjoy whole heart.
                            </p>
                            <button className="btn btn-primary mr-3">
                              <span className="mr-3">
                                <i className="fa fa-heart" />
                              </span>
                              Like
                            </button>
                            <button className="btn btn-secondary">
                              <span className="mr-3">
                                <i className="fa fa-reply" />
                              </span>
                              Reply
                            </button>
                          </div>
                          <div className="profile-uoloaded-post border-bottom-1 pb-5">
                            <img
                              src="images/profile/9.jpg"
                              alt=""
                              className="img-fluid"
                            />
                            <a className="post-title" href="javascript:void()">
                              <h4>Collection of textile samples lay spread</h4>
                            </a>
                            <p>
                              A wonderful serenity has take possession of my
                              entire soul like these sweet morning of spare which
                              enjoy whole heart.A wonderful serenity has take
                              possession of my entire soul like these sweet
                              morning of spare which enjoy whole heart.
                            </p>
                            <button className="btn btn-primary mr-3">
                              <span className="mr-3">
                                <i className="fa fa-heart" />
                              </span>
                              Like
                            </button>
                            <button className="btn btn-secondary">
                              <span className="mr-3">
                                <i className="fa fa-reply" />
                              </span>
                              Reply
                            </button>
                          </div>
                          <div className="profile-uoloaded-post pb-5">
                            <img
                              src="images/profile/8.jpg"
                              alt=""
                              className="img-fluid"
                            />
                            <a className="post-title" href="javascript:void()">
                              <h4>Collection of textile samples lay spread</h4>
                            </a>
                            <p>
                              A wonderful serenity has take possession of my
                              entire soul like these sweet morning of spare which
                              enjoy whole heart.A wonderful serenity has take
                              possession of my entire soul like these sweet
                              morning of spare which enjoy whole heart.
                            </p>
                            <button className="btn btn-primary mr-3">
                              <span className="mr-3">
                                <i className="fa fa-heart" />
                              </span>
                              Like
                            </button>
                            <button className="btn btn-secondary">
                              <span className="mr-3">
                                <i className="fa fa-reply" />
                              </span>
                              Reply
                            </button>
                          </div>
                          <div className="text-center mb-2">
                            <a
                              href="javascript:void()"
                              className="btn btn-primary"
                            >
                              Load More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
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

