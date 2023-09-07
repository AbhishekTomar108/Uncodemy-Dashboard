import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function VideoAssignment(props) {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const getTrainerdata = async () => {
        const res = await fetch(`http://localhost:8000/getuploadVideoUrl`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Batch":props.Batch
            }
        });
        const data = await res.json();
        console.log("Assignment Data ", data);
        setVideos(data);
    };

    useEffect(() => {
        getTrainerdata();
    }, []);

    const handleClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <>
            <div className='other-link'>
                <div className='other-link-container'>
                    <h3 className='first-heading'>Video </h3>
                    <table id="datatable" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                        {/ ...Table header /}
                        <tbody>
                            {videos.map((video, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{video.VideoTitle}</td>
                                    <td>{video.videoUrl}</td>
                                    <td>{video.date}</td>
                                    <td>
                                        <button
                                            className="btn btn-success text-light"
                                            data-toggle="modal"
                                            data-target={`#myModal-${index}`} // Unique ID for each modal
                                            onClick={() => handleClick(video)}
                                        >
                                            <RemoveRedEyeIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {videos.map((video, index) => (
                <div key={index} className="modal fade" id={`myModal-${index}`} tabIndex="-1" role="dialog" aria-labelledby={`myModalLabel-${index}`} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <iframe
                                    title="Google Meet Recording"
                                    width="800"
                                    height="700"
                                    src={video.videoUrl}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
