const twilio=require('twilio');
const accountSid='AC2e2ce934a7b9c0530df93713f030c8c7'
 const authToken='8270f1cbb49a59f0eb2a7b8768c50a53'

 const client=new twilio(accountSid,authToken);  

 const sendOtp=(phoneNumber,otp)=>{
    return client.messages.create({
    body:`Your otp is ${otp}`, 
    from:'+15756139872',   
    to: phoneNumber //recepient phonenumber
   });
 };
 module.exports=sendOtp;