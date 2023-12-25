import { configDotenv } from 'dotenv'
import express from 'express'
import { app } from './Src/main.js'
configDotenv({path:"./config/.env"})
app(express)
