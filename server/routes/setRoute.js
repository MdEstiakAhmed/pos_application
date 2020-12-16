const authRoute = require('./authRoute')
const productRoute = require('./productRoute')
const invoiceRoute = require('./invoiceRoute')

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