import React from 'react'
import CreateIcon from '@mui/icons-material/Create';

function studentAttendanceDetail() {
    return (
        <>
            <div>
                <div className='Attendance-detail'>
                    <h4>Name</h4>
                    <h4>Course</h4>
                    <h4>Joining Date</h4>
                    <h4>Trainer</h4>
                </div>
                <table className="table verticle-middle table-responsive-md attendence-detail-table">
                    <thead>
                        <tr>

                            <th scope="col">Date</th>
                            <th scope="col">status</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr >

                            <td>15-05-2022</td>
                            <td>Present</td>
                            <td>
                                <button className="btn btn-primary"><CreateIcon /></button>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </>
    )
}

export default studentAttendanceDetail