const express= require("express")
const PORT = process.env.PORT || 3000;
const app = express()

app.get('/api/get', (req, res) => { res.json({
    message: 'This is a GET request!' });
});

app.post('/api/post', (req, res) => { 
    ID = req.params.id;
    res.status(200).json({
        message: 'This is a POST request!' 
    });
});

app.listen(PORT, ()=>{
    console.log('Server is running');
});