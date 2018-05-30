require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const mongo = require('koa-mongo')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

let mongoOpts = {
    host: 'localhost',
    port: 27017,
    db: 'fatture'
}

if (process.env.MONGO_USER && process.env.MONGO_PSW) {
    mongoOpts = Object.assing({}, mongoOpts, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PSW
    })
}

app.use(mongo(mongoOpts))

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

router
.get('/clients', async ctx => {
    const clients = await ctx.mongo.collection('clients').find({}).sort({ name: 1 }).toArray()
    ctx.body = clients
})

app.use(router.routes())

app.listen(3300)