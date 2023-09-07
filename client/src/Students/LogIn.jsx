
import './loginStyle.css'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import { Link } from "react-router-dom";


export default function LogIn() {

  document.title="StudentDashboard - Log In Panel"


  const [user, setUser] = useState("none")

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  let ContextValue = useContext(StudentContext);

  const history = useNavigate();
  const fetchUserData = async(e) => {
    e.preventDefault()
    console.log('login', login, user)

    let data = await fetch(`http://localhost:8000/${user}`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: login.email, password: login.password })

    })
    
      data =  await data.json()
      console.log('data of user=', data)
  
      if (data.status === "active") {

        ContextValue.updateStudent(login.email, login.password)

        localStorage.setItem(`${user}`,data.authtoken)
        ContextValue.updateLoggedInPerson(data.username)
        console.log("user =",user)
        history(`/${user}`);
      }

      else {
        alert('you are not authorized')
        console.log('data is false =', data)
        console.log('context ', ContextValue.student)
      }
    
  }
  return (
    <>
      <div className='main'>
        <div className='main-container'>
          <div className='img-side col-sm-6 px-0 d-none d-sm-block'>
            <div className='left-img'></div>
          </div>
          <div className='button-side'>
            <h2>Welcome to UnCodemy</h2>
            <div className='all-button'>
              <button type="button" className="btn btn bg-color1" onClick={(e) => setUser("admin")}>Admin</button>
              <button type="button" className="btn btn bg-color2" onClick={(e) => setUser("trainer")}>Trainer</button>
              <button type="button" className="btn btn bg-color3" onClick={(e) => setUser("counselor")}>Counsellor</button>
              <button type="button" className="btn btn bg-color4" onClick={(e) => setUser("student")}>Student</button>
            </div>
            <div className="inputfield">
              <h2>{user != "none" && user} Sign In</h2>
              <form className='form'>
                <div className='username' >
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter Phone Number"
                    name="email"
                    onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
                    value={login.email || ""}
                  />
                </div>
                <div className='password'><input type="Password"
                  className="form-control mt-1"
                  placeholder="Enter Password"
                  name="password"
                  onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }}
                  value={login.password || ""}
                />
                </div>
                <div className="forgetpassword"><Link to='/forget'> <label className='lab'>Forgot Password?</label></Link></div>
                <div class="d-grid gap-2 submitbutton">
                  <button class="btn btn-primary" onClick={fetchUserData} type="button" disabled={user === "none" ? true : false}>Submit</button>

                </div>
              </form>
            </div>
          </div>



        </div>
      </div>
    </>
  )
}
