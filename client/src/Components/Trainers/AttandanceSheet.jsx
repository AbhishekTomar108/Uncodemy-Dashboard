import React, { useEffect, useState, useContext } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../../context/StudentState'

function AttandanceSheet() {

  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let dayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

  const [trainer, setTrainer] = useState()
  const [runningBatch, setRunningBatch] = useState()
  const [course, setCourse] = useState()
  const [allStudentData, setAllStudentData] = useState(JSON.parse(localStorage.getItem('allStudent')))
  const [lastDay, setLastDay] = useState(new Date().getDate())
  const [firstDay, setFirstDay] = useState(1)
  const [filteredMonth, setFilteredMonth] = useState(monthName[((new Date().getMonth()))])
  let currentMonth = monthName[((new Date().getMonth()))]
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [allAttendance, setAllAttendance] = useState()
  //   setAllStudentData(JSON.parse(localStorage.getItem('allStudent')))

  let ContextValue = useContext(StudentContext);

  const navigation = useNavigate()

  const [inpval, setINP] = useState({
    startdate: '',
    enddate: '',

  })

  const [detail, setDetail] = useState({

    trainer: null,
    batch: null,
  })


  useEffect(() => {
    fetchAdminStatus()
    getTrainer()
    getBatch()
    getCourse()
  }, [])

  const getTrainer = async () => {
    const trainerData = await ContextValue.getAllTrainer();
    setTrainer(trainerData)
  }

  const getBatch = async () => {
    const batchData = await ContextValue.getRunningBatch();
    setRunningBatch(batchData.runningBatches)

  }

  const getCourse = async () => {
    const courseData = await ContextValue.getAllBatchCourse();
    setCourse(courseData.batchCourse[0].Course)
  }

  async function fetchAdminStatus() {
    try {
      const status = await ContextValue.checkAdmin();

      //console.log.log('status of admin =', status);
      if (status.status === "active") {
        getAttendance();
      }
      else {
        navigation('/')
        alert('you are not authorized')
      }

    } catch (error) {

    }
  }

  const [attendanceData, setAttendanceData] = useState()
  const [currentStudent, setCurrentStudent] = useState((JSON.parse(localStorage.getItem('allStudent'))))
  const [dayRows, setDayRows] = useState([])
  const [attendenceRows, setAttendanceStatus] = useState([])




  const filterStudent = () => {
    let filterStudent = allStudentData.filter((data, index) => {

      return (detail.trainer != null ? data.TrainerName === detail.trainer : data.TrainerName) && (detail.batch != null ? data.Batch === detail.batch : data.Batch) && (detail.course != null ? data.Course === detail.course : data.Course)

    })

    setCurrentStudent(filterStudent)
    extractAttendance(allAttendance, filterStudent)

  }

  const getAttendance = async () => {

    console.log('first last ', filteredMonth)
    let filterStatus = await fetch('http://localhost:8000/filterAttendance', {

      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: currentYear, month: filteredMonth, batch:detail.batch, TrainerID:detail.trainer})
    })
    let data = await filterStatus.json()
    console.log('data =', data)

    setAllAttendance(data)
    extractAttendance(data, currentStudent)

  }


  const filterDateByDate =(attendance,i)=>{
 
 
      return(attendance.filter(data=>{
        return data.date==i
      }))

    
  }

  const extractAttendance = (data, currentStudent) => {

    let tempDayRows = dayRows
    let tempAttendenceRows = attendenceRows
    tempAttendenceRows = []
    tempDayRows = []

    for (let i = firstDay; i <= lastDay; i++) {
      let daysName = dayName[(new Date(currentYear, monthName.indexOf(filteredMonth), i).getDay())];

      tempDayRows.push(
        <th className='days'>
          <span>{i}
          </span>
          <span className='daysName'>{daysName}
          </span>
        </th>
      )
    }


    console.log("current student =", currentStudent)
 
    currentStudent.map((studentData, index) => {
      // console.log('temp attendance =',tempAttendenceRows)
      tempAttendenceRows[index] = []
      let attendanceIndex =0; 
      for (let i = firstDay; i <= lastDay; i++) {
    
     
        // console.log("attendance index",attendanceIndex)
        // console.log('first day last day=',firstDay,lastDay)
        let daysName = dayName[(new Date(currentYear, monthName.indexOf(filteredMonth), i).getDay())];
        let filterAttendance = filterDateByDate(data.filterAttendance,i)
  
        

          if (filterAttendance.length!=0) {
            // console.log("inside if attendance index",attendanceIndex,filterAttendance)
            let presentStatus = false;

            if (daysName === 'fri') {
            
              tempAttendenceRows[index].push(<td className='text-warning'>H</td>)
            
            }

            else {

              data.studentId[attendanceIndex].presentId.map(element => {

                if (studentData._id === element && presentStatus === false) {
                  tempAttendenceRows[index].push(<td className='text-success'>P</td>)
                  presentStatus = true;
                  
                }
              })
              attendanceIndex = attendanceIndex+1

              if (presentStatus === false) {
                tempAttendenceRows[index].push(<td className='text-danger'>A</td>)
               
              }
            }

            
          }

          else{
            if (daysName === 'fri') {
            
              tempAttendenceRows[index].push(<td className='text-warning'>H</td>)
              
            }
            else{
              tempAttendenceRows[index].push(<td className='text-danger'>N M</td>)
            }
          }


        
        
      }

    })




    setDayRows(tempDayRows)
    setAttendanceStatus(tempAttendenceRows)
  }

  document.title = "StudentDashboard - Attendance Sheet"

  const currentDate = new Date()
  const day = currentDate.getDay()
  let tempDays = currentDate.getDate()

  let tempAttendenceRows = [];
  let tempDayRows = []

  for (let i = 1; i <= tempDays; i++) {
    let daysName = dayName[(new Date(currentYear, filteredMonth, i).getDay())];
    tempDayRows.push(
      <th className='days'>
        <span>{i}
        </span>
        <span className='daysName'>{daysName}
        </span>
      </th>
    )
    if (daysName === 'fri') {

      tempAttendenceRows.push(<td className='text-warning'>H</td>)
    }
    else {
      tempAttendenceRows.push(<td className='text-success'>p</td>)
    }
  }

  



  const filterAttendance = async () => {

    const beginningDate = new Date(inpval.startdate)
    const endingDate = new Date(inpval.enddate)
    const year = beginningDate.getFullYear();
    const month = beginningDate.getMonth();
    const startday = beginningDate.getDate();
    const endday = endingDate.getDate();

    console.log("start day =", startday, endday)

    let filterStatus = await fetch('http://localhost:8000/filterAttendance', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: year.toString(), month: monthName[month], startday: startday, endday: endday })
    })


    let data = await filterStatus.json()
    console.log('data filter =', data)
    setAllAttendance(data)
    extractAttendance(data, currentStudent)

  }

  const setMonth =(month)=>{
    console.log('month =',month)
    setFilteredMonth(month)

    if(month==currentMonth){
      console.log('current month =',month)
      setLastDay(new Date().getDate())
    }
else{
  const lastDayOfMonth = new Date(currentYear, monthName.indexOf(month) + 1, 0);
  let lastDate = lastDayOfMonth.getDate();
  setLastDay(lastDate)
  console.log("last date =",lastDate)
}
   
  

  }


  return (
    <>
      <Header />
      <Sidebar />

      <div className='select-message'>
        <div className="batch-thumb thumb">
          <label className="form-label">Trainer Name :</label>
          <select className="custom-select mr-sm-2" required name='trainer' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })}>
            <option selected>Choose...</option>
            {trainer && trainer.map(data => {
              return (
                <option value={data.Name}>{data.Name}</option>
              )
            })}

          </select>
        </div>
        <div className="batch-thumb thumb">
          <label className="form-label"> Batch :</label>
          <select className="custom-select mr-sm-2" required name='batch' onChange={(e) => setDetail({ ...detail, [e.target.name]: e.target.value })} >
            <option selected>Choose Batch...</option>
            {runningBatch && runningBatch.map(data => {
              return (
                <option value={data.Batch}>{data.Batch}</option>
              )
            })}
          </select>
        </div>
        <button className='filter-btn' onClick={filterStudent}>Filter</button>
      </div>
      <div className="start-end-section">
        <div className="start-section">
          <select onChange={e=>setMonth(e.target.value)}>
            <option disabled selected>--Choose Month--</option>
            {
              monthName.map(data=>{
                return(
                  <option value={data}>{data}</option>
                )
              })
            }
          </select>
        </div>
       
        <div className="search">
          <button className='btn btn-primary' onClick={getAttendance}>Search</button>
        </div>
      </div>

      <div className="table-responsive recentOrderTable">
        <table className="table verticle-middle table-responsive-md attendence-detail-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              {dayRows.length != 0 && dayRows}
            </tr>
          </thead>
          <tbody>
            {currentStudent && currentStudent.map((data, index) => {
              return (
                <tr>
                  <td>{data.Name}</td>
                  {attendenceRows.length != 0 && attendenceRows[index]}
                </tr>
              )
            })
            }

          </tbody>
        </table>
      </div>

    </>
  )
}

export default AttandanceSheet