const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/fetch_images', (req, res) => {

    const load_images_size = 15;

    fs.readFile(`${process.cwd()}/database/images.json`, function read(err, data) {
        if (err) {
            console.log("Couldn't read file: ", err);
            res.end([]);
            throw err;
        }

        const index = req.query.load_counter * load_images_size;
        const endIndex = index + load_images_size;

        const parsedData = JSON.parse(data);
        const images = parsedData.slice(index, endIndex);
        const jsonContent = JSON.stringify(images);

        res.end(jsonContent);
    });
});

module.exports = router;
