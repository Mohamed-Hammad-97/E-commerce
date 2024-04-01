import mongoose from 'mongoose'

export const connection = () => {
    mongoose.connect(process.env.ONLINE_DATABASE_CONNECTION)
        .then(conn => console.log(`Database Connected on ${process.env.DATABASE_CONNECTION}`))
        .catch((err) => console.log(err))
}