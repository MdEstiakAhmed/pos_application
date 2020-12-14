const routes = [
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