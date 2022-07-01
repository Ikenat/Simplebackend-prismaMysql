import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const { user: User } = prisma

async function main() {
    await User.create({
        data: {
            name: 'kevin',
            email: 'kevin@gmail.com',
            salt: 'razereaz',
            hashed_password: 'reazreazrezff',
            comments: {
                create: [
                    {
                        content: 'zraze raezreaz reazeraz',
                        upvote: 20,
                        downvote: 2,
                        parent_id: 1,
                    },
                    {
                        content: 'zraze raezreaz reazeraz',
                        upvote: 9,
                        downvote: 1,
                        parent_id: 1,
                    },
                ],
            },
        },
    })
}

main()
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
