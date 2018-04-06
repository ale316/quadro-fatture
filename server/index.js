const Koa = require('koa')
const Router = require('koa-router')
const mongo = require('koa-mongo')

const app = new Koa()
const router = new Router()

app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'fatture'
}))

// response
router
.get('/documents', async ctx => {
    const documents = await ctx.mongo.collection('documents').find().sort({ date: -1 }).toArray()
    ctx.body = documents
})
.get('/documents/:client_id', async ctx => {
    const documents = await ctx.mongo.collection('documents').find({ client_id: ctx.params.client_id }).sort({ date: -1 }).toArray()
    ctx.body = documents
})

app.use(router.routes())

app.listen(3300)