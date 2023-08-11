import express from 'express'
import mongoose from 'mongoose'
import {
    registerValidation,
    loginValidation,
    postCreateValidation,
} from './validations.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import checkAuth from './utils/checkAuth.js'

mongoose
    .connect(
        'mongodb+srv://admin:Pa3wtj1X@blog.nlilqtz.mongodb.net/blog?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('DB Connected')
    })
    .catch(err => {
        console.log('DB Error', err)
    })

const app = express()
app.use(express.json())
//Auth
app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)
//Posts
app.get('/posts', PostController.getAllPosts)
app.get('/posts/:id', PostController.getOnePost)
app.post('/posts', checkAuth, postCreateValidation, PostController.createPost)
app.delete('/posts/:id', checkAuth, PostController.removeOnePost)
app.patch('/posts/:id', checkAuth, PostController.updatePost)

app.listen(4444, err => {
    if (err) {
        return console.log(err)
    }
    console.log('Server Started')
})
