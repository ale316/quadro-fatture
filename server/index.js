const Koa = require('koa')
const app = new Koa()

const Clients = require('./repositories/Clients')

// response
app.use(async ctx => {
    let clients = await Clients.getAll()
    ctx.body = clients
})

app.listen(3000)