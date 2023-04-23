const express = require('express');
const app = express();



app.get('/', (req,res) => {
    res.send("Hello, Testing")
})

app.listen(3001, () => {
    console.log("Siamo sulla port 3001")
});