import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js'

// export const signUp = async (req, res) => {
//   let {name, email, password} = req.body
//   try {
    

//     const userExists = await userModel.findOne({email})
//     if (userExists) {
//       return res.status(400).json({success: false, msg: "User Already exists"})
//     }
    
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const referralLink = `https://bino.bot/${name}`
//     let user = new userModel({
//       name, email, password: hashedPassword, link: referralLink
//     })

//     await user.save()

//     res.status(200).json({
//       success: true,
//       msg: "User created successfully",
//       user: {
//         ...user._doc,
//         password: undefined
//       }
//     })
//   } catch (error) {
//     res.status(400).json({success: false, msg: "Error in creating user", error: error})
//   }

// }

export const logIn = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await userModel.findOne({email})
    if (!user) {
      return res.status(500).json({success: false, msg: "User does not exist", err: error.message})
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      return res.status(500).json({success: false, msg: "Invalid password", err: error})
    }

    res.status(200).json({
      success: true,
      msg: "User logged in succesfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    res.status(400).json({success: false, msg: "Error in user login", error: error})
  }
}

export const logout = async (req, res) => {
  try {
    res.status(201).json({success: true, msg: "Successfully logged out"})
  } catch (error) {
     res.status(400).json({success: false, msg: "Error in user logout", error: error.message})
  }
}

export const signUp = async (req, res) => {
  let { name, email, password, referrerLink } = req.body
  if (!name || !email || !password) {
      throw new Error('All fields are required.') 
  }
  try {
    let currentUser = await userModel.findOne({email})
    if (currentUser) {
      return res.status(400).json({success: false, msg: "User Already exists"})
    }

    const replacedName = name.toLowerCase().replace(/\s+/g, '')
    const hashedPassword = await bcrypt.hash(password, 10)
    const referralLink = `https://bino.bot/${replacedName}`

    if (referralLink === referrerLink) {
      return res.status(400).json({success: false, msg: "User cannot refer yourself"})
    }

    let referrer = null
    if (referrerLink) {
      referrer = await userModel.findOne({link: referrerLink})
      if (!referrer) {
        return res.status(404).json({success: false, msg: "Invalid refrerral code"})
      }

      const random = Math.round(Math.random() * 11)
      referrer = await userModel.findOneAndUpdate({ link: referrerLink }, {$inc: {referrals: 1, rewards: random}}, {new: true})
    }

    currentUser = new userModel({
      name, email, password: hashedPassword, link: referralLink
    })

    await currentUser.save()
    
    
    

    res.status(200).json({
      success: true,
      msg: referrer
        ? "User created and referral updated succesfully"
        : "User created successfully",
      referrer: referrer
        ? { ...referrer._doc, password: undefined }
        : null,
      user: { ...currentUser._doc, password: undefined }
    })
  } catch (error) {
    res.status(400).json({success: false, msg: "Error in signup", error: error.message})
  }
}