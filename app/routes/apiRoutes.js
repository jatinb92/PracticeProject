
const Firestore = require('@google-cloud/firestore');


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

        res.text(`Added TODO For ${req.body.text}`);
        
 });
  
}

