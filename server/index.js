const Koa = require('koa')
const app = new Koa()

const fetchClients = require('./jobs/fetchClients')

// response
app.use(async ctx => {
    // let clients = await Clients.getAll()
    ctx.body = 'done!'
})

app.listen(3000)