const bookidgen = require("bookidgen");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authschema = require("../model/authschema");
const bcrypt = require("bcrypt");
const hash = require("hash")

app.use(express.json());
let tokenHeaderKey = "Ahirwal";
let jwtSecretKey = "karishma";

app.post("/post/generateToken", (req, res) => {
  // Then generate JWT Token

  let jwtSecretKey = "karishma";
  let data = {
    time: Date(),
    userId: 12,
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

app.post("/Register", async (req, res) => {
  try {
    // Get user input
    const { name, password, phone } = req.body;

    if (!(name && password && phone)) {
      res.send("All input is required");
    } else {
      const oldUser = await authschema.findOne({ phone });

      if (oldUser) {
        return res.send("User Already Exist. Please Login");
      } else {
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        const userid = bookidgen("USE", 12343, 121383);

        const user = await authschema.create({
          name,
          password: encryptedPassword,
          phone,
        });
        res.json({ data: user });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// Login

app.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!(phone && password)) {
      res.send("All input is required");
    } else {
      const user = await authschema.findOne({ phone });
      console.log(user);
      let compare = await bcrypt.compare(password, authschema.password);
      console.log(compare);

      if (compare === true) {
        // Create token
        const token = jwt.sign({ phone }, "asdflkjh");
        // save user token
        user.token = token;
        console.log(token);

        // return new user
        res.json({ data: user, token });
      } else {
        res.send("wrong");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;

//     //Generate OTP
//     const otp = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });
//     const now = new Date();
//     const expiration_time = AddMinutesToDate(now,10);

//     //Create OTP instance in DB
//     const otp_instance = await authschema.create({
//       otp: otp,
//       expiration_time: expiration_time
//     });
//       var details={
//       "timestamp": now,
//       "check": phone,
//       "success": true,
//       "message":"OTP sent to user",
//       "otp_id": otp_instance.id
//     }

//     const encoded= await encode(JSON.stringify(details))
//       if(phone){
//       if(phone=="VERIFICATION"){
//         const message = require('../templates/SMS/phone_verification');
//         phone_message=message(otp)
//       }
//       else if(phone=="FORGET"){
//         const message = require('../templates/SMS/phone_forget');
//         phone_message=message(otp)
//       }
//       else if(phone=="2FA"){
//         const message = require('../templates/SMS/phone_2FA');
//         phone_message=message(otp)
//       }
//       else{
//         const response={"Status":"Failure", "Details":"Incorrect incorrect password  Provided"}
//         return res.status(500).send(response)
//       }
//     }

//     // Settings Params for SMS
//     var params = {
//         Message: phone_message,
//         Phone:  phone
//     };

//     publish.then(
//         function (data) {
//             return res.send({"Status":"Success","Details":encoded});
//         }).catch(
//         function (err) {
//             return res.status(500).send({"Status":"Failure","Details": err });
//     });

//   // }catch(err){
//       const response={"Status":"Failure","Details": err.message}
//       return res.status(500).send(response)
//   }

// }

// module.exports = {SMS}
