
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

 //Updates the Message in a particular Document of the collection     
 app.post('/api/firebase/update',function(req,res){
   
    firestore.collection('messages').doc().set( {message: req.body.text}  );
        res.send(`Added TODO For ${req.body.text}`);      
 });

 // Deletes the document of the collection
 app.post('/api/firebase/delete',function(req,res){  
  var tempData = '';
  firestore.collection('messages').where('message', '==', req.body.text).get().then((data) => {
      data.forEach((doc) => {
      const id = doc.id;  
      firestore.collection('messages').doc(id).delete();
   });

    res.send(`Removed TODO for "${req.body.text}"`);
 });
  
});
 
// Adds new document in a collection with the message parsed. 
 app.post('/api/firebase/messages',function(req,res){
   
  
    var tempData = '';
    firestore.collection('messages').get().then((data) => {
    
        data.forEach((doc) => {
           tempData += doc.data().message + '\n';
        });

        res.send(tempData);
   
    });    
  });
  
}

