import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Iframe from 'react-iframe';

const Assignment = () => {

    document.title = "StudentDashboard - Assignment"
    const [link, setLink] = useState()
    const [inpval, setINP] = useState({
        otherurl: "",
        assigurl: "",
        classurl: "",
        file: null

    })

    // ------Upload Student Item----
    const handleFileChange = (e) => {
        console.log("file =", e.target.files[0])
        setINP({ ...inpval, file: e.target.files[0] });
    };



    const addinpdata = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const field in inpval) {
            formData.append(field, inpval[field]);
        }

        try {
            const res = await fetch('http://localhost:8000/assign', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            console.log("Data", data)
        }
        catch (error) {
            console.log('error =', error.message)
        }
    }

    const getTrainerdata = async () => {
        const res = await fetch("http://localhost:8000/getuploadAssignmentUrl", {

            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log("Assignment Data ", data)
        setLink(data)

    }



    const downloaduser = async (url) => {

        const res2 = await fetch(`http://localhost:8000/files/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.open(res2.url)
        // setImageUrl(res2.url)
    }

    useEffect(() => {
        getTrainerdata()
    }, [])

    const [showDocument, setShowDocument] = useState(false);

    const toggleDocument = () => {
        setShowDocument(!showDocument);
    };
    return (
        <>
            <div className='main-link-div'>
                <div className='link-container'>
                    <div className="assignment-link">
                        {/* <h1 className='first-heading'>Assignment</h1> */}
                        <div className='assignment-link-container'>
                            <div className='assignment-place'>

                                <table id="datatable" className="table table-striped table-bordered" cellspacing="0" width="100%" >
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>File.</th>
                                            <th>Url.</th>
                                            <th>Date.</th>
                                            <th>View.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {link && link.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{data.file}</td>
                                                <td>{data.url}</td>
                                                <td>{data.date}</td>
                                                <td>
                                                    <button className="btn btn-success text-light" onClick={toggleDocument}>
                                                        <RemoveRedEyeIcon />

                                                    </button>

                                                </td>
                                                {showDocument   ? 'Hide Document' : 'Show Document'}
                                                {showDocument && (
                                                    <Iframe
                                                        url={data.url} 
                                                        width="100%"
                                                        height="500px"                                                      
                                                        display="initial"
                                                        position="relative"
                                                    />
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <label></label>
                            <div className="fallback w-100">
                                <input className="dropify" type="file" onChange={handleFileChange} name="file" />
                                <button type="submit" onClick={addinpdata} className='btn btn-primary' >Send</button>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </>
    )
}

export default Assignment