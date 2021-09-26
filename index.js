const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

const PORT = process.env.PORT || 3001;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images') // file path
    }, 
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Image Uploaded');
}); 

// upload.array([input name's value], limit)
// app.post('/upload', upload.array('image'), (req, res) => {
//   res.send('Image Uploaded');
// });

// app.post('/upload', upload.array('image', 5), (req, res) => {
//   res.send('Image Uploaded');
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))