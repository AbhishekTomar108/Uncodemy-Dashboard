import React, { useEffect, useState, useContext } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { NavLink, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentState';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const RunningBatches = () => {
  let ContextValue = useContext(StudentContext);
  const [runningBatch, setRunningBatch] = useState()
  const navigation = useNavigate()

  useEffect(() => {
    fetchAdminStatus()

  }, [])

  async function fetchAdminStatus() {
    try {
      const status = await ContextValue.checkAdmin();

      console.log('status of admin =', status);
      if (status.status === "active") {
        getrunningBatch();
      }
      else {
        navigation('/')
        alert('you are not authorized')
      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const getrunningBatch = async () => {

    let runningBatches = await fetch('http://localhost:8000/getrunningBatch');

    runningBatches = await runningBatches.json()

    setRunningBatch(runningBatches.runningBatches)
  }
  return (
    <>
      <Header />
      
      <div className='sidebar-container'>
          <Sidebar />
        
        <div className="card-body fee-detail">
          <div className="table-responsive recentOrderTable">
            <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Trainer</th>
                  <th scope="col">Batch Time</th>
                  <th scope="col">Days</th>
                  <th scope="col">View</th>


                </tr>
              </thead>
              <tbody>
                {runningBatch &&

                  runningBatch.map((data, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.Batch}</td>
                        <td>{data.Trainer}</td>
                        <td>{data.BatchTime}</td>
                        <td>{data.Days}</td>
                        <td>
                          <button className="btn btn-success" onClick={e => { localStorage.setItem('selectedRunningBatch', data.Batch) }}> <NavLink to={`Student`}> <RemoveRedEyeIcon /></NavLink></button>
                        </td>

                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

        </div>
      
    </>
  )
}

export default RunningBatches