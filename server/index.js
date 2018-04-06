const Koa = require('koa')
const Router = require('koa-router')
const mongo = require('koa-mongo')

const app = new Koa()
const router = new Router()

app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'quadro-fatture'
}))

// response
router
.get('/documents', async ctx => {
    // const documents = ctx.mongo.collection('documents').find().
})
.get('/documents/:client_id', async ctx => {
    
})

app.listen(3000)