const Koa = require('koa')
const Router = require('koa-router')
const mongo = require('koa-mongo')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'fatture'
}))

app.use(cors())

// response
router
.get('/invoices', async ctx => {
    const invoices = await ctx.mongo.collection('invoices').find().sort({ date: -1 }).toArray()
    ctx.body = invoices
})
.get('/invoices/:client_id', async ctx => {
    const invoices = await ctx.mongo.collection('invoices').find({ client_id: ctx.params.client_id }).sort({ date: -1 }).toArray()
    ctx.body = invoices
})

app.use(router.routes())

app.listen(3300)