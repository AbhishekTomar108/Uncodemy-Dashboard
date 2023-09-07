import React, { useEffect, useState } from 'react'
import Header from '../Header';

function TeacherDemo() {

    const [demo, setDemo] = useState()
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const date = new Date();
  
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();


    const getTrainerdemo = async () => {

        const res = await fetch("http://localhost:8000/getDemoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({TrainerName:localStorage.getItem('TrainerName'), month:monthName[month], day:day.toString(), year:year.toString()})
        });

        const data = await res.json();
        console.log('data of demo =',data)
        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setDemo(data)
        }
    }
    useEffect(() => {
        getTrainerdemo();
    }, [])

    return (
        <>
        <Header/>
        <div className='teacher-demo-container'>
            <div className="card-body">
                <div className="table-responsive recentOrderTable">
                    <table className="table verticle-middle table-responsive-md">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Background</th>
                                <th scope="col">Course</th>
                                <th scope="col">Trainer</th>
                                <th scope="col">Time</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSON.parse(localStorage.getItem('demoData')).map((Trainerdemo, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{Trainerdemo.Name}</td>
                                        <td>{Trainerdemo.Email}</td>
                                        <td>{Trainerdemo.Background}</td>
                                        <td>{Trainerdemo.Course}</td>
                                        <td>{Trainerdemo.Trainer}</td>
                                        <td>{Trainerdemo.Time}</td>
                                        <td>{Trainerdemo.Date}</td>
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

export default TeacherDemo