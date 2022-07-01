import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { user: User, comments: Comments } = prisma

export default {
    getAll(req, res) {
        User.findMany()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some err Occured while retrieving comments',
                })
            })
    },
    get(req, res) {
        const { id } = req.params
        User.findUnique({
            where: {
                id: parseInt(id),
            },
        })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Cannot find User with id= ${id}`,
                      })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some err Occured while retrieving user with id=${id}`,
                })
            })
    },
    create(req, res) {
        const { name, email, hashed_password, salt } = req.body
        User.create({
            data: {
                name: name,
                email: email,
                hashed_password: hashed_password,
                salt: salt,
            },
        })
            .then(() => {
                res.status(201).send({
                    message: `User was succesfully created`,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some err Occured while created User`,
                })
            })
    },
    update(req, res) {
        const { id } = req.params
        const { name, email, hashed_password } = req.body
        User.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name,
                email: email,
                hashed_password: hashed_password,
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `User was succesfully updated`,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some err Occured while Updating User info`,
                })
            })
    },
    delete(req, res) {
        const { id } = req.params
        const deleteComments = Comments.deleteMany({
            where: {
                user_id: parseInt(id),
            },
        })
        const deleteUser = User.delete({
            where: {
                id: parseInt(id),
            },
        })
        prisma
            .$transaction([deleteComments, deleteUser])
            .then(() => {
                res.status(200).send({
                    message: `User was succesfully deleted`,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || `Some err Occured while deleted user with id=${id}`,
                })
            })
    },
}
