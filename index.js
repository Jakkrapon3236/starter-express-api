const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const PORT = 2002;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'cmdkppco',
    host: 'ftp.cmdkpp.com',
    password: ':2Y08;r0VxVskS',
    database: 'cmdkppco_tree'
})

app.post('/api/add', (req,res) => {
    const f1 = req.body.Feature1;
    const f2 = req.body.Feature2;
    const f3 = req.body.Feature3;
    const f4 = req.body.Feature4;
    const f5 = req.body.Feature5;
    const f6 = req.body.Feature6;
    const sv = req.body.selectedVarity;
    db.query("INSERT INTO feature_mapping (Feature1_ID, Feature2_ID, Feature3_ID, Feature4_ID, Feature5_ID, Feature6_ID,Varity_ID) VALUES (?,?,?,?,?,?,?)",[f1,f2,f3,f4,f5,f6,sv],(err,result) => {
        if(err) {
            console.log(err);
        } else {
            console.log(result);
            res.send("Values Inserted");
        }
    })
})

app.get('/api/get', (req, res) => {
    db.query("SELECT * FROM features_type ORDER BY `Type_ID`" ,(err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/api/home', (req, res) => {
    res.json({message: 'Hello World'});
});

app.get('/api/varities',(req,res) => {
    db.query("SELECT * FROM varities" ,(err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


app.get('/api/features',(req,res) => {
    db.query("SELECT * FROM features" ,(err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
