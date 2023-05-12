const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')


const login = async (req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        throw new BadRequestError('Please provide email and password')
    }

    
    //Bu kod mevcut tarihin gününü döndürüyor ve id ye atıyor.
    const id = new Date().getDate()

    //jwt.sign fonksiyonu, JWT oluşturmak için kullanılan bir fonksiyondur ve üç parametre alır: payload, anahtar (secret), ve seçenekler (options).
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d',
})
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res) => {
    
    const luckyNumber = Math.floor(Math.random()*100)    
    res.status(200).json({
    message:`Hello,${req.user.username}`,
    secret:`Here is your authorized data, your lucky number is ${luckyNumber}`,
})

}

module.exports = {
    login,
    dashboard
}
