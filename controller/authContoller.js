import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async(req,res) => {

    try {
        //hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })

        await newUser.save()
        res.status(200).json({
            succes:true,
            message:'Successfully Created Account'
        })

    } catch (err) {
        res.status(500).json({
            succes:false,
            message:'Failed Created Account'
        })

    }

}

export const login = async(req,res) => {
    const email = req.body.email


    try {

        const user = await User.findOne({email})

        //Jika User tidak ada
        if (!user) {
            return res.status(404).json({
                succes:false,
                message:'User Tidak ada'
            })
        }

        //Perbandingan Password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        //Jika Password Salah
        if (!checkCorrectPassword) {
            return res.status(401).json({
                succes:false,
                message:'passwod salah'

            })
        }

        const { password, role, ...rest } = user._doc
        
        //jwt token
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY,{ expiresIn: "15d" });


        // set token cookies
        res.cookie('accessToken', token, {
            sameSite: true,
            secure: true,
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            success:true,
            token,
            data: { ...rest },
            role
        })

        // res.cookie('accessToken', token, {
        //     httpOnly: true,
        //     expires: token.expiresIn
        // }).status(200).json({
        //     success:true,
        //     token,
        //     data: { ...rest },
        //     role
        // })

    } catch (err) {
        res.status(401).json({
            succes:false,
            message:'Gagal Login'

        })

    }
    
}