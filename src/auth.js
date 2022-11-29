const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const users = require('./models/user');
const router = express.Router();

router.post('/user/auth', async (req, res) => {
    console.log('/user/auth route called');
        users.findOne({email: req.body.email}, function(error, user) {
          if(!error) 
            {
              if (user) 
                {
                if (bcrypt.compare(user.password,req.body.password))
                   {
                    console.log(user.permissionlevel);
                    const token = jwt.sign({
                      id: user.email,
                      roles: user.permissionlevel,
                      },"jwtPrivateKey",{expiresIn: "15m"});
                    res.status(200).send(user.email + " gevonden" + "token: " + token );
                   }
  
                else 
                    res.send('Wachtwoord fout')
                }
                else 
                  res.send("Gebruiker niet gevonden")
            } 
            else 
              res.send(error);
      })


   }
  );
  
  module.exports = router;