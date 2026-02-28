import express from 'express';
import router from './router/router.js';

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use('/', router)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
