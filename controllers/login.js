const handleSignIn = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission');
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash)
       // console.log(isValid);
        if(isValid)
        {
           return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                //console.log(user)
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else{
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))

// bcrypt.compare("apples", '$2a$10$757/2e6QbdXbG6fyDi4MBuh8R/fcqy8J55qP2c8YoZ3IbAFfu0xhC'
//     , function(err, result) {
    
//         console.log('first guess', result);
// });

// bcrypt.compare("veggies", '$2a$10$757/2e6QbdXbG6fyDi4MBuh8R/fcqy8J55qP2c8YoZ3IbAFfu0xhC'
//     , function(err, result) {
    
//         console.log('second guess', result);
// });

//inorder to use req.body we need to use body parser, because express doesnt know
    // if(req.body.email === database.users[0].email &&
    //     req.body.password=== database.users[0].password)
    //     {
    //         res.json(database.users[0]);
    //     }
    //     else{
    //         res.status(400).json('error logging in...')
    //         }
    //res.json('signing');   //express comes with builtin json
}
module.exports = {
    handleSignIn
};