const authRoute = require('./authRoute')
const productRoute = require('./productRoute')
const invoiceRoute = require('./invoiceRoute')
const generalRoute = require('./generalRoute')

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/product',
        handler: productRoute
    },
    {
        path: '/invoice',
        handler: invoiceRoute
    },
    {
        path: '/general',
        handler: generalRoute
    },
    // {
    //     path: '/',
    //     handler: (req, res) => {
    //         res.json({
    //             message: "Welcome"
    //         })
    //     }
    // }
]

module.exports = app => {
    routes.forEach(route => {
        app.use(route.path, route.handler)
    })
}