var db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken")


module.exports = function(app) {
 

app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });


//Register
app.post('/register', (req,res) => {
    // const today = new Date()
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
        // created: today
    }

    //find if the user already exists
    db.user.findOne({
        where: {
            email: req.body.email
        }

    }).then(user => {
        if (!user) {
            const hash = bcrypt.hashSync(userData.password,10)
            userData.password = hash
            db.user.create(userData)
                .then(user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    
                    console.log(token)
                    res.json({ token: token })
                    
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
        } else {
            res.json({ error: 'User already exists'})
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
})

//LOGIN
app.post('/login', (req,res) => {
    db.user.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            //if client side and database side passwords match, then generate the token and send the token to the front end.  Else, send that the user doesn't exist.
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 10000
                })
               console.log(token)
                res.json({ token: token })
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


//PROFILE - fetching profile for the client side.
app.get('/profile', (req, res) => {
    var decoded  = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    db.user.findOne({
        where: {
            id: decoded.id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})



};
// module.exports = users