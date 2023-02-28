const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/collection')
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const { ObjectId } = require('mongodb');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
//maps the '/uploads' URL path to the local './uploads'
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/products', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}
connectToMongoDB()

app.post('/add-product', upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body, image: req.file.filename })
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
app.get('/product/:_id', async (req, res) => {
    const { _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({
            msg: `No product with _id :${_id}`
        });
    const objectId = new ObjectId(_id);
    try {
        const product = await Product.findById(objectId)
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
app.delete('/product/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).json({
                msg: `No product with _id :${_id}`
            });
        const objectId = new ObjectId(_id)
        await Product.findByIdAndDelete(objectId)
        res.json({ deleteProductWithSuccess: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
app.put('/product/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).json({
                msg: `No product with _id :${_id}`
            });
        const objectId = new ObjectId(_id);
        await Product.findByIdAndUpdate(objectId, req.body, req.file.filename)
        res.json({ editProductWithSuccess: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const port = 4000;
app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`)
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`);
})