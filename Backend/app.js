const mongoose = require('mongoose');
require('./Link');
// require('./scraper3');
require('./calling')
mongoose.connect('mongodb+srv://ishikarastogi57:teena@cluster0.8xhkhkk.mongodb.net/webScraper?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
console.log('Connected to MongoDB');
}).catch((error) => {
console.error('Error connecting to MongoDB:', error);
});

 
// const connect = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://ishikarastogi57:teena@cluster0.8xhkhkk.mongodb.net/webScraper?retryWrites=true&w=majority&appName=Cluster0');
//         console.log("✅ db connected");
//     } catch (err) {
//         console.log("❌ db connection failed", error);
//     }
//     mongoose.connection.on("disconnected", () => { console.log("❌ db disconnected"); });
//     mongoose.connection.on("reconnected", () => { console.log("✅ db reconnected"); });
// }
 
// export default { connect };