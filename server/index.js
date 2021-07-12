const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler');
const fs = require('fs');
const axios = require('axios');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', routesHandler);

const PORT = 4000;

const fetch_images = () => {

    axios.get('https://api.jonathanczyzyk.com/api/v1/images/small', {
        headers: { 'x-api-key': "api-key-67f5f133-df29-48a6-9843-cebcb35a7afa" }
    }).then(({ data }) => {
        const transformedData = data.map((image) => ({...image, id: uuid.v4() }))

        const jsonContent = JSON.stringify(transformedData);

        fs.writeFile(`${process.cwd()}/database/images.json`, jsonContent, 'utf8', (err) => {
            if (err) {
                console.log("Couldn't read file: ", err);
                throw err;
            }
        });
    })
};

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    fetch_images();
});
