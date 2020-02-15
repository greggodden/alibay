const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads' });
const reloadMagic = require('./reload-magic.js');
const sha1 = require('sha1');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const cookieParser = require('cookie-parser');
const stripe = require('stripe')('sk_test_pUQ2R1mt3svOb5yCO02f0Lwn00x5dehwab');

app.use(cookieParser());

reloadMagic(app);

const sessions = {};

let db = undefined;
let url = 'mongodb+srv://ggodden:###############################@ggodden-hmuc2.mongodb.net/test?retryWrites=true&w=majority';
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('alibay');
  })
  .catch(err => console.log(err));

app.use('/', express.static('build'));
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/charge', upload.none(), async (req, res) => {
  console.log('/charge endpoint entered');
  console.log('body:', req.body);
  const token = req.body.token;
  const crateTotal = req.body.crateTotal;
  try {
    const charge = await stripe.charges.create({
      amount: crateTotal,
      currency: 'usd',
      description: 'test charge',
      source: token
    });
    console.log('charge success');
    res.send(JSON.stringify({ success: true, payload: charge }));
    return;
  } catch (err) {
    console.log('/charge error');
    res.send(JSON.stringify({ succes: false, payload: err }));
    return;
  }
});

app.get('/check-cookies', upload.none(), (req, res) => {
  console.log('/check-cookies entered');
  const sid = req.cookies.sid;
  const username = sessions[sid];
  if (username) {
    console.log('user found', username);
    res.send(
      JSON.stringify({
        success: true,
        username: username,
        message: 'user found'
      })
    );
    return;
  }
  console.log('no user found');
  res.send(JSON.stringify({ success: false, message: 'no user found' }));
  return;
});

app.post('/sign-up', upload.none(), async (req, res) => {
  console.log('/sign-up end-point entered');
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await db.collection('users').findOne({ username: username });
    if (user) {
      return res.send(JSON.stringify({ success: false, message: 'Username is taken' }));
    }
    await db.collection('users').insertOne({ username: username, password: sha1(password) });
    res.send(JSON.stringify({ success: true, message: 'Account created successfully' }));
    const sid = Math.floor(Math.random() * 10000000000);
    sessions[sid] = username;
    res.cookie('sid', sid);
    console.log('cookie dropped with sid: ', sid);
    return;
  } catch (err) {
    console.log('/sign-up error', err);
    res.send(JSON.stringify({ success: false, message: 'error signing up' }));
    return;
  }
});

app.post('/login', upload.none(), async (req, res) => {
  console.log('/login end-point entered');
  const username = req.body.username;
  const password = req.body.password;
  const sid = req.cookies.sid;
  try {
    const user = await db.collection('users').findOne({ username: username });
    if (!user) {
      return res.send(JSON.stringify({ success: false, message: 'user not found' }));
    }
    if (user.password === sha1(password)) {
      if (!sessions[sid]) {
        console.log('cookie does not exist');
        const sid = Math.floor(Math.random() * 10000000000);
        sessions[sid] = username;
        res.cookie('sid', sid);
        console.log('cookie dropped with sid: ', sid);
        res.send(JSON.stringify({ success: true, message: 'login successful' }));
        return;
      }
      console.log('cookie exists', sid);
      res.send(JSON.stringify({ success: true, message: 'login successful' }));
      return;
    }
    res.send(JSON.stringify({ success: false, message: 'login failed' }));
  } catch (err) {
    console.log('/login error', err);
    res.send(JSON.stringify({ success: false, message: 'error logging in' }));
    return;
  }
});

app.post('/sellarecord', upload.single('recordCover'), async (req, res) => {
  console.log('/sellarecord endpoint entered');
  const sid = req.cookies.sid;
  const username = req.body.username;
  const recordArtist = req.body.recordArtist;
  const recordTitle = req.body.recordTitle;
  const recordGenre = req.body.recordGenre;
  const recordFormat = req.body.recordFormat;
  const recordSpeed = req.body.recordSpeed;
  const recordCondition = req.body.recordCondition;
  const recordDescription = req.body.recordDescription;
  const recordPrice = req.body.recordPrice;
  const recordImgPath = '/uploads/' + req.file.filename;
  if (!sessions[sid]) {
    return res.send(
      JSON.stringify({
        success: false,
        message: 'You must be logged in to sell a record.'
      })
    );
  }
  try {
    await db.collection('records').insertOne({
      recordArtist: recordArtist,
      recordTitle: recordTitle,
      recordGenre: recordGenre,
      recordFormat: recordFormat,
      recordSpeed: recordSpeed,
      recordCondition: recordCondition,
      recordDescription: recordDescription,
      recordPrice: recordPrice,
      recordImgPath: recordImgPath,
      recordSoldBy: username
    });
    console.log('record listed for sale successfully');
    res.send(
      JSON.stringify({
        success: true,
        message: 'Record listed for sale successfully.'
      })
    );
    return;
  } catch (err) {
    console.log('/sellarecord error', err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});

app.get('/getrecords', upload.none(), async (req, res) => {
  console.log('/getrecords enpoint entered');
  try {
    await db
      .collection('records')
      .find({})
      .toArray((err, records) => {
        if (err) {
          console.log('/getrecords error', err);
          res.send(JSON.stringify({ success: false, message: err }));
          return;
        }
        console.log('got records successfully');
        res.send(JSON.stringify(records));
        return;
      });
  } catch (err) {
    console.log('/getrecords error', err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});

app.post('/getrecordsbyseller', upload.none(), async (req, res) => {
  console.log('/getrecordsbyseller endpoint entered');
  const name = req.body.name;
  console.log('getrecordsbyseller name is:', name);
  try {
    await db
      .collection('records')
      .find({ recordSoldBy: name })
      .toArray((err, records) => {
        if (err) {
          console.log('/getrecordsbyseller error', err);
          res.send(JSON.stringify({ success: false, message: err }));
          return;
        }
        console.log('successdfully retreived records by seller');
        res.send(JSON.stringify(records));
        return;
      });
  } catch (err) {
    console.log('/getrecordsbyseller error', err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});

app.post('/getrecorddetails', upload.none(), async (req, res) => {
  console.log('/getrecorddetails endpoint entered');
  const rid = req.body.rid;
  try {
    const record = await db.collection('records').findOne({ _id: ObjectId(rid) }, {});
    res.send(JSON.stringify({ payload: record }));
    return;
  } catch (err) {
    console.log('/getrecorddetails error', err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});

app.post('/removerecord', upload.none(), async (req, res) => {
  console.log('/removerecord endpoint entered');
  const rid = req.body.rid;
  const username = req.body.username;
  try {
    await db.collection('records').deleteOne({ _id: ObjectId(rid), recordSoldBy: username });
    res.send(JSON.stringify({ success: true, message: 'Record removed successfully.' }));
    return;
  } catch (err) {
    console.log('/removerecord error', err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
