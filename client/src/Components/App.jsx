import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AllStudents from '../Students/AllStudents'
import AddStudents from '../Students/AddStudents'
import EditStudents from '../Students/EditStudents'
import AboutStudent from '../Students/AboutStudent'
import StudentProfile from '../Students/StudentProfile'
import StudentInbox from '../Students/StudentInbox'
import StudentLogout from '../Students/StudentLogout'
import StudentSignUp from '../Students/StudentSignUp'
import StudentCompose from '../Students/StudentCompose'
import AllTrainer from './Trainers/AllTrainer'
import TeacherDemo from './Trainers/TeacherDemo'
import DemoOverview from './Trainers/DemoOverview'
import AddTrainer from './Trainers/AddTrainer'
import TrainerAssignment from './Trainers/TrainerAssignment'
import EditTrainer from './Trainers/EditTrainer'
import AboutTrainer from './Trainers/AboutTrainer'
import SendMessage from './SendMessage'
import CounselorDashboard from './Counselor/CounselorDashboard'
import CAllStudents from './Counselor/CAllStudents'
import CAddCounselor from './Counselor/CAddStudents'
import Demo from './Counselor/Demo'
import CEditStudents from './Counselor/CEditStudents'
import CAboutStudents from './Counselor/CAboutStudents'
import CsendMessage from './Counselor/CsendMessage'
import CFeeCollection from './Counselor/CFeeCollection'
import CAddFee from './Counselor/CAddFee'
import CFeeReceipt from './Counselor/CFeeReceipt'
import SendMessages from './Counselor/SendMessages'
import Cslidebar from './Counselor/Cslidebar'
import { useContext } from 'react';
import { StudentContext } from '../context/StudentState';
import StudentState from '../context/StudentState'
import Assignment from '../Students/Assignment'
import './style.css'
import LogIn from '../Students/LogIn'
import Forget from '../Students/Forget'
import Newpassword from '../Students/NewPassword'
import StudentSlidebar from '../Students/StudentSlidebar'
import Attandance from './Trainers/Attandance'
import AttandanceSheet from './Trainers/AttandanceSheet'
import StudentAttandance from './Trainers/StudentAttandance'
import StudentAttendanceDetail from './Trainers/StudentAttendanceDetail'
import AttendanceDetail from './Trainers/AttendanceDetail'
import TrainerSlider from './Trainers/TrainerSlidebar'
import TrainerMessage from './Trainers/TrainerMessage'
import StudentMessage from '../Students/StudentMessage'
import NewBatch from './Counselor/NewBatch'
import RunningBatches from './RunningBatches'
import RegisteredStudent from './RegisteredStudent'
import RegisterStudentAdd from './Counselor/RegisterStudentAdd'
import StudentDashboard from '../Students/StudentDashboard'
import TrainerDashboard from './Trainers/TrainerDashboard'
import FeeTable from '../Fees/FeeTable'
import EditFee from '../Fees/EditFee'
import Addfee from '../Fees/Addfee'
import AllMessage from '../Students/AllMessage'
import ReadMessage from '../Students/ReadMessage'
import AllCounselor from './Counselor/AllCounselor'
import AboutCounselor from './Counselor/AboutCounselor'
import RunningBatchStudent from './Trainers/RunningBatchStudent'
import StudentAssig from '../Students/StudentAssig'
import FeeRecipt from '../Fees/FeeRecipt'
import EmbedGoogleMeet from '../Components/EmbedGoogleMeet'

// import Navbaar from './components/Navbaar';
export default function App() {
  let ContextValue = useContext(StudentContext);
  return (
      <BrowserRouter>
        <StudentState>
          <Routes>

            <Route exact path='/googlemeet' element={<EmbedGoogleMeet />} />
            <Route exact path='/' element={<LogIn />} />
            <Route exact path='admin/' element={<Home />} />
            <Route exact path='admin/AllCounselor' element={<AllCounselor />} />
            <Route exact path='admin/Sendmessage' element={[<Sidebar />, <SendMessage />]} />
            <Route exact path='admin/attendenceSheet' element={<AttandanceSheet />} />
            <Route exact path="admin/AllStudents" element={<AllStudents />} />
            <Route exact path="admin/AddStudents" element={<AddStudents />} />
            <Route exact path="admin/RegisteredStudent" element={<RegisteredStudent />} />
            <Route exact path="EditStudents/:id" element={[<Sidebar />, <EditStudents />]} />
            <Route exact path="student/" element={ <StudentDashboard />} />
            <Route exact path="student/Sendmessage" element={[<StudentSlidebar />, <StudentMessage />]} />
            <Route exact path="/student/StudentAssig" element={[<StudentSlidebar />, <StudentAssig />]} />
            <Route exact path="fullattendance/:id" element={[<StudentSlidebar />, <Attandance />]} />
            <Route exact path="Aboutstudent/:id" element={[<Sidebar />, <AboutStudent />]} />
            <Route exact path="AboutTrainer/:id" element={[<Sidebar />, <AboutTrainer />]} />
            <Route exact path="AboutCounselor/:id" element={[<Sidebar />, <AboutCounselor />]} />
            {/* <Route exact path="FeesCollection" element={<FeesCollection />} /> */}
            <Route exact path="admin/New-Batch" element={<NewBatch />} />
            <Route exact path="admin/Running-batches" element={<RunningBatches />} />
            <Route exact path="admin/AddFees/:id" element={<Addfee />} />
            <Route exact path="/FeesTable" element={<FeeTable />} />
            <Route exact path="/FeeRecipt" element={<FeeRecipt />} />
            <Route exact path="/EditFee/:id" element={<EditFee />} />
            <Route exact path="StudentProfile" element={<StudentProfile />} />
            <Route exact path="StudentInbox" element={<StudentInbox />} />
            <Route exact path="StudentLogout" element={<StudentLogout />} />
            <Route exact path="StudentSignUp" element={<StudentSignUp />} />
            <Route exact path="StudentCompose" element={<StudentCompose />} />
            <Route exact path="AllTrainer" element={<AllTrainer />} />
            <Route exact path="TeacherDemo" element={<TeacherDemo />} />
            <Route exact path="DemoOverview" element={<DemoOverview />} />
            <Route exact path="AddTrainer" element={<AddTrainer />} />
            <Route exact path="EditTrainer" element={<EditTrainer />} />
            <Route exact path="counsellor/" element={[<Cslidebar />, <CounselorDashboard />]} />
            <Route exact path="trainer/" element={ <TrainerDashboard />} />
            <Route exact path="/trainer/attendence" element={<StudentAttandance />} />
            <Route exact path="/trainer/assignment" element={ <TrainerAssignment />} />
            <Route exact path="/trainer/demooverview" element={ <DemoOverview />} />
            <Route exact path="/trainer/teacherdemo" element={ <TeacherDemo />} />
            <Route exact path="/trainer/TrainerMessage" element={ <TrainerMessage />} />
            <Route exact path='/counselor' element={<CounselorDashboard />} />
            <Route exact path="/counselor/AllStudents" element={<CAllStudents />} />
            <Route exact path="RegisterStudentAdd" element={[<Sidebar/>, <RegisterStudentAdd />]} />
            <Route exact path="counselor/RegisterStudentAdd" element={[<Cslidebar/>, <RegisterStudentAdd />]} />
            <Route exact path="counselor/RegisteredStudent" element={[ <Cslidebar/>,<RegisteredStudent/>]} />
            <Route exact path="RegisteredStudent" element={[<Sidebar/>, <RegisteredStudent/>]} />
            <Route exact path="admin/AddCounselor" element={ <CAddCounselor />} />
            <Route exact path="counselor/RegisterStudentAdd" element={[<Cslidebar />, <RegisterStudentAdd />]} />
            <Route exact path="/counselor/Demo" element={[<Cslidebar />, <Demo />]} />
            <Route exact path="/counselor/SendMessage" element={[<Cslidebar />, < CsendMessage />]} />
            <Route exact path="/counselor/demooverview" element={[<Cslidebar />, <DemoOverview />]} />
            <Route exact path="CEditStudents" element={[<CEditStudents />]} />
            <Route exact path="CAboutStudents" element={<CAboutStudents />} />
            <Route exact path="CFeeCollection" element={<CFeeCollection />} />
            <Route exact path="CAddFee" element={<CAddFee />} />
            <Route exact path="CFeeReceipt" element={<CFeeReceipt />} />
            <Route exact path="SendMessages" element={<SendMessages />} />
            <Route exact path="Assignment" element={<Assignment />} />
            <Route exact path="forget" element={<Forget />} />
            <Route exact path="resetpassword" element={<Newpassword />} />
            <Route exact path="/trainer/attendencedetail" element={<AttendanceDetail />} />
            <Route exact path="studentAttendanceDetail" element={[<Header />, <Sidebar />, <StudentAttendanceDetail />]} />
             {/* <Route exact path="EditFee" element={[<Header />, <Sidebar />, <EditFee />]} />  */}
            <Route exact path="Aboutstudent/64d9f16d31f0e4f016407880/AllMessage/:id" element={<AllMessage />} />
            <Route exact path="/ReadMessage" element={<ReadMessage />} />
            <Route exact path="admin/Running-batches/Student" element={<RunningBatchStudent/>} />
          </Routes>
          <Footer />
        </StudentState >
      </BrowserRouter >
     

  )
}
