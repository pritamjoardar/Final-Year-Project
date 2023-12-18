const mongoose = require('mongoose');
export const ConnectDB =async() =>{ 
await mongoose.connect(process.env.URI)
  .then(()=>console.log('Connected'))
  .catch((error:any)=>console.log(error))
};
