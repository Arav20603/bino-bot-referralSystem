import express from 'express'
import { logIn, logout, signUp } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/logout', logout)

export default router