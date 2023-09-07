import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useParams } from 'react-router-dom';


function Attandance() {

    let { id } = useParams()
    // console.log('id =', id)

    let checkDate;
    const [startDate, setStartDate] = useState();

    const [student, setStudent] = useState()
    const [monthAttendance, setMonthAttendance] = useState()
    let tempMonthAttendance;
    let presentId;
    let absentId;
    let missingDays = [];
    let status = [];

    const [attendanceStatus, setAttendanceStatus] = useState()
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let dayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

    let currentDate = new Date()
    const [date, setDate] = useState()
    const [currentDay, setCurrentDay] = useState(currentDate.getDate())
    // let currentDay = currentDate.getDate()
    const [currentMonth, setCurrentMonth] = useState(month[((currentDate.getMonth()))])

    // let currentMonth = month[((currentDate.getMonth()))]
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

    // let currentYear = currentDate.getFullYear()
    let tempFullDate = `${currentDay}/${currentMonth}/${currentYear}`
    const [fullDate, setFullDate] = useState(tempFullDate)


    let tempdate = date
    const FullAttand = async () => {

        // console.log('current month =', currentMonth, month[(new Date().getMonth())])
        if (currentMonth !== month[(new Date().getMonth())]) {
            // console.log('not current month')
            tempdate = new Date(currentYear, month.indexOf(currentMonth) + 1, 0).getDate()
            setDate(tempdate)
            // // console.log('temp date =', tempdate, month.indexOf(currentMonth))
        }
        else {
            tempdate = new Date().getDate()
            setDate(tempdate)
            // console.log('temp filter date', tempdate)
        }
        let monthAttendance = await fetch("http://localhost:8000/getMonthAttendance", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ year: currentYear.toString(), month: currentMonth, currentDate: tempdate.toString() })

        })
        // // console.log('date =', date)

        monthAttendance = await monthAttendance.json()

        // console.log('month attendance =', monthAttendance)
        checkDate = parseInt(monthAttendance.monthAttendance[0].date)
        setStartDate(checkDate)

        // // console.log("start at beginning", startDate)

        setMonthAttendance(monthAttendance.monthAttendance)
        tempMonthAttendance = monthAttendance.monthAttendance
        presentId = monthAttendance.presentId;
        absentId = monthAttendance.absentId;
        // // console.log('present id =',monthAttendance.presentId)

        getstudent();

    }
    useEffect(() => {
        FullAttand();

        // fillAttendance()
    }, [])

    const getstudent = async () => {
        let res = await fetch(`http://localhost:8000/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        res = await res.json()

        setStudent(res)
        fillAttendance(tempMonthAttendance, res)
    }

    const fillAttendance = (attendanceData, student) => {

       
      console.log('attendance =',attendanceData,presentId)

        attendanceData.map((data, index) => {

            let daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

            if ((index + 1) === attendanceData.length) {
                
                if ((parseInt(tempdate) - parseInt(data.date) > 0)) {
                    daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

                    if (daysName !== 'fri') {
                        let BatchStatus = false;
                        data.Batch.map(element => {
                            if (element === student.Batch) {
                                BatchStatus = true
                            }
                        })

                        if (BatchStatus === false) {
                            status.push("not marked")
                        }
                        else if (BatchStatus === true) {
                         
                            let presentStatus = false;
                            presentId[index].user.id.map((presentdata,presentIndex) => {
                              
                                if (presentdata === student._id && presentStatus === false) {
                                    console.log('for present',presentIndex)
                                    presentStatus = true;
                                    status.push("present")
                                }
                            })

                            if (presentStatus === false) {
                                console.log('for absent')
                                status.push("absent")
                            }
                        }
                    }
                    else {
                        status.push("holiday")
                    }

               
                    setAttendanceStatus(status)

                    checkDate = checkDate + 1
                    for (let i = 0; i < (parseInt(tempdate) - parseInt(data.date)); i++) {
                      
                        if (daysName !== 'fri') {
                            
                            missingDays.push(checkDate)
                            status.push("not marked")
                        }

                        else {
                          
                            status.push("holiday")
                        }
                        daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];


                    }

                }

                else {
              
                    if (daysName !== 'fri') {
                        let BatchStatus = false;
                        data.Batch.map(element => {
                            if (element === student.Batch) {
                                BatchStatus = true
                            }
                        })

                        if (BatchStatus === false) {
                            status.push("not marked")
                            console.log('not marked')
                        }
                        else if (BatchStatus === true) {
                          
                            let presentStatus = false;
                            presentId[index].user.id.map((presentdata,presentIndex) => {
                          
                                if (presentdata === student._id && presentStatus===false) {
                                    presentStatus = true;
                                    console.log('present =',presentdata,student._id,presentIndex)
                                    status.push("present")
                                }
                            })

                            if (presentStatus === false) {
                                status.push("absent")
                                console.log('absent =',student._id)

                            }
                        }
                    }
                    else {
                        status.push("holiday")
                        console.log('holiday =',student._id)
                    }
                }

             
                setAttendanceStatus(status)
                checkDate = checkDate + 1;


            }

            else if ((index + 1) < attendanceData.length) {
                if ((parseInt(attendanceData[index + 1].date) - parseInt(data.date) > 1)) {
                    daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

                    if (daysName !== 'fri') {
                        let BatchStatus = false;
                        data.Batch.map(element => {
                            if (element === student.Batch) {
                                BatchStatus = true
                            }
                        })

                        if (BatchStatus === false) {
                            status.push("not marked")
                        }
                        else if (BatchStatus === true) {
                           
                            let presentStatus = false;
                            presentId[index].user.id.map(presentdata => {
                             
                                if (presentdata === student._id && presentStatus === false) {
                                    presentStatus = true;
                                    status.push("present")
                                }
                            })

                            if (presentStatus === false) {
                                status.push("absent")
                            }
                        }
                    }
                    else {
                        status.push("holiday")
                    }

                    
                    setAttendanceStatus(status)

                    checkDate = checkDate + 1
                    for (let i = 1; i < (parseInt(attendanceData[index + 1].date) - parseInt(data.date)); i++) {
                     
                        if (daysName !== 'fri') {
                          
                            missingDays.push(checkDate)
                            status.push("not marked")
                        }

                        else {
                            
                            status.push("holiday")
                        }
                        daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];


                    }

                }

                else {
                  
                    if (daysName !== 'fri') {
                        let BatchStatus = false;
                        data.Batch.map(element => {
                            if (element === "ST/2023/08/SH02/02") {
                                BatchStatus = true
                            }
                        })

                        if (BatchStatus === false) {
                            status.push("not marked")
                        }
                        else if (BatchStatus === true) {
                          
                            let presentStatus = false;
                            presentId[index].user.id.map(presentdata => {
                               
                                if (presentdata === student._id && presentStatus === false) {
                                    presentStatus = true;
                                    status.push("present")
                                }
                            })

                            if (presentStatus === false) {
                                status.push("absent")
                            }
                        }
                    }
                    else {
                        status.push("holiday")
                    }
                }

             
                setAttendanceStatus(status)
                checkDate = checkDate + 1;
            
            }

        })

     

        status.map(async (data, index) => {
            if (data === 'absent') {
                if (((status.length) - (index + 1)) > 1) {
                    if (status[index + 1] === 'absent' && status[index + 2] === 'absent') {
                     
                        let checkId = [student._id]
                      
                    }
                }
            }
        })

    }

    return (
        <>
            <Header />
           
            <div className="row attendance-row">
                <div className="col-md-12">
                    <h4 className='stu'>Attandance Sheet</h4>
                    <div className="table-responsive">
                        <div className="sheet">
                            <div className="Full-atta">
                                <h3>Name:</h3>
                                <h4>{student && student.Name}</h4>
                            </div>
                            <div className="Full-atta">
                                <h3>Course:</h3>
                                <h4>{student && student.Course}</h4>
                            </div>
                            <div className="Full-atta">
                                <h3>Trainer Name:</h3>
                                <h4>{student && student.TrainerName}</h4>
                            </div>
                            <div className="Full-atta">
                                <h3>Batch Time:</h3>
                                <h4>{student && student.BatchTiming}</h4>
                            </div>

                        </div>

                        <select value={currentMonth} onChange={e => setCurrentMonth(e.target.value)}>
                            {month.map(data => {
                                return (
                                    <option value={data}>{data}</option>
                                )
                            })
                            }
                        </select>

                        <button onClick={FullAttand}>filter</button>

                        <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                            <thead>
                                <tr>

                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                    {/* <th scope="col">Action </th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {attendanceStatus && attendanceStatus.map((data, index) => {
                                    // console.log('start date =', startDate)
                                    tempFullDate = `${startDate + index}/${currentMonth}/${currentYear}`

                                    return (
                                        <tr>
                                            <td>{tempFullDate}</td>
                                            <td>{data}</td>
                                            {/* <td><button className="btn btn-primary"><CreateIcon /></button></td> */}
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

export default Attandance