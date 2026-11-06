let express= require('express')  //npm i express
   let mongoose=     require('mongoose')  //npm i mongoose
   const sendOtp = require('./twilioService'); //npm i twilio
const Otp = require('./model/otp'); 
let User=    require('./user')         
let bcrypt=    require('bcrypt')       //npm i bcrypt
let jwt=    require('jsonwebtoken')   //npm i jsonwebtoken
  const crypto = require('crypto');  //npm i crypto
  const cors = require('cors');     //npm i cors

 let {sendEmail} = require('./sendEmail')
  // MongoDB connection (temporarily disabled for testing)
// mongoose.connect("mongodb://127.0.0.1:27017/Backend").
//  then(()=>{
//   console.log("db connected");
//  }).catch(err => {
//   console.log("MongoDB connection failed, running in test mode");
//  });
    
  let app=     express()    
  app.use(express.json())   
  app.use(cors())          //npm i cors



  //Signup Page  API
   app.post('/signup',  async(req,res)=>{
          let {userName,email,passWord,role}=   req.body
      console.log(userName,email ,"Done");
      
     let user=     await  User.findOne({email})
     console.log(user,"Done");
     
     if(user){
        res.send("User Found")
     }
         let updatedP=     await  bcrypt.hash(passWord,10)
         console.log(updatedP,"Done");
         
        let userData=   new  User({
            userName,
            email,
            passWord:updatedP,
            role:role||'patient'
         })
              await userData.save()
              res.send("Account Successfully Created")
            ;
            
 })


//Otp Verification API
//  app.post('/send-otp', async (req, res) => {
//   const { phoneNumber } = req.body;
//   console.log(phoneNumber,"hey");
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

//   try {
    
//     await sendOtp(phoneNumber, otp);
//     const newOtp = new Otp({
//       phoneNumber,
//       otp,
//      //expiresAt: expiresAt.toString()
//         expiresAt: expiresAt

//     });
//     await newOtp.save();

//     res.status(200).send({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Failed to send OTP' });
//   }
// });

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

  try {
    await sendOtp(phoneNumber, otp);

    await new Otp({
      phoneNumber,
      otp,
      expiresAt  // << FIXED
    }).save();

    res.status(200).send({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send OTP' });
  }
});

app.post('/verify', async (req, res) => {
  const { otp } = req.body;

  try {

   // const otpRecord =       await Otp.findOne({ otp });
const otpRecord = await Otp.findOne({ otp }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).send({ error: 'Invalid OTP' });
    }

    const currentTime = new Date();
    if (currentTime > otpRecord.expiresAt) {
      return res.status(400).send({ error: 'OTP has expired' });
    }


    res.status(200).send({ message: 'OTP verified successfully' });


    await Otp.deleteOne({ _id: otpRecord._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to verify OTP' });
  }
});



 // Test Login API (no database required)
  app.post("/login",async(req,res)=>{
    let {email,passWord}=   req.body
    console.log(email,passWord);
    
    // Test credentials for demo
    if(email === "student@college.edu" && passWord === "password123") {
      let token = jwt.sign({ email: email, role: "student" }, "z");
      console.log(token,"token");
      res.send({ message: "Login Successful", token });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
 })

 // Test Appointment API (no database required)
  app.post("/api/appointment", async (req, res) => {
    const { email, date, doctor } = req.body;
    console.log('Appointment request:', { email, date, doctor });
    
    // Simulate saving appointment (in real app, this would update database)
    res.json({ status: 'saved' });
  });

 //Role Based Access System
 function checkRole(role,role1){
   return (req,res,next)=>{
      let token = req.headers.authorization;
      if (!token) {
         return res.send('Unauthorizeddd User');
     }else{
     // let deCodedToken = jwt.verify(token,  "JHBFIUWBFIUWB");
         let deCodedToken = jwt.verify(token, "z");

      if (role!==deCodedToken.role ) {
         return res.send('Access denied')
     }
     else {
         next();
     }

     }

   }
 }



  //Forgot Password  API
 app.post('/forgot-password', async (req, res) => {
   const { email } = req.body;
   try {
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(404).send('User not found');
     }
 
   
     const resetToken = crypto.randomBytes(20).toString('hex');
     user.resetToken = resetToken;
     user.resetTokenExpiry = Date.now() + 3600000; //token expire in 6 min
     await user.save();
 
 
    
    let resetUrl=`http://localhost:5173/reset/${resetToken}`
     await sendEmail(
       user.email,
       'Password Reset Request',
       `Click the link below to reset your password:\n\n${resetUrl}`
     );
 
     res.status(200).send('Password reset email sent');
   } catch (error) {
     res.status(500).send('Error sending password reset email: ' + error.message);
   }
 });



  
 // Reset Password  API
 app.post('/reset-password/:token', async (req, res) => {
   const { token } = req.params;
   const { newPassword } = req.body;
 
   try {
     const user = await User.findOne({
       resetToken: token,
       resetTokenExpiry: { $gt: Date.now() }, 
     });
 
     if (!user) {
       return res.status(400).send('Invalid or expired token');
     }
     const hashedPassword = await bcrypt.hash(newPassword, 10);
     user.passWord = hashedPassword;
     user.resetToken = undefined;
     user.resetTokenExpiry = undefined;
     await user.save();
 
     res.status(200).send('Password reset successfully');
   } catch (error) {
     res.status(500).send('Error resetting password: ' + error.message);
   }
 });
 


 //Role Based API
  app.get('/public',(req,res)=>{
   res.send("Access  Granted")

  })
  
  app.get('/private', checkRole('admin') , (req,res)=>{
   res.send(" ADMIN ACESS GRANTED") //User Not Found AND

  })

  //Server Creation
  app.listen(4000,()=>{
   console.log("server running on port no 4000");
   
  })






