import React, {useState} from 'react'
// import StudentContext from './StudentContext'
import  { createContext } from "react";

export const  StudentContext = createContext();



const StudentState = (props) => {

    const [loggedInPerson, setLoggedInperson] = useState();

    const [student, setStudent] = useState({
        Name:"",
        Number:"",
    })

    const [teacher, setTeacher] = useState({
        TrainerName:"",
        trainernumber:"",
    })
    const [Admin, setAdmin] = useState({
        TrainerName:"",
        trainernumber:"",
    })
    
    const updateLoggedInPerson=(personData) =>{
        setLoggedInperson(personData)
    }

    const updateStudent = (name, number)=>{
        setStudent({...student, Name:name, Number:number});
    }
    
    const updateTeacher = (name, number)=>{
        setTeacher({...teacher, TrainerName:name, trainernumber:number});
    }

    const updateAdmin = (name, number)=>{
        setAdmin({...teacher, TrainerName:name, trainernumber:number});
    }

    const checkAdmin = async()=>{
        let userStatus = await fetch("http://localhost:8000/fetchadmin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('admin')
            }
          });
      
          userStatus = await userStatus.json()
          return userStatus
    }

    const checkTrainer = async()=>{
        let userStatus = await fetch("http://localhost:8000/fetchtrainer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('trainer')
            }
          });
      
          userStatus = await userStatus.json()
          return userStatus
    }

    const checkStudent  = async()=>{
        let userStatus = await fetch("http://localhost:8000/fetchstudent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('student')
            }
          });
      
          userStatus = await userStatus.json()
          return userStatus
    }

    const checkCounsellor  = async()=>{
      let userStatus = await fetch("http://localhost:8000/fetchcounselor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('counselor')
          }
        });
    
        userStatus = await userStatus.json()
        return userStatus
  }

    const getAllBatchCourse =async()=>{
      let allbatchCourse = await fetch("http://localhost:8000/getAllBatches", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          allbatchCourse = await allbatchCourse.json()
          return allbatchCourse
    }

    const getRunningBatch =async()=>{
      let runningBatch = await fetch("http://localhost:8000/getrunningBatch", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          runningBatch = await runningBatch.json()
          return runningBatch
    }


    
    const getAllCounselor =async()=>{
      let allCounselor = await fetch("http://localhost:8000/getAllCounselor", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          allCounselor = await allCounselor.json()
          return allCounselor
    }
    const getAllTrainer =async()=>{
      let allTrainer = await fetch("http://localhost:8000/trainer", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          allTrainer = await allTrainer.json()
          return allTrainer
    }

    const getSingleStudent = async(id)=>{
      let Student = await fetch(`http://localhost:8000/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      Student = await Student.json()
      console.log("single student =",Student)
      return Student
    }

    const getSingleTrainer = async(id)=>{
      let Trainer = await fetch(`http://localhost:8000/trainer/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      Trainer = await Trainer.json()
      return Trainer
    }

    const getSingleCounselor = async(id)=>{
      let Counselor = await fetch(`http://localhost:8000/counselor/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      Counselor = await Counselor.json()
      return Counselor
    }

    const getAllStudent = async()=>{
      let allStudent = await fetch('http://localhost:8000/studentpro')

      allStudent = await allStudent.json()
      return allStudent
    }


    const getPaymentStatus = async (allStudent) => {
      console.log('get status');
      let current = new Date();
      
      for(let index=0; index<allStudent.length; index++) {
        console.log('index =',index)
        let due = new Date(allStudent[index].DueDate);
        const lastCollectionDate = new Date(allStudent[index].lastCollectionDate);
    
        const currentDateDiff = Math.floor((due - current) / (1000 * 60 * 60 * 24));
        const currentDateMonth = current.getMonth();
        const currentDateYear = current.getFullYear();
        const currentDate =   current.getDate();
        const dueDateMonth = due.getMonth();
        const dueDateYear = due.getFullYear();
        const dueDate = due.getDate()
        const lastCollectionDateMonth = lastCollectionDate.getMonth();

        console.log('current date =',currentDate,dueDate,currentDateDiff,lastCollectionDate)
    
        if (currentDateDiff >=0 && currentDateDiff<=3) {

          console.log('Payment status check for dueDate:', allStudent[index].DueDate);

          if (lastCollectionDateMonth === dueDateMonth) {
            console.log("Payment paid");
            let paymentStatus = await updatePaymentStatus("Payment paid", allStudent[index]._id);
            console.log("Payment status =",paymentStatus);
           
          } else {
            console.log("Payment notification");
            let paymentStatus = await updatePaymentStatus("Payment Notification", allStudent[index]._id);
            console.log("Payment status =",paymentStatus);

          }
        } else if (currentDate > dueDate) {
          console.log("current date is greater")
          if (lastCollectionDateMonth === dueDateMonth) {
            console.log("Payment paid");
            let paymentStatus = await updatePaymentStatus("Payment Paid", allStudent[index]._id);
            console.log("Payment status =",paymentStatus);


          } else {
            console.log("Payment pending");
            let paymentStatus = await updatePaymentStatus("Payment Pending", allStudent[index]._id);
            console.log("Payment status =",paymentStatus);

          }
        } else {
          console.log("Payment paid");
          let paymentStatus = await updatePaymentStatus("Payment Paid", allStudent[index]._id);
          console.log("Payment status =",paymentStatus);


        }
      };
    };
    
   
    
    //   const checkPaymentStatus = async()=>{
    //     console.log("student data =",Student)
    //   let current = new Date();
    
      
    //     let due = new Date(Student[index].DueDate);
    //     const lastCollectionDate = new Date(Student[index].lastCollectionDate);
    
    //     const currentDateDiff = Math.floor((due - current) / (1000 * 60 * 60 * 24));
    //     const currentDateMonth = current.getMonth();
    //     const currentDateYear = current.getFullYear();
    //     const currentDate = current.getDate();
    //     const dueDateMonth = due.getMonth();
    //     const dueDateYear = due.getFullYear();
    //     const dueDate = due.getDate()
    //     const lastCollectionDateMonth = lastCollectionDate.getMonth();
    
    //     console.log('current date =', currentDate, dueDate, currentDateDiff, lastCollectionDate)
    
    //     if (currentDateDiff >= 0 && currentDateDiff <= 3) {
    //       console.log('Payment status check for dueDate:', Student[index].DueDate);
    //       if (lastCollectionDateMonth === dueDateMonth) {
    //         console.log("Payment paid");
    //         let paymentStatus = await updatePaymentStatus("Payment paid", Student[index]._id);
    //         // const nextDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth() + 1, dueDate.getDate());
    //         // await updatelastCollectionDate(nextDueDate.toISOString(), Student[index]._id, "payment paid");
    //       } else {
    //         console.log("Payment notification");
    //         let paymentStatus = await updatePaymentStatus("Payment Notification", Student[index]._id);
    //       }
    //     } else if (currentDate > dueDate) {
    //       console.log("current date is greater")
    //       if (lastCollectionDateMonth === dueDateMonth) {
    //         console.log("Payment paid");
    //         let paymentStatus = await updatePaymentStatus("Payment Paid", Student[index]._id);
    //       } else {
    //         console.log("Payment pending");
    //         let paymentStatus = await updatePaymentStatus("Payment Pending", Student[index]._id);
    //       }
    //     } else {
    //       console.log("Payment paid");
    //       let paymentStatus = await updatePaymentStatus("Payment Paid", Student[index]._id);
    //     }
      

    // }

  
    const updatelastCollectionDate = async(nextDueDate,id,status)=>{
      console.log('update last date')
      let updatelastDate = await fetch(`http://localhost:8000/updatelastCollectionDate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body:JSON.stringify({lastCollectionDate:nextDueDate,paymentStatus:status })
      });
    }
    const updatePaymentStatus = async(status,id)=>{
      console.log('update payment')
      let updatePayment = await fetch(`http://localhost:8000/updatePaymentStatus/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body:JSON.stringify({paymentStatus:status})
      });

      updatePayment = await updatePayment.json()
       return updatePayment
  }

    const getBatchByTrainer = async(TrainerName)=>{

      let trainerBatch = await fetch(`http://localhost:8000/getTrainerBatch/${TrainerName}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }, 
      });

      trainerBatch = await trainerBatch.json()

      return trainerBatch

    }

    const getFiles = async(batch,trainerID)=>{
      let getFilesData = await fetch('http://localhost:8000/getfile',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "batch":batch,
          "TrainerID":trainerID
        }, 
      });
      getFilesData = await getFilesData.json()
      console.log("get files",getFilesData)
    }
    

  return (
    <div>
        <StudentContext.Provider value={{student:student,Admin:Admin, teacher:teacher , updateTeacher:updateTeacher ,updateAdmin:updateAdmin, updateStudent:updateStudent, loggedInPerson:loggedInPerson, updateLoggedInPerson:updateLoggedInPerson, checkAdmin:checkAdmin, checkTrainer:checkTrainer, checkStudent:checkStudent, getAllBatchCourse:getAllBatchCourse, getRunningBatch:getRunningBatch, getAllCounselor:getAllCounselor,getAllTrainer:getAllTrainer, getSingleStudent:getSingleStudent, getSingleTrainer:getSingleTrainer,getAllStudent:getAllStudent,checkCounsellor:checkCounsellor, getPaymentStatus:getPaymentStatus, getSingleCounselor:getSingleCounselor, getBatchByTrainer:getBatchByTrainer,getFiles:getFiles}}>
            {props.children}
        </StudentContext.Provider>
    </div>
  )
}

export default StudentState