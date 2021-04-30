const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
//const createError = require('http-errors');
const SignUpRoute = express.Router();
let SignUp = require('../model/SignUp');
//var ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator/check");

// Add User
SignUpRoute.route('/SignUp').post((req, res, next) => {
SignUp.create(req.body, async (error, data) => {
// SignUpRoute.post('/SignUp',async (req, res) => {
  if (error) {
    res.send(error)
  } else {
    data.Password = await bcrypt.hashSync(data.Password, 10);
    data.save();   
    res.send({
      Username: data.Username,
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      Phone: data.Phone,
      DOB: data.DOB,
      UserId: data.UserId,
      Gender: data.Gender,
      Password: data.Password
    })
    res.json(data)
  }
});
});


// router.post("/users",async (req, res) => {
//   //console.log(req.file);
//   if (error) {
//       return res.status(400).send({
//           message: "Required field can not be empty",
//       });
//   }
//   const user = await UserData({
//       Username: req.body.Username,
//       FirstName: req.body.FirstName,
//       LastName: req.body.LastName,
//       Email: req.body.Email,
//       Phone: req.body.Phone,
//       DOB: req.body.DOB,
//       UserId: req.body.UserId,
//      // role: req.body.role,
//       Gender: req.body.Gender,
//       Password: req.body.Password,
//       // varifypassword: req.body.varifypassword,
//       // profile:req.file.originalname
//   });
//   user.save();
//   res.send(user);
// });







// Get all Users
SignUpRoute.route('/').get((req, res) => {
  SignUp.find((error, data) => {
    if (error) {
      res.send(error)
    } else {
      res.json(data)
    }
  })
})

// Get User
SignUpRoute.route('/read-user/:id').get((req, res) => {
  console.log("get by is call")
  SignUp.findById(req.params.id, (error, data) => {
    if (error) {
      res.send(error)
    } else {
      console.log("data get sucess")
      res.json(data)
    }
  })
})


// Update User
// SignUpRoute.put('/update-user/:id',(req,res) => {
//   if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send('No record with given id : ${req.params.id}');
//   var user = {
//       Username:req.body.Username,
//       FirstName:req.body.FirstName,
//       LastName:req.body.LastName,
//       Email:req.body.Email,
//       Phone:req.body.Phone,
//       DOB:req.body.DOB,
//       UserId:req.body.UserId,
//       Gender:req.body.Gender, 
//       Password:req.body.Password
//  };
// SignUp.findByIdAndUpdate(req.params.id,{$set: user},{new: true},(err,doc) => {
//     if(!err) { res. send(doc);}
//     else{console.log('Error in User update :'+JSON.stringify(err,undefined,2)); }
// });

// });

// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;

//   SignUp.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else res.send({ message: "Tutorial was updated successfully." });
//     })
// }

SignUpRoute.route('/update-user/:id').put((req, res) => {
  SignUp.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      res.send(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('user updated successfully!')
    }
  })
})

// Delete User
SignUpRoute.route('/delete-user/:id').delete((req, res) => {
  SignUp.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})



//login user    
SignUpRoute.post("/login", async (req, res) => {
    const errors = validationResult(req);
    console.log('login successfull');
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
   
    const { Username, Password } = req.body;
    try {
      let user = await SignUp.findOne({ Username });
      if (!user)
        return res.status(400).json({
          message: "Incorrect User name"
        });

      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password "
        });

      const payload = { user: { id: user.id }};

      let token=jwt.sign(payload, "randomString", {
          expiresIn: 3000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );

    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);



module.exports = SignUpRoute;