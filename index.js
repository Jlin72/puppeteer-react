const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.static('src'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(path.resolve(__dirname, 'src/index.html'));
});

app.listen(PORT, (err) => {
    if(err) {
        throw(err);
    }
    console.log(`Server started on ${PORT}`);
});