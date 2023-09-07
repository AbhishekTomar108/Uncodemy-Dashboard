import React, { useState } from 'react'
import Header from '../Header';

function Demo() {

    const [inpval, setINP] = useState({
        Name: '',
        Email: '',
        Background: '',
        Trainer: '',
        Course: '',
        Date: '',
        Time: '',
        classLink:''
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { Name, value } = e.target;
        setINP((preval) => {
          return {
            ...preval,
            [Name]: value,
          };
        });
      };
      let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
      const addinpdata = async (e) => {
        e.preventDefault();
   let { Name, Email, Background, Trainer, Date, Time, Course, classLink } = { ...inpval };

   let dateSplit = Date.split('-')
   let day = dateSplit[2]
   let month = monthName[dateSplit[1]-1]
   let year = dateSplit[0]
   Date = day+'/'+month+'/'+year
   console.log('day=',month,year,Date)

       
            var timeSplit = Time.split(':'),
              hours,
              minutes,
              meridian;
            hours = timeSplit[0];
            minutes = timeSplit[1];
            if (hours > 12) {
              meridian = 'PM';
              hours -= 12;
            } else if (hours < 12) {
              meridian = 'AM';
              if (hours == 0) {
                hours = 12;
              }
            } else {
              meridian = 'PM';
            }
            Time = hours + ':' + minutes + meridian;        

        const res = await fetch('http://localhost:8000/demo', {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({Email,Name,Background,Trainer,Date,Time,Course,month,year,day, classLink})
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert('error');
        } else {       
            console.log('data added');
        }

    }
        return (
            <>
            <Header/>
                <div className="content-body">
                    <div className="container-fluid">
                        <div className="row page-titles mx-0">
                            <div className="col-sm-6 p-md-0">
                                <div className="welcome-text">
                                    <h4>Schedule Demo</h4>
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
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.Name}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Background</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.Background}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Background"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <input type="Email"
                                                            className="form-control"
                                                            value={inpval.Email}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Email"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Trainer</label>
                                                        <select className="form-control"
                                                            id="exampleInputPassword1"
                                                            type="select"
                                                            name="Trainer"
                                                            class="form-control"
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                                                            <option value="Trainer">Choose Trainer..</option>
                                                            <option value="Nikhil">Nikhil</option>
                                                            <option value="Subham">Subham</option>
                                                            <option value="Shivendra">Shivendra</option>
                                                            <option value="Sonal">Sonal</option>
                                                            <option value="Irshad">Irshad</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Demo Date</label>
                                                        <input type="Date"
                                                            className="form-control"
                                                            value={inpval.Date}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Date"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Demo Time</label>
                                                        <input type="Time"
                                                            className="form-control"
                                                            value={inpval.Time}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="Time"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Course</label>
                                                        <select className="form-control"
                                                            id="exampleInputPassword1"
                                                            type="select"
                                                            name="Course"
                                                            class="form-control"
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                                                            <option value="Class">Choose Course</option>
                                                            <option value="html">HTML</option>
                                                            <option value="css">CSS</option>
                                                            <option value="javascript">JavaScript</option>
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
                                                        <label className="form-label">Class Link</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={inpval.classLink}
                                                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                                                            name="classLink"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <button type="submit" onClick={addinpdata} className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                    <button type="submit" className="btn btn-light">
                                                        Cancel
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

export default Demo