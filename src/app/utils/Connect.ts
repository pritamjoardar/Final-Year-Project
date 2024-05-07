const mongoose = require('mongoose');
export const ConnectDB =async() =>{ 
// await mongoose.connect(process.env.URI)
await mongoose.connect("mongodb://localhost:27017")
  .then(()=>console.log('Connected'))
  .catch((error:any)=>console.log(error))
};
