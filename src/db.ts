import mongoose from 'mongoose'

mongoose.connect(
  process.env.MONGODB_URI!.replace('<password>', process.env.MONGODB_PASSWORD!),
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Database connected')
)
