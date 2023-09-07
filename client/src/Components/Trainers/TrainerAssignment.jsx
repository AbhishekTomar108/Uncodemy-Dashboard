import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { StudentContext } from '../../context/StudentState';
import TrainerSlidebar from './TrainerSlidebar';

function Assignment() {
  const ContextValue = useContext(StudentContext);
  const [trainerBatch, setTrainerBatch] = useState([]);
  const [batchStatus, setBatchStatus] = useState(true);
  const [runningBatch, setRunningBatch] = useState([]);
  const [filter, setFilter] = useState({
    course: '',
    batch: '',
  });

  const getTrainerBatch = async (TrainerName) => {
    try {
      const TrainerBatch = await ContextValue.getBatchByTrainer(TrainerName);
      console.log('trainer Batch =', TrainerBatch);
      setTrainerBatch(TrainerBatch);
    } catch (error) {
      console.error('Error fetching trainer batch:', error);
    }
  };

  const [trainer, setTrainer] = useState(
    JSON.parse(localStorage.getItem('individualTrainer'))
  );

  const navigation = useNavigate();
  const trainerData = JSON.parse(localStorage.getItem('trainerData'));

  const [link, setLink] = useState();
  const [inpval, setINP] = useState({
    trainer: trainerData.Name,
    file: null,
    Trainer: trainerData._id,
  });

  const [classUrlInfo, setClassUrlInfo] = useState({
    trainerName: trainerData.Name,
    classUrl: '',
    Trainer: trainerData._id,
  });

  const [videoUrlInfo, setVideoUrlInfo] = useState({
    trainerName: trainerData.Name,
    videoUrl: '',
    Trainer: trainerData._id,
    VideoTitle: '',
  });

  const [status, setStatus] = useState('uploaded');
  const [uploadedStatus, setUploadedStatus] = useState('assignment');
  const [assignmentStatus, setAssignmentStatus] = useState('PDF');
  const [batch, setBatch] = useState('');

  useEffect(() => {
    const trainerName = JSON.parse(localStorage.getItem('individualTrainer'))
    getTrainerBatch(trainerName);
    fetchTrainerStatus();
    getTrainerdata();
  }, []);

  async function fetchTrainerStatus() {
    try {
      const status = await ContextValue.checkTrainer();

      console.log('status of trainer =', status);
      if (status.status === 'active') {
        getTrainerBatch(status.data.Name);
      } else {
        navigation('/');
        alert('you are not authorized');
      }
    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  const handleFileChange = (e) => {
    console.log('file =', e.target.files[0]);
    setINP({ ...inpval, file: e.target.files[0] });
  };

  const uploadAssignment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const field in inpval) {
      formData.append(field, inpval[field]);
    }

    formData.append('batch', batch);

    try {
      const res = await fetch('http://localhost:8000/uploadfile', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Data', data);
    } catch (error) {
      console.log('error =', error.message);
    }
  };

  const uploadAssignmentUrl = async (e) => {
    e.preventDefault();

    let tempInpVal = inpval;
    tempInpVal.batch = batch;

    try {
      const res = await fetch('http://localhost:8000/uploadAssignmentUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempInpVal),
      });

      const data = await res.json();
      console.log('Data', data);
    } catch (error) {
      console.log('error =', error.message);
    }
  };

  const uploadVideoUrl = async (e) => {
    console.log('video =',videoUrlInfo)
    e.preventDefault();
    const formData = new FormData();

    let tempvideoUrl = videoUrlInfo;
    tempvideoUrl.batch = batch;

    for (const field in videoUrlInfo) {
      formData.append(field, videoUrlInfo[field]);
    }

    formData.append('batch', batch);

    try {
      const res = await fetch('http://localhost:8000/uploadVideoUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempvideoUrl),
      });

      const data = await res.json();
      console.log('Data', data);
    } catch (error) {
      console.log('error =', error.message);
    }
  };

  const sendClassUrl = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const field in classUrlInfo) {
      console.log('field =', field, classUrlInfo[field]);
      formData.append(field, classUrlInfo[field]);
    }
    console.log('class info', classUrlInfo);
    try {
      const res = await fetch('http://localhost:8000/uploadClassUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classUrlInfo),
      });

      const data = await res.json();
      console.log('Data', data);
    } catch (error) {
      console.log('error =', error.message);
    }
  };

  const getTrainerdata = async () => {
    try {
      const res = await fetch('http://localhost:8000/document', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('Assignment Data', data.documents);
      setLink(data.documents);
    } catch (error) {
      console.error('Error fetching trainer data:', error);
    }
  };

  const getBatch = async (trainerName) => {
    let batchData = await ContextValue.getRunningBatch();

    batchData = batchData.runningBatches.filter((data) => {
      return data.Trainer === trainerName;
    });
    console.log('batch data from assignment=', batchData);
    setRunningBatch(batchData);
  };

  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <TrainerSlidebar/>
      <div className="assignment-main-container">
        <div class="dashboard-navigation-section">
          <h4 onClick={(e) => setStatus('uploaded')}>Uploaded</h4>
          <h4 onClick={(e) => setStatus('Sunmitted')}>Sunmitted</h4>
        </div>

        {trainerBatch.length!=0 && (
          <select
            className="custom-select mr-sm-2"
            name="batch"
            onChange={(e) => {
              setBatch(e.target.value);
              setBatchStatus(false);
            }}
          >
            <option disabled selected>
              Select Batch
            </option>

            
              {trainerBatch.map((data) => {
                console.log("trainer batch =",data)
                return <option value={data.Batch}>{data.Batch}</option>;
              })}
          </select>
        )}

        <div className="Assignment-container">
          {status === 'uploaded' && (
            <div>
              <div class="dashboard-navigation-section">
                <h4 onClick={(e) => setUploadedStatus('assignment')}>Assignment</h4>
                <h4 onClick={(e) => setUploadedStatus('Video')}>Video</h4>
              </div>
              {uploadedStatus === 'assignment' && (
                <div>
                  <div class="dashboard-navigation-section">
                    <h4 onClick={(e) => setAssignmentStatus('PDF')}>PDF</h4>
                    <h4 onClick={(e) => setAssignmentStatus('Link')}>Link</h4>
                  </div>

                  <div className="Assi-cont">
                    {assignmentStatus === 'PDF' && (
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">File</label>
                          <input
                            type="file"
                            value={inpval.Name}
                            onChange={handleFileChange}
                            name="Name"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <button
                          type="submit"
                          onClick={uploadAssignment}
                          disabled={batchStatus}
                          className="btn btn-primary"
                        >
                          Send
                        </button>
                      </div>
                    )}
                    {assignmentStatus === 'Link' && (
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Link</label>
                          <input
                            type="text"
                            onChange={(e) =>
                              setINP({ ...inpval, [e.target.name]: e.target.value })
                            }
                            name="url"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <button
                          type="submit"
                          onClick={uploadAssignmentUrl}
                          disabled={batchStatus}
                          className="btn btn-primary"
                        >
                          Send
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {uploadedStatus === 'Video' && (
                <div className="Assi-cont">
                  <div className="form-group">
                    <label className="form-label">Video Link</label>
                    <input
                      type="text"
                      value={videoUrlInfo.videoUrl}
                      onChange={(e) =>
                        setVideoUrlInfo({ ...videoUrlInfo, [e.target.name]: e.target.value })
                      }
                      name="videoUrl"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Video Title</label>
                    <input
                      type="text"
                      value={videoUrlInfo.VideoTitle}
                      onChange={(e) =>
                        setVideoUrlInfo({ ...videoUrlInfo, [e.target.name]: e.target.value })
                      }
                      name="VideoTitle"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={uploadVideoUrl}
                    disabled={batchStatus}
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          )}

          {status === 'Sunmitted' && (
            <div className="main-link-div Assi-cont">
              <div className="assignment-place">
                <table
                  id="datatable"
                  className="table table-striped table-bordered"
                  cellspacing="0"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Submitted.</th>
                      <th>Date.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {link &&
                      link.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.otherurl}</td>
                          <td>{data.date}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default Assignment;
