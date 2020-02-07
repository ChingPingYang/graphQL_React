const mongoose = require('mongoose');
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(URI,
            { useNewUrlParser: true,
              useUnifiedTopology: true
             });
        console.log("Connected to MongoDB...")
    } catch(err) {
        if(err) throw err;
    }
}

module.exports = connectDB;