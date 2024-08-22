const mongoose = require('mongoose');
const  spawn  = require('child_process');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017', {
    dbName: 'UserDetails',
    useNewUrlParser: true,
    useUnifiedTopology: true
},  err=> err ? console.log(err) :
    console.log('Connected to database'));

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});


const User = mongoose.model('Information', UserSchema);
User.createIndexes();


const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 4000");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            resp.send(req.body);
            console.log(result);
        }

    } catch (e) {
        console.log(e)
        resp.send("Something Went Wrong");
    }
});

app.post("/login", async (req, resp) => {
	try {
		const user = new User(req.body);
		const existinguser = await User.findOne({ email: user.email , password: user.password })
		console.log(user)
		if (existinguser) {
			return resp.json(existinguser)
		}
		else {
			return resp.json('User Not Found')
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

// app.post('/run-python', (req, res) => {
//     const pythonProcess = spawn('python', ["E:/dpbh-timer/src/assets"]);
//     pythonProcess.stdout.on('data', (data) => {
//       console.log(data);
//     });
// });


app.listen(4000);
