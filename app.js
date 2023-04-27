const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:Haaris8785@cluster0.walzl.mongodb.net/test');

const contractSchema = new mongoose.SchemaType({
    productName: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        required: true
    },
    contractAddress: {
        type: String,
        required: true
    },
})

const contractModel = mongoose.model('contracts', contractSchema);


// Use the api keys by providing the strings directly 
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK('60c3d4f81196f4e4e0e1', '3a5cc8dc97edfde36f99dee30bba53657b07fe603dd29d1613c69e9cd8bb36fe');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

const url = 'https://ipfs.io/ipfs/QmehZmdvoLm2cojxoDUgRP5FsqAkcDFbxzyjXqta623vmW';

const PORT = 4000;

function getbarcode(data) {
    const barcode = `http://bwipjs-api.metafloor.com/?bcid=${data}`;
}


app.get('/add-product', (req, res) => {
    return res.sendFile(path.join(__dirname, 'views', 'addproduct.html'));
})

app.get('/console', (req, res) => {
    console.log("Hello")
})

app.get('/getData', async (req, res) => {
    const result = await axios.get("https://ipfs.io/ipfs/Qmepdv4qJcDgJptuh2QbTBDknNf76HK463dvcRHR4JXgUX");
    console.log(result.data.ProductName);
})


app.post('/add-product', (req, res) => {

    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productDescription = req.body.productDescription;

    const body = {
        "ProductName": productName,
        "ProductPrice": productPrice,
        "ProductDescription": productDescription
    }

    pinata.pinJSONToIPFS(body).then((result) => {
        //handle results here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}
)


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

const id = 10;



// pinata.pinJSONToIPFS(body).then((result) => {
//     //handle results here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });