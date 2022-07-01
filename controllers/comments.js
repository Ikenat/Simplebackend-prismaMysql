import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { comments: Comments } = prisma

export default {
    getAll(req, res) {
        Comments.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error Occured while retrieving comments',
                })
            })
    },
    get(req, res) {
        const { id } = req.params
        Comments.findUnique({
            where: {
                id: parseInt(id),
            },
        })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Cannot find Comments with id= ${id}`,
                      })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some error Occured while retrieving Comments with id=${id}`,
                })
            })
    },
    create(req, res) {
        const { image, content, parent_id, user_id } = req.body
        Comments.create({
            data: {
                image: image,
                content: content,
                parent_id: parseInt(parent_id),
                user_id: parseInt(user_id),
            },
        })
            .then(() => {
                res.status(201).send({
                    message: `Comments was succesfully created`,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some error Occured while created Comments`,
                })
            })
    },
    update(req, res) {
        const { id } = req.params
        const { image, content } = req.body
        Comments.update({
            where: {
                id: parseInt(id),
            },
            data: {
                image: image,
                content: content,
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `Comments was succesfully updated`,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some error Occured while Updating Comments info`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params
        Comments.delete({
            where: {
                id: parseInt(id),
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `Comments was succesfully deleted`,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some error Occured while deleted Comments with id=${id}`,
                })
            })
    },
}
