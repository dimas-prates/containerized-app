import 'dotenv/config'
import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import { address } from 'ip'

const app = express();
const port = process.env.PORT || 3000
const protocol = app.settings['trust proxy'] ? 'https' : 'http'

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.get(`/`, (req, res) => { res.status(200).json({ message: `Application running on ${protocol}://${req.hostname}:${port}` }) })

const server = app.listen(port, () => { console.log(`\nApplication running on ${protocol}://${address()}:${port}\n`) })

process.on('SIGINT', () => {
    server.close()
    console.log(`\nApplication terminated\n`)
})