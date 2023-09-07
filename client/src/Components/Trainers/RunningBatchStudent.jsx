import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

function RunningBatchStudent() {
  const [runningBatch, setRunningBatch] = useState();

  useEffect(()=>{
    let  SelectedBatch = localStorage.getItem('selectedRunningBatch')

    console.log("SelectedBatch",SelectedBatch)
    
      const filterStudent = JSON.parse(localStorage.getItem('allStudent')).filter(data => {
        return data.Batch === SelectedBatch;
      });
    console.log("filterStudent",filterStudent)
      setRunningBatch(filterStudent);
  },[])

  

//   useEffect = (()=>{
//     filterStudent()
//   })

  return (
    <>
      <Header />
          <Sidebar />
          <div className="card-body fee-detail">
        <div className="table-responsive recentOrderTable ">
          <table
            id="datatable"
            className="table table-striped table-bordered "
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Course</th>
                <th scope="col">Trainer</th>
                <th scope="col">Batch Time</th>
                <th scope="col">Counselor</th>
              </tr>
            </thead>
            <tbody>
              {runningBatch &&
                runningBatch.map((data, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.Name}</td>
                      <td>{data.email}</td>
                      <td>{data.Course}</td>
                      <td>{data.TrainerName}</td>
                      <td>{data.BatchTiming}</td>
                      <td>{data.Counselor}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        </div>
      
    </>
  );
}

export default RunningBatchStudent;
