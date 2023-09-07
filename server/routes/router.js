const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const app = express();
const uploadFile = require("../middleware/upload");
const controller = require("../controller/file.controller");
const users = require("../models/userSchema");
const document = require("../models/Document");
const uploads = require("../models/teachermodal");
const StudentFee = require("../models/FeeSchema");
const uploaditem = require("../models/UploadedItem");
const submititem = require("../models/Submitteditem");
const messagemodel = require("../models/Messagemodel");
const runningBatches = require("../models/RunningBatch");
const FixDemo = require("../models/FixDemo");
const inst = require("../models/inst");
const DataModel = require('../models/filterdata');
const multer = require("multer");
const bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fs = require("fs");
const path = require('path');
const baseUrl = "http://localhost:8000/files/";
const sendmail = require('../controller/sendmail');
const resetpassword = require("../controller/resetpassword");
const admins = require("../models/Admin")
const attendance = require("../models/Attendance")
const compiler = require('compilex');
const batches = require("../models/BatchCourse");
const runningBatch = require("../models/RunningBatch");
const registerStudent = require("../models/RegisteredStudent");
const counselors = require("../models/Counselor")
const uploadfiles = require('../models/UploadedItem')
const uploadclassurl = require('../models/UploadClassUrl')
const uploadvideourl = require('../models/VideoUrl')
const options = { stats: true }
compiler.init(options)


const jwt_secret = "uuu"

router.post("/register", controller.upload,  async (req, res) => {
    // console.log('url =',req.body,req.url,req.file)  
    req.body.url = req.url
    req.body.file = req.file
    req.body.CollectionDate =[]

    const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

    let tempRemark =[{
        "date":formattedDate,
        "message":req.body.Remark
    }]

    req.body.Remark = tempRemark

    if(req.body.remainingFees<=0){
        req.body.feesStatus = "Fees Completed"
    }
    else{
        req.body.feesStatus = "Fees Inmpleted"
    }
    
    const batchStartDate = new Date(req.body.BatchStartDate); // Assuming BatchStartDate is in a valid date format (e.g., 'YYYY-MM-DD')
    batchStartDate.setDate(batchStartDate.getDate() + 3); // Add 3 days
    
    if (batchStartDate.getDate() <= 3) {
      
      batchStartDate.setMonth(batchStartDate.getMonth());
      batchStartDate.setDate(3);
    }
    
    const dueDate = `${batchStartDate.getFullYear()}-${String(batchStartDate.getMonth() + 1).padStart(2, '0')}-${String(batchStartDate.getDate()).padStart(2, '0')}`;
 
    req.body.DueDate = dueDate;

    console.log("req body =",req.body)
    try {
        const newUser = new users(req.body);

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        // sendmail(req, res)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});


// get userdata
router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find().select("-password");
        // // console.log('user data =',userdata)
        res.status(200).json(userdata);
    } catch (error) {
        // console.log('error =', error.message)
        res.status(500).json(error);
    }
});


// register student

router.post("/registerStudent",controller.upload, async (req, res) => {
    req.body.url = req.url
    req.body.file = req.file
    try {
        const savedUser = await registerStudent.create(req.body);
        res.status(200).json(savedUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

//Get resister student

router.get("/getregisterStudent", async (req, res) => {
    try {
        const userdata = await registerStudent.find();
        res.status(200).json(userdata);
    } catch (error) {
        console.log('error =', error.message)
        res.status(500).json(error);
    }
});


router.post("/getStudentByCounselor", async (req, res) => {
    console.log("get student =",req.body)
    try {
        const userdata = await users.find(req.body);
        res.status(200).json(userdata);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/scan", async (req, res) => {
    const directoryPath = __basedir + "/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            const date = stats.mtime;
            fileInfos.push({
                file: file, // Change "name" to "file"
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
});
// get individual user
router.get("/getuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const userindividual = await users.findById(id);
        // // console.log("user individual =", userindividual);
        res.send({"status":"active", "userIndividual":userindividual});
    } catch (error) {
        res.status(500).json(error);
    }
});

// update user data
router.post("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // // console.log('req.body.user =', req.body)
        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        // // console.log(updateduser);
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete student
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await users.findByIdAndDelete(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Installment
router.get("/ins", async (req, res) => {
    try {
        const installments = await inst.find({});
        res.send(installments);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Teacher Assign
router.post("/uploadfile",controller.upload, async (req, res) => {
    req.body.url = req.url
    req.body.file = req.file
    try {
        // const newUser = new document(req.body);
        const savedUser = await uploadfiles.create(req.body);
        // console.log("Fee Data",savedUser);
        res.status(200).json(savedUser);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});
router.post("/uploadClassUrl", async (req, res) => {
    // console.log("class body",req.body)

    try {
        // const newUser = new document(req.body);
        const savedUser = await uploadclassurl.create(req.body);
        // console.log("Fee Data",savedUser);
        res.status(200).json(savedUser);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

//trainer upload item url video 
router.post("/uploadAssignmentUrl", async (req, res) => {
    console.log("upload file",req.body)
    try {
        const savedUser = await uploaditem.create(req.body);
        res.status(200).json(savedUser);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});


//Get by student upload item url video
router.get("/getuploadAssignmentUrl", async (req, res) => {
    try {
        const item = await uploaditem.find({});
        res.send(item);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json(error);
    }
});

//Video

router.post("/uploadVideoUrl", async (req, res) => {
console.log("video =",req.body)
    try {
        const savedUser = await uploadvideourl.create(req.body);
        res.status(200).json(savedUser);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

//get Video
router.get("/getuploadVideoUrl", async (req, res) => {
    const Batch = req.header('Batch')
    console.log('batch =',Batch)
    try {
        const item = await uploadvideourl.find({batch:Batch});
        console.log('student item =',item)
        res.send(item);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json(error);
    }
});


// Document
router.get("/document", async (req, res) => {
    try {
        const currentDate = new Date();
        const docum = await document.find({});

        const response = {
            documents: docum,
            date: currentDate
        };
        res.send(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

//  Student-profile
router.get("/studentpro", async (req, res) => {
    try {
        const student = await users.find({});
        console.log('student =',student)
        res.send(student);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/getTrainerBatch/:TrainerName",async(req,res)=>{
    const {TrainerName} = req.params

    try{
    let TrainerBatch = await runningBatch.find({Trainer:TrainerName})
    res.send(TrainerBatch)
}
catch(error){
    res.send({"error":error.message})
}


})

router.post("/updatePaymentStatus/:id", async(req,res)=>{
    const {id} = req.params
    try{
        let paymentStatus = await users.updateOne({_id:id}, { $set: {  paymentStatus: req.body.paymentStatus } }, { upsert: true })
      
           res.send({"status":200})
    }
    catch(error){
                // console.log("error =",error.message)
    }
})

router.post("/updatelastCollectionDate/:id", async(req,res)=>{
    const {id} = req.params
    try{
        let paymentStatus = await users.updateOne({_id:id}, { $set: { lastCollectionDate: req.body.lastCollectionDate, paymentStatus: req.body.paymentStatus } }, { upsert: true })
        // console.log("lastcollectionDate status =",paymentStatus)
           
    }
    catch(error){
                // console.log("error =",error.message)
    }
})

//Student-profile display in Trainer Component
router.get("/pro", async (req, res) => {
    try {
        const trainers = await users.find({});
        res.send(trainers);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Trainer profile
router.get("/trainer", async (req, res) => {
    console.log('trainer =',req.body)
  
    try {
      const trainers = await uploads.find({});
      // console.log("data =",trainers)
      res.send(trainers)
    }
    catch(error){
        console.log('error =',error.message)
        res.send({"error":error.message})
    }
    
  });
  

router.get("/trainer/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log('id =',id)

        const userindividual = await uploads.findById(id);
        // // console.log("user individual =", userindividual);
        res.send({"status":"active", "userIndividual":userindividual});
    } catch (error) {
        res.status(500).json(error);
    }
});



//Add Trainer


router.post("/Alltrainer", controller.upload, async (req, res) => {
    req.body.url = req.url
    req.body.file = req.file
    try {
        const newUser = new uploads(req.body);
        const savedUser = await newUser.save();
        // console.log("Fee Data",savedUser)
        res.status(200).json(savedUser);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});


//filter date wise data
router.get('/filterByMonth', async (req, res) => {
    const month = req.query.month;
    try {
        const filteredData = await DataModel.find({ JoiningDate: { $regex: month, $options: 'i' } }).exec();
        res.json(filteredData);
    } catch (error) {
        // // console.error('Error executing query:', error);
        res.status(500).send('Error executing query');
    }
});


//Login router for student

router.post("/student", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const username = await users.findOne({ email: email, password: password }).lean();
        // // console.log('status =', username.status, username)

        if (username) {

            if (username.status === "active") {
                const data = {
                    user: {
                        id: username._id
                    },
                }

                delete username.password;
                // // console.log('trim user =', username)
                const authtoken = await jwt.sign(data, jwt_secret)
                res.send({ "status": "active", "authtoken": authtoken, "username": username })
            }

            else {
                res.send({ "status": "deactive" })

            }
        }
        else {
            res.send({ "status": "false" })
        }

    } catch (error) {
        res.status(404).send({ "invalid Password": error.message })
    }
})
router.post("/counsellor", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log('email =',email, password)

        const username = await counselors.findOne({ Email: email, password: password }).lean();
        // console.log('status =', username)

        if (username) {

          
                const data = {
                    user: {
                        id: username._id
                    },
                }

                delete username.password;
                // // console.log('trim user =', username)
                const authtoken = await jwt.sign(data, jwt_secret)
                res.send({ "status": "active", "authtoken": authtoken, "username": username })
            

        }
        else {
            res.send({ "status": "false" })
        }

    } catch (error) {
        res.status(404).send({ "invalid Password": error.message })
    }
})


router.post("/addCounselor",controller.upload, async (req, res) => {
    sendmail(req,res)

    try {
        const email = req.body.email;
        const password = req.body.password;
        req.body.file = req.file
        const url = req.url
        // console.log('email =',email, password)

        const username = await counselors.create({ Email: email, password: password, Number:req.body.Number, Address:req.body.Address, Name:req.body.Name, url:url});
        // console.log('status =', username)

        if (username) {

          
                const data = {
                    user: {
                        id: username._id
                    },
                }

                delete username.password;
                // // console.log('trim user =', username)
                const authtoken = await jwt.sign(data, jwt_secret)
                res.send({ "status": "active", "authtoken": authtoken, "username": username })
            

        }
        else {
            res.send({ "status": "false" })
        }

    } catch (error) {
        res.status(404).send({ "invalid Password": error.message })
    }
})




// Login router for Trainer

router.post("/trainer", async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const username = await uploads.findOne({ Email: email, Password: password }).lean();


        if (username) {

            const data = {
                user: {
                    id: username._id
                },
            }

            delete username.password;
            // // console.log('trim user =', username)
            const authtoken = await jwt.sign(data, jwt_secret)
            res.send({ "status": "active", "authtoken": authtoken, "username": username })
        }

        else {
            res.send({ "status": "false" })
        }

    } catch (error) {
        res.status(404).send({ "invalid ": error.message })
    }
})

router.post("/counselor", async (req, res) => {
    console.log('counselor')

    try {
        const email = req.body.email;
        const password = req.body.password;

        const username = await counselors.findOne({ Email: email, Password: password }).lean();


        if (username) {

            const data = {
                user: {
                    id: username._id
                },
            }

            delete username.password;
            // // console.log('trim user =', username)
            const authtoken = await jwt.sign(data, jwt_secret)
            res.send({ "status": "active", "authtoken": authtoken, "username": username })
        }

        else {
            res.send({ "status": "false" })
        }

    } catch (error) {
        res.status(404).send({ "invalid ": error.message })
    }
})

router.post("/admin", async (req, res) => {
    console.log('admin =',req.body)
    try {
        const email = req.body.email;
        const password = req.body.password;

        const username = await admins.findOne({ email: email, password: password }).lean();
        console.log('status =', username)

        if (username) {

            if (username.status === "active") {
                const data = {
                    user: {
                        id: username._id
                    },
                }

                delete username.password;
                // // console.log('trim user =', username)
                const authtoken = await jwt.sign(data, jwt_secret)
                res.send({ "status": "active", "authtoken": authtoken, "username": username })
            }

            else {
                res.send({ "status": "deactive" })

            }
        }
        else {
            res.send({ "status": "false" })
        }

    } catch (error) {
        console.log('error =',error.message)
        res.status(404).send({ "invalid Password": error.message })
    }
})



router.post("/uploaditem", async (req, res) => {
    const itemName = req.body.fileName;
    const trainer = req.body.Name;
    const batch = req.body.batch;
    const course = req.body.course;

    try {
        let data = await uploaditem.create({
            itemName: itemName,
            trainer: trainer,
            batch: batch,
            course: course
        })
        res.send({ "success": true, "data": data })
    }
    catch (error) {
        res.send({ "error": error.message })
    }
})


router.get('/fetchuploadeditems', async (req, res) => {

    try {
        let fetchedItem = await uploaditem.find({})

        res.send({ "success": "true", "fetchData": fetchedItem })
    }

    catch (error) {
        res.send(error.message)
    }
})


router.post('/submititem', fetchuser, async (req, res) => {
    const fileName = req.body.fileName;
    const trainerName = req.body.trainerName;

    try {
        let studentData = await users.findOne({ _id: req.user.id });

        let submitItem = await submititem.create({
            itemName: fileName,
            student: studentData.Name,
            batch: studentData.BatchTiming,
            course: studentData.Course,
            trainerName: trainerName
        });

        res.send({ "success": true, "data": submitItem });
    } catch (error) {
        // // console.log("Error submitting item:", error);
        res.status(500).send({ "success": false, "error": "Error submitting item" });
    }
});


router.get('/fetchsubmititem', async (req, res) => {

    try {
        let fetchedItem = await submititem.find({})
        // // console.log(fetchedItem)

        res.send({ "success": "true", "fetchData": fetchedItem })
    }

    catch (error) {
        res.send(error.message)
    }
})


// --------- Send message By Admin to batch ------------

router.post('/sendmessage', async (req, res) => {
    // console.log("req body =",req.body)
    const message = req.body.message;
    const from = req.body.from;
    const checkid = req.body.checkid;
    const file = req.body.fileName;
    // // console.log('check id =', checkid, message, req.body)

    const data = {
        user: {
            id: checkid
        },
    }

    // // // console.log('data =', data.user)
    // // console.log('file type =', typeof (file), file)
    const messageauthtoken = await jwt.sign(data, jwt_secret)


    try {
        let senddata = await messagemodel.create({
            message,
            from,
            messageid: messageauthtoken,
            file: file
        })

        res.send(senddata)
    }
    catch (error) {
        res.send(error.message)
    }
})




router.post('/sendStudentMessage', async (req, res) => {
    // console.log("req body =",req.body)
    const message = req.body.message;
    const from = req.body.from;
    const checkid = req.body.checkid;
    const file = req.body.fileName;
    // // console.log('check id =', checkid, message, req.body)

    const data = {
        user: {
            id: checkid
        },
    }

    // // // console.log('data =', data.user)
    // // console.log('file type =', typeof (file), file)
    const messageauthtoken = await jwt.sign(data, jwt_secret)


    try {
        let senddata = await messagemodel.create({
            message,
            from,
            messageid: messageauthtoken,
            file: file
        })

        res.send(senddata)
    }
    catch (error) {
        res.send(error.message)
    }
})


// router.get('/receivemessage/:id', async (req, res) => {
//     let {id} = req.params


//     try {
//         let fetchedItem = await messagemodel.find({})
//         let message =[];
//         fetchedItem.map((data,index)=>{

//             const fetchData = jwt.verify(data.messageid, jwt_secret);
//             // // console.log('message =',data.messageid)


//             fetchData.user.id.filter(element=>{

//                 if(id===element.id){

//                     message.push(fetchedItem[index].message)
//                 }
//                 else{
//                     false
//                 }
//             })

//         })
//        // // console.log('message =',message)


//         res.send({ "success": "true", "message": "message" })
//     }
//     catch (error) {
//         res.send(error.message)
//     }
// });


router.get('/receivemessage/:id', async (req, res) => {
    let { id } = req.params

    try {
        let fetchedItem = await messagemodel.find({})
        let message = [];
        // console.log('message =',fetchedItem)
        fetchedItem.map((data, index) => {

            const fetchData = jwt.verify(data.messageid, jwt_secret);

            // console.log('message =',fetchData, id)

            // // console.log("user id type =", typeof (fetchData.user.id), index)
            fetchData.user.id.filter(element => {

                if (id === element.id) {
                    message.push({
                        message: fetchedItem[index].message,
                        from: fetchedItem[index].from,
                        date: fetchedItem[index].date
                    })
                }
                else {
                    false
                }
            })
        })
        // console.log('message 2 =', message)


        res.send({ "success": "true", "message": message })
    }
    catch (error) {
        res.send(error.message)
    }
});

router.post('/sendotp', async (req, res) => {
    res.send('hello')
})

router.post('/sendmail', async (req, res) => {
    // // console.log('from router =', req.body)
    sendmail(req, res)
})

router.post('/resetpassword', async (req, res) => {
    // // console.log('email =', req.body.email)
    try {
        const username = await users.findOne({ email: req.body.email });
        // // console.log('email username =', username)
        if (username) {
            resetpassword(req, res)

            const data = {
                user: {
                    email: username.email
                },
            }

            const authtoken = await jwt.sign(data, jwt_secret)
            res.send({ "send": "true", "resetlink": `http://localhost:3000/resetpassword?token=${authtoken}&user=${req.body.user}` })

        }
        else {
            res.send({ "send": "false" })
        }

    }
    catch (error) {
        // // console.log('error =', error)
        res.send({ "error": error })
    }


})

router.post('/newpassword', fetchuser, async (req, res) => {
    // // console.log("password =", req.body.newpassword, req.body.user)

    let fetchuserModel;
    if (req.body.user === "student") {
        fetchuserModel = users
    }


    try {
        let user = await fetchuserModel.findOne({ email: req.user.email });

        if (user) {
            let userPassword = await users.updateOne({ email: req.user.email }, { $set: { password: req.body.newpassword } })

            res.send({ "userpassword": userPassword })
        }
        else {
            res.send({ "response": "no user exist" })
        }
    } catch (error) {
        res.send({ "error": error.message })
    }

})

// --------compiler----
router.post('/compile', async (req, res) => {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang

    try {
        if (lang === "Cpp") {

            if (!input) {
                var envData = { OS: "windows", cmd: "g++" }; // (uses g++ command to compile )
                //else
                var envData = { OS: "linux", cmd: "gcc" }; // ( uses gcc command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" });
                    }
                    //data.error = error message 
                    //data.output = output value
                });

            }
            else {
                var envData = { OS: "windows", cmd: "g++" }; // (uses g++ command to compile )
                //else
                var envData = { OS: "linux", cmd: "gcc" }; // ( uses gcc command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" });
                    }
                });

            }
        }
        else if (lang === "Java") {
            if (!input) {
                var envData = { OS: "windows" };

                var envData = { OS: "linux" }; // (Support for Linux in Next version)
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" });
                    }
                });

            }
            else {
                var envData = { OS: "windows" };
                var envData = { OS: "linux" }; // (Support for Linux in Next version)
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" });
                    }
                });
            }
        }


        else if (lang === "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                //else
                var envData = { OS: "linux" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" });
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                //else
                var envData = { OS: "linux" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" });
                    }
                });

            }
        }
    }
    catch (error) {

    }
    //if windows  

})

router.post('/addAttendance',async(req,res)=>{
    const { fullDate, date, month, year, presentId, absentId, Batch, trainerId } = req.body;
    

    const presentdata = {
        user: {
            id: presentId
        },
    }
    const absentdata = {
        user: {
            id: absentId
        },
    }
    
    const presentauthtoken = await jwt.sign(presentdata, jwt_secret)
    const absentauthtoken = await jwt.sign(absentdata, jwt_secret)
    const addAttendance = await attendance.create({
        fullDate,
        date,
        month,
        year,
        presentId: presentauthtoken,
        absentId: absentauthtoken,
        Batch: [Batch],
        trainerId: [trainerId]
    })

    console.log("add attendance =",req.body,addAttendance)
    res.send({ "status": "true", "attendance": addAttendance })
})


router.post('/updateAttendance', async (req, res) => {
    const { fullDate, date, month, year, presentId, absentId, Batch, trainerId } = req.body;
    // console.log("req body =", req.body)

    // // console.log('batch  =',Batch)
    let existAttendance = await attendance.find({ fullDate });
    // console.log('exist attendance ', existAttendance, fullDate)

    // check exist attendance of given date

    if (existAttendance.length != 0) {

        let presentStudentId = jwt.verify(existAttendance[0].presentId, jwt_secret)
        let absentStudentId = jwt.verify(existAttendance[0].absentId, jwt_secret)

        let tempAbsentID = absentStudentId.user.id;
        let tempPresentID = presentStudentId.user.id;

        let removeabsentId = [];
        let removepresentId = [];

        let newPresentidStatus = false;
        absentStudentId.user.id.map((data, index) => {
            let status = false;
            presentId.map(element => {
                if (data === element) {
                    newPresentidStatus = true
                    status = true
                    tempPresentID.push(data)
                    removeabsentId.push(data)
                }
            }
            )
            // status === false ? tempAbsentID.push(data) : false
        })

        if (newPresentidStatus === false)
            presentId.map(data => {
                tempPresentID.push(data)
            })

        let newAbsentidStatus = false;
        presentStudentId.user.id.map((data, index) => {
            let status = false;
            absentId.map(element => {
                if (data === element) {
                    newAbsentidStatus = true
                    status = true;
                    tempAbsentID.push(data)
                    removepresentId.push(data)
                }
            }
            )
            // status === false ? tempPresentID.push(data) : false

        })

        if (newAbsentidStatus === false)
            absentId.map(data => {
                tempAbsentID.push(data)
            })

        // // // console.log('length of absent =', tempAbsentID.length)
        // // // console.log('length of present =', tempPresentID.length)

        presentStudentId.user.id = tempPresentID.filter(data => {
            matchStatus = false;
            removepresentId.map(element => {
                if (data === element) {
                    matchStatus = true
                }
            })
            return matchStatus === false ? data : false
        });
        absentStudentId.user.id = tempAbsentID.filter(data => {
            matchStatus = false;
            removeabsentId.map(element => {
                if (data === element) {
                    matchStatus = true
                }
            })
            return matchStatus === false ? data : false
        });;

        // // // console.log('present =', presentStudentId)
        // // // console.log('absent =', absentStudentId)



        // // // console.log('absent id =', tempAbsentID, absentStudentId.user.id.length, tempPresentID, presentStudentId.user.id.length)

        const presentauthtoken = await jwt.sign(presentStudentId, jwt_secret)
        const absentauthtoken = await jwt.sign(absentStudentId, jwt_secret)

        let trainerStatus = false;
        existAttendance[0].trainerId.map(data => {
            if (data === trainerId) {
                trainerStatus = true
            }
        })
        if (trainerStatus === true) {
            let batchStatus = false
            existAttendance[0].Batch.map(data => {
                if (data === Batch) {
                    batchStatus = true
                }
            })

            if (batchStatus === true) {
                let updateAttendance = await attendance.update({ fullDate: fullDate }, { $set: { absentId: absentauthtoken, presentId: presentauthtoken } })
                // // // console.log('updateAttendance =', updateAttendance)
                res.send({ "status": "true", "attendance": updateAttendance })
            }



            else {

                let tempBatch = existAttendance[0].Batch;
                tempBatch.push(
                    Batch
                )

                let updateAttendance = await attendance.update({ fullDate: fullDate }, { $set: { absentId: absentauthtoken, presentId: presentauthtoken, Batch: tempBatch } })
                // // // console.log('updateAttendance =', updateAttendance)
                res.send({ "status": "true", "attendance": updateAttendance })

            }
        }

        else {
            let tempBatch = existAttendance[0].Batch;
            tempBatch.push(
                Batch
            )

            let tempTrainer = existAttendance[0].trainerId;
            tempTrainer.push(
                trainerId
            )

            let updateAttendance = await attendance.update({ fullDate: fullDate }, { $set: { absentId: absentauthtoken, presentId: presentauthtoken, Batch: tempBatch, trainerId: tempTrainer } })
            // // // console.log('updateAttendance =', updateAttendance)
            res.send({ "status": "true", "attendance": updateAttendance })

        }
    }


})

router.post('/getAttendance', async (req, res) => {
    const { fullDate, Batch, trainerId } = req.body

    try {
        let attendanceData = await attendance.find({ fullDate, Batch, trainerId });
        console.log('attendance =',attendanceData,req.body)
        // console.log('attendance =', fullDate, attendanceData)

        attendanceData = attendanceData.sort((a, b) => {
            const dateA = new Date(`${a.fullDate}`);
            const dateB = new Date(`${b.fullDate}`);
            return dateA - dateB;
        });

        //   attendanceData = attendanceData.filter(data => {
        //     // console.log('data =', data);
        //     let batchStatus = false;
        //     data.Batch.map(batchElement => { // Use batchElement instead of element
        //         if (batchElement === Batch) { // Compare to the desired batch value
        //             batchStatus = true;
        //         }
        //     });
        //     return batchStatus; // Return data if batchStatus is true
        // });

        // attendanceData = attendanceData.filter(data => {
        //     // console.log('data =', data);
        //     let idStatus = false;
        //     data.trainerId.map(trainerid => { // Use batchElement instead of element
        //         if (trainerid === trainerId) { // Compare to the desired batch value
        //             idStatus = true;
        //         }
        //     });
        //     return idStatus; // Return data if batchStatus is true
        // });

        // console.log('attendance fetch =', attendanceData)
        if (attendanceData.length !== 0) {

            let presentStudentId = jwt.verify(attendanceData[0].presentId, jwt_secret)
            let absentStudentId = jwt.verify(attendanceData[0].absentId, jwt_secret)

            // // console.log('if')
            res.send({ 'status': "filled", 'monthAttendance': attendanceData, 'presentId': presentStudentId.user.id, 'absentId': absentStudentId.user.id })
        }

        else {
            res.send({ 'status': "empty" })
            // // console.log('else attendance = ',fullDate,attendanceData)
        }
    }
    catch (error) {

    }



})


router.post('/getMonthAttendance', async (req, res) => {
    let { month, year, currentDate } = { ...req.body }
    try {
        let getMonthAttendance = await attendance.find({
            "year": year,
            "month": month,
            "date": { "$lte": currentDate }
        });
        if (getMonthAttendance.length !== 0) {

            let presentStudentId = []
            let absentStudentId = []

            getMonthAttendance.sort((a, b) => {
                const dateA = new Date(`${a.fullDate}`);
                const dateB = new Date(`${b.fullDate}`);
                return dateA - dateB;
            });
            getMonthAttendance.map(data => {
                presentStudentId.push(jwt.verify(data.presentId, jwt_secret))
                absentStudentId.push(jwt.verify(data.absentId, jwt_secret))
            })

            // // console.log('month attendance =',getMonthAttendance)

            // let data = getMonthAttendance


            // // console.log("sorted data",getMonthAttendance);

            res.send({ "status": "filled", "monthAttendance": getMonthAttendance, 'presentId': presentStudentId, 'absentId': absentStudentId })
        }
        else {

            res.send({ "status": "empty" })
        }


    } catch (error) {
        res.send('error', error.message)
    }

})



router.post('/getthreeDaysAttendance', async (req, res) => {
    let { month, year, currentDate } = { ...req.body }
    // // console.log('current date',currentDate)
    try {
        let getMonthAttendance = await attendance.find({
            "year": year,
            "month": month,
            "date": { "$gte": currentDate, "$lte": ((currentDate - 2).toString()) }
        });
        // console.log('three days attendance =', getMonthAttendance, typeof (((currentDate - 2).toString())), ((currentDate - 2).toString()))
        if (getMonthAttendance.length !== 0) {

            let presentStudentId = []
            let absentStudentId = []

            getMonthAttendance.sort((a, b) => {
                const dateA = new Date(`${a.fullDate}`);
                const dateB = new Date(`${b.fullDate}`);
                return dateA - dateB;
            });users
            getMonthAttendance.map(data => {
                presentStudentId.push(jwt.verify(data.presentId, jwt_secret))
                absentStudentId.push(jwt.verify(data.absentId, jwt_secret))
            })

            // // console.log('month attendance =',getMonthAttendance)

            // let data = getMonthAttendance


            // // console.log("sorted data",getMonthAttendance);

            res.send({ "status": "filled", "monthAttendance": getMonthAttendance, 'presentId': presentStudentId, 'absentId': absentStudentId })
        }
        else {

            res.send({ "status": "empty" })
        }


    } catch (error) {
        res.send('error', error.message)
    }

})

// For Demo------
router.post("/demo", async (req, res) => {
    // // console.log('Date', req.body)
    try {
        const installment = await FixDemo.create({
            Name: req.body.Name,
            Email: req.body.Email,
            Trainer: req.body.Trainer,
            Course: req.body.Course,
            Date: req.body.Date,
            Time: req.body.Time,
            Background: req.body.Background,
            month: req.body.month,
            year: req.body.year,
            day: req.body.day,
            classLink: req.body.classLink
        });
        res.send(installment);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/Getdemo", async (req, res) => {
    try {
        const demo = await FixDemo.find({});
        res.send(demo);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/filterAttendance', async (req, res) => {
    let { year, month} = req.body
    
    // const startdayStr = startday < 10 ? '0' + startday : startday.toString();
    // const enddayStr = endday < 10 ? '0' + endday : endday.toString();
    // console.log('start end',typeof(startday),typeof(endday),startday,endday)
    // // console.log('startday', typeof (startday), year, month, endday)

    try {
        let filterAttendance = await attendance.find({
            "year": year,
            "month": month
        });
        // // console.log('filter =', filterAttendance)


        filterAttendance = filterAttendance.sort((a, b) => {
            const dateA = new Date(`${a.fullDate}`);
            const dateB = new Date(`${b.fullDate}`);
            return dateA - dateB;
        });

        let studentId = filterAttendance.map(data => {
            return {
                presentId: jwt.verify(data.presentId, jwt_secret).user.id,
                absentId: jwt.verify(data.absentId, jwt_secret).user.id
            }
        });


        res.send({ "filterAttendance": filterAttendance, "studentId": studentId })
    }
    catch (error) {
        res.send(error.message)
    }


})

router.post('/fetchadmin', fetchuser, async (req, res) => {
    // // console.log('id =', req.user)

    try {
        let adminData = await admins.findOne({ _id: req.user.id })

        if (adminData) {
            res.send({ "status": "active", "data": adminData })
        }

        else {
            res.send({ "status": "deactive" })
        }
    }
    catch (error) {
        res.send({ "status": "server error" })
    }
})

router.post('/fetchtrainer', fetchuser, async (req, res) => {
    // // console.log('id =', req.user)

    try {
        let trainerData = await uploads.findOne({ _id: req.user.id })

        // // console.log('trainer data= ',trainerData)
        if (trainerData) {
            res.send({ "status": "active", "data": trainerData })
        }

        else {
            res.send({ "status": "deactive" })
        }
    }
    catch (error) {
        res.send({ "status": "server error" })
    }
})

router.post('/fetchcounselor', fetchuser, async (req, res) => {
    // // console.log('id =', req.user)

    try {
        let counselorData = await counselors.findOne({ _id: req.user.id })

        // // console.log('trainer data= ',trainerData)
        if (counselorData) {
            res.send({ "status": "active", "data": counselorData })
        }

        else {
            res.send({ "status": "deactive" })
        }
    }
    catch (error) {
        res.send({ "status": "server error" })
    }
})

router.post('/fetchstudent', fetchuser, async (req, res) => {
    // // console.log('fetch id =', req.user)

    try {
        // // console.log("try fecth run")
        let studentData = await users.findOne({ _id: req.user.id })
        // // console.log('student data =',studentData)

        if (studentData) {
            res.send({ "status": "active", "data": studentData })
        }

        else {
            res.send({ "status": "deactive" })
        }
    }
    catch (error) {
        // // console.log('fetch catch=',error.message)
        res.send({ "status": "server error" })
    }
})


router.post('/getDemoes', async (req, res) => {
    const { TrainerName, month, day, year } = { ...req.body }
    // // console.log('Trainer demo =', TrainerName, month, day, year)

    try {

        let demo = await FixDemo.find({
            "Trainer": TrainerName,
            "month": month,
            "year": year,
            "day": { "$gte": day }
        })


        // // console.log('demo =',demo)
        res.send(demo)
    }

    catch (error) {
        // // console.log('error =',error.message)
        res.send(error.message)
    }
})

router.post('/getStudentByTrainer', async (req, res) => {
    try {
        let filterStudent = await users.find({ TrainerName: req.body.TrainerName }).select("-password -email -Number -Fees -Payment -status")
        res.send({ "status": "ok", "data": filterStudent })
    }
    catch (error) {
        res.send({ "status": "fail", "message": error.message })
    }
})

router.get('/getrunningBatch', async (req, res) => {

    try {
        let runningBatches = await runningBatch.find({})
        res.send({ "status": "active", "runningBatches": runningBatches })
    }
    catch (error) {
        res.send({ "error": error.message })
    }
})

router.get("/getAllBatches", async (req, res) => {

    try {
        let BatchCourse = await batches.find({})
        res.send({ "status": "active", "batchCourse": BatchCourse })
    }
    catch (error) {
        res.send({ "error": error.message })
    }
})

router.post('/getRunningBatchTrainer', async (req, res) => {
    try {
        let runningbatchTrainer = await runningBatches.find({ Trainer: req.body.trainerName })
        res.send({ "status": "active", "runningbatchTrainer": runningbatchTrainer })
    }
    catch (error) {
        res.send({ "error": error.message })
    }
})


router.post('/addNewBatch', async (req, res) => {
    try {
        let addNewBatch = await runningBatches.create(req.body)

        res.send({ 'status': 200 })
        // // console.log('add new batch =',addNewBatch)
    }
    catch (error) {
        res.send({ "error": error.message })
        // // console.log('error =',error.message)
    }
})


// route to get all counselor data

router.get('/getAllCounselor', async (req, res) => {
    try {
        const counselorData = await counselors.find({});
        res.send({ "status": "active", "counselorData": counselorData })
    }
    catch (error) {
        res.send({ "status": "error" })

    }
})

router.get("/counselor/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log('id =',id)

        const userindividual = await counselors.findById(id);
        // // console.log("user individual =", userindividual);
        res.send({"status":"active", "userIndividual":userindividual});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/counselorStudent", async (req, res) => {
    // console.log('counselor =',req.headers.counselorname, req.headers)
    try {

        const studentData = await users.find({Counselor:req.headers.counselorname});
        // // console.log("user individual =", userindividual);
        res.send({"status":"active", "counselorStudent":studentData});
    } catch (error) {
        res.status(500).json(error);
    }
});

//Fee Router----

router.post("/AddFee/:id", controller.upload, async (req, res) => {
    const {id }= req.params
    // console.log("ad fee router from =",req.params, req.body)
    req.body.url = req.url
    req.body.file = req.file
    req.body.user =  id
    // console.log("ad fee router =",req.params, req.body)
    try {
        const newUser = new StudentFee(req.body);
        const savedUser = await newUser.save();
        // console.log("Fee Data",savedUser)

        if(savedUser){
        const userindividual = await users.findById(id);
       
        let collectionDate = userindividual.CollectionDate
        collectionDate.push(req.body.CollectionDate)
        let remainingFees  = userindividual.remainingFees - req.body.amount

        const updateUser  = await users.updateOne({_id:id}, {$set:{CollectionDate:collectionDate, lastCollectionDate:req.body.CollectionDate, remainingFees:remainingFees}}, { upsert: true })
        if(updateUser){

            await updateDueDate(req.body.CollectionDate, userindividual, id,remainingFees)
        }

        res.status(200).json(savedUser);
        }


    } catch (error) {
        // console.log("error=",error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

const updateDueDate = async (collection, student, id,remainingFees) => {
    // Parse collection date and due date
    const collectionDate = new Date(collection);
    const dueDate = new Date(student.DueDate);
  
    // Calculate the year and month for collection and due dates
    const collectionDateYear = collectionDate.getFullYear();
    const collectionDateMonth = collectionDate.getMonth()+1;
    const dueDateYear = dueDate.getFullYear();
    const dueDateMonth = dueDate.getMonth()+1;
    

    console.log('collection month =',collectionDateMonth,dueDateMonth)
  
    // Calculate the difference in months between collection and due dates
    const monthDifference = (collectionDateYear - dueDateYear) * 12 + (collectionDateMonth - dueDateMonth);

    console.log('remaining fees =',remainingFees)
    if (remainingFees<=0) {
        console.log('less than zero')
      // Fees are completed, set the payment status and remove DueDate
      const updateUser = await users.updateOne(
        { _id: id },
        { $set: { paymentStatus: "Fees Completed", DueDate: "No Due Date", feesStatus:"Fees Completed" } },
        { upsert: true }
      );
    } else {
      if (collectionDateMonth === dueDateMonth) {
        // If collection month is the same as the due date month, increment due date by 1 month
        dueDate.setMonth(dueDate.getMonth() + 1);
      } else if (collectionDateMonth > dueDateMonth && collectionDateYear === dueDateYear) {
        // If collection month is greater than due date month and same year
        if (collectionDate.getDate() <= dueDate.getDate() + 5 || collectionDate.getDate() > dueDate.getDat()) {
          // If collection date is more than 5 days away from due date, increment due date by 1 month
          dueDate.setMonth(collectionDate.getMonth() + 1);
        }
      }
  
      // Format the nextDueDate
      const nextDueDate = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, '0')}-${String(
        dueDate.getDate()
      ).padStart(2, '0')}`;
  
      // Update the user's DueDate
      const updateUser = await users.updateOne({ _id: id }, { $set: { DueDate: nextDueDate } }, { upsert: true });
    }
  };


router.get("/getfee/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const userindividual = await StudentFee.findById(id);
        // // console.log("user individual =", userindividual);
        res.status(200).json(userindividual);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/FeeDetail/:id",  async (req, res) => {
    
    try {
        const { id } = req.params;

        // // console.log('req.body.user =', req.body)
        const updateduser = await StudentFee.findByIdAndUpdate(id, req.body, {
            
            new: true
        });
        // console.log("update user =",updateduser)

        res.status(200).json(updateduser);
    } catch (error) {
        // console.log("error =",error.message)

        res.status(500).json(error);
    }
   
});

//----------get Fee
router.get("/FeeTable", async (req, res) => {
    try {
        const userdata = await StudentFee.find()
        // // console.log('user data =',userdata)
        res.status(200).json(userdata);
    } catch (error) {
        // console.log('error =', error.message)
        res.status(500).json(error);
    }
});

// Delete fee
router.delete("/deleteFee/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await StudentFee.findByIdAndDelete(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;






