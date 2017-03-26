var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/login');

var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.get('/', function (req, res) {
    res.send('API page  http://localhost:' + port + '/api');
});

var apiRoutes = express.Router();
apiRoutes.post('/authenticate', function (req, res) {
    var user = 'Sreejesh';
    var password = 'password';
   if (req.body.name != user) {
        console.log(user);
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

        // check if password matches
        if (req.body.password != password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

            // if user is found and password is right
            // create a token

            var token = jwt.sign(user, 'Secret', {
                expiresIn: '1h'// expires in 24 hours
            });

            res.json({
                success: true,
                message: 'Token generated!',
                token: token
            });
        }

    }

});


apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Login API!' });
});

apiRoutes.get('/check', function (req, res) {
    res.json(req.decoded);
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Server started http://localhost:' + port);
