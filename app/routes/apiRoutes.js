
const Firestore = require('@google-cloud/firestore');
/*
const admin = require('firebase-admin');

var serviceAccount = require('../../Key/privateKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
*/


const projectId = 'dummyaitslsams';


const firestore = new Firestore({
  projectId: projectId,
  keyFilename: __dirname+'/../../Key/privateKey.json'
});

module.exports = function (app) {
  

    app.get('/', (req, res) => {
      res.send('Hello from App Engine!');
      console.log('listening to 300');
      return true;
      });



 app.post('/api/firebase/update',function(req,res){
   
    console.log('Firebase');
    console.log(req.body.text);
    firestore.collection('messages').doc().set( {message: req.body.text}  );

        res.send(`Added TODO For ${req.body.text}`)
        
        
 });

 app.post('/api/firebase/messages',function(req,res){
   
  console.log('Firebase');
  var tempData = '';
 firestore.collection('messages').get().then((data) => {
   
   data.forEach((doc) => {
   //  console.log(doc.data());
     tempData += doc.data().message + '\n'

   })

  res.send(tempData);
   //console.log(tempData);
 })

      
});
  
}

