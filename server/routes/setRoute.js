const authRoute = require('./authRoute')
const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: "Welcome"
            })
        }
    }
]

module.exports = app => {
    routes.forEach(route => {
        app.use(route.path, route.handler)
    })
}