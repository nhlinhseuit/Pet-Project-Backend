const express = require('express')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ 
    extended: true
}))

const productData = []

app.listen(2000, () => {
    console.log('Connected to server at port 2000')
})

// default get
app.get('/', (req, res) => {
    res.send('Hello from NODEJS PETPROJECT')
})

// post api

app.post('/api/add_product', (req, res) => {
    console.log('Result request', req.body)

    const pdata = {
        "id": productData.length+1,
        "pname": req.body.pname,
        "pprice": req.body.pprice,
        "pdesc": req.body.pdesc,
    }

    // replace push to local with push to db with SEQUELIZE or direact sql
    productData.push(pdata)
    console.log('Final pdata', pdata)

    res.status(200).send({
        'status_code': 200,
        'message': 'Product added successfully!',
        'product': pdata,
    })
})

// get api

app.get('/api/get_product', (req, res) => {
    if (productData.length > 0 ){ 
        res.status(200).send({
            'status_code': 200,
            'products': productData,
        })
    } else {
        res.status(200).send({
            'status_code': 200,
            'products': [],
        })
    }
} )

