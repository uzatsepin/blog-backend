import PostModel from '../models/Post.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id

        const updatedPost = await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
        )

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Статья не найдена',
            })
        }

        res.json(updatedPost)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const removeOnePost = async (req, res) => {
    try {
        const postId = req.params.id

        const deletedPost = await PostModel.findOneAndDelete({ _id: postId })

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Статья не найдена',
            })
        }

        res.json({
            success: true,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Не удалось удалить статью',
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })
        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать статью',
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            }
        )
        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось обновить статью',
        })
    }
}
