const express = require('express')
const mongoose = require('mongoose')
const Product = require('./product')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ 
    extended: true
}))

const productData = []

// mongodb+srv://nhlinhseuit:<password>@cluster0.3usx7kd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// connect to mongoose
mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://nhlinhseuit:Linh72vnLinh72vn@cluster0.3usx7kd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then((success) => {
    console.log('Status', 'Connected to mongoose')

    // post api
    app.post('/api/add_product', async (req, res) => {
        console.log('Result request', req.body)

        // const pdata = {
        //     "id": productData.length+1,
        //     "pname": req.body.pname,
        //     "pprice": req.body.pprice,
        //     "pdesc": req.body.pdesc,
        // }
        
        // replace push to local with push to db with SEQUELIZE or direact sql
        // productData.push(pdata)

        // res.status(200).send({
        //     'status_code': 200,
        //     'message': 'Product added successfully!',
        //     'product': pdata,
        // })

        // console.log('Final pdata', pdata)
        // console.log('productData', productData)

        let data = Product(req.body)

        try {
            let dataToStore = await data.save()
            res.status(200).json(dataToStore)

        } catch(e){
            res.status(400).json({
                'status': e.message
            })
        }
    })

    // get api
    app.get('/api/get_product', async (req, res) => {
        // if (productData.length > 0 ){ 
        //     res.status(200).send({
        //         'status_code': 200,
        //         'products': productData,
        //     })
        // } else {
        //     res.status(200).send({
        //         'status_code': 200,
        //         'products': [],
        //     })
        // }

        try {
            let data = await Product.find()
            res.status(200).json(data)
        } catch(e){
            res.status(500).json(e.message)
        }


    } )

    // get by id api 
    app.get('/api/get_product/:id', async (req, res) => {
        // if (productData.length > 0 ){ 
        //     res.status(200).send({
        //         'status_code': 200,
        //         'products': productData,
        //     })
        // } else {
        //     res.status(200).send({
        //         'status_code': 200,
        //         'products': [],
        //     })
        // }

        try {
            let data = await Product.findById(req.params.id)
            res.status(200).json(data)
        } catch(e){
            res.status(500).json(e.message)
        }


    } )

    // update api
    app.patch('/api/update/:id', async (req, res) => {
        // let id = req.params.id *1
        // let productToUpdate = productData.find(p=>p.id === id)
        // let index = productData.indexOf(productToUpdate)

        // productData[index] = req.body

        // res.status(200).send({
        //     'status_code': 200,
        //     'message': 'Product updated!',
        // })

        let id = req.params.id
        let updatedData = req.body
        let options = {new: true}

        try {
            const data = await Product.findByIdAndUpdate(id, updatedData, options)

        res.status(200).json(data)
        } catch(e) {
            res.send
        }
    } )

    // delete api
    app.delete('/api/delete/:id', async (req, res) => {
        // let id = req.params.id *1
        // let productToUpdate = productData.find(p=>p.id === id)
        // let index = productData.indexOf(productToUpdate)

        // productData.splice(index, 1)

        // res.status(204).send({
        //     'status_code': 200,
        //     'message': 'Product deleted!',
        // }
        // )

        let id = req.params.id
        try {
            const data = await Product.findByIdAndDelete(id)
            res.json({
                'status': 'Deleted product ${data.pname} from database'
            })

        } catch(e) {
            res.json(error.message)
        }
    })

})

// default get
app.get('/', (req, res) => {
    res.send('Hello from NODEJS PETPROJECT')
})



app.listen(2000, () => {
    console.log('Connected to server at port 2000')
})