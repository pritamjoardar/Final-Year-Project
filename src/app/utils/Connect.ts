const mongoose = require('mongoose');
export const ConnectDB =async() =>{ 
await mongoose.connect(process.env.URI)
<<<<<<< HEAD
// await mongoose.connect("mongodb://localhost:27017")
=======
>>>>>>> 37752158581e2caa5190febbb371c2a01b262a70
  .then(()=>console.log('Connected'))
  .catch((error:any)=>console.log(error))
};
