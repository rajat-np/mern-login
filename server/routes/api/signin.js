const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

    app.post('/api/account/signup', function (req, res, next) {
      const { body } = req;
      const {
          firstName,
          lastName,
          password
      } = body;

     let { email } = body;
     email = email.toLowerCase();

      User.find({
          email:email
      }, (err,previousUsers) => {
            if (err){
               return  res.send({
                    success:false,
                    message :'Server Error'
                })
            }
            else if (previousUsers.length > 0){
               return res.send({
                    success:false,
                    message: 'Email already exists'
                })
            }
      });

      /*
       * Save the user now  
       */
    const newUser  = new User();

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save((err,user) => {
        if (err){
            return res.send({
                success:false,
                message:'User not created'
            })
        }
       return  res.send({
            success:true,
            message:'User created'
        })
    })
    });
    app.post('/api/account/signin', function (req, res, next) {
        const { body } = req;
        const { password } = body;
        let { email } = body;
        email = email.toLowerCase();
        User.find({
            email:email
        }, (err,found) => {
            if(err){
                return res.send({
                    success:false,
                    message:'Error:Server error'
                })
            }
            if(found.length != 1){
                console.log(found)
                return res.send({
                    success:false,
                    message:'Error:User not found'
                })
            }
            const user = found[0]
            if(!user.validPassword(password)){
                return res.send({
                    success:false,
                    message:'Error:Incorrect Password'
                })
            }
            // now a login should be successful
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err,doc)=> {
                if(err){
                    return res.send({
                        success:false,
                        message:'Server Error'
                    })
                }
                return res.send({
                    success:true,
                    message:'Signed in!!',
                    token:doc._id   
                })
            })
        })
    });
    app.get('/api/account/verify', function(req,res,next){
        const { query } = req
        const { token } = query
        
        UserSession.find({
            _id:token,
            isDeleted:false
        },(err ,sessions) => {
            if (err){
                return res.send({
                    success:false,
                    message:'Internal Server Error'
                })
            }
            else if ( sessions.length != 1){
                return res.send({
                    success:false,
                    message:'Invalid Session'
                })
            }
            return res.send({
                success:true,
                message:'Verified'
            })
        })
    })
    app.get('/api/account/logout', function(req,res,next){
        const { query } = req
        const { token } = query
        
        UserSession.findOneAndRemove({
            _id:token,
            isDeleted:false
        },(err ,sessions) => {
            if (err){
                return res.send({
                    success:false,
                    message:'Internal Server Error'
                })
            }
            return res.send({
                success:true,
                message:'Logged out'
            })
        })
    })
};