import React from 'react'

const AssignmnetStatus = () => {
  return (
    <div><>
      
    <div className='main-personalInfo'>
        <div className='arrow'>
            {/* <Link className='btn arrow-background' to="/"><span className="material-symbols-outlined ">arrow_back</span></Link> */}
          
        </div>
        <div className='main-form'>
            <form action="" className='form'>
                <div class="preview text-center">
                    {/* <img class="preview-img" src={p alt="Preview Image" width="100" height="100" /> */}
                    <span class="Error"></span>
                </div>

                <div class="form-group">
                    {/* <label><h4 style={{color:"Black"}}>Assignment Status: </h4></label> */}
                    <table className='table'>
                        <tr>
                            <th>S.No.</th>
                            <th>Status.</th>
                            <th>Date.</th>
                        </tr>
                        <tr>
                                <th>1</th>
                                <th></th>
                                <th>Date : 20/12/2024</th>
                            </tr>
                            <tr>
                                <th>2</th>
                                <th></th>
                                <th>Date : 20/12/2024</th>
                            </tr>
                            
                    </table>


                </div>

                {/* <div class="form-group">
                    <label><h4 style={{color:"Black"}}>Submited Date: </h4></label>

                </div> */}
                {/* 
                <div class="form-group">
                    <label><h4> Joining Date:</h4></label>

                </div>

                <div class="form-group">
                    <label><h4>Course: </h4></label>

                </div> */}

                {/* <div class="form-group">
                    <label><h4>Trainer Name: </h4></label>

                </div>

                <div class="form-group">
                    <label><h4>Batch Time: </h4></label>

                </div>

                <div class="form-group">
                    <label><h4>Address : </h4></label>

                </div> */}
                
            </form>
        </div>

    </div>


</></div>
  )
}

export default AssignmnetStatus