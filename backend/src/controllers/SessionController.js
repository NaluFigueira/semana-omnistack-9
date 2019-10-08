//index: método que retorna uma listagem de sessões
//show: mostrar uma unica sessão
//store: criar uma sessão
//update: editar uma sessão
//destroy: destruir uma sessão
const User = require('../models/User')

module.exports = {
    async store(req,res) {
        const {email} = req.body;

        let user = await User.findOne({email}); //verifica se o usuário já existe

        if(!user){
            user = await User.create({email});
        }

        return res.json(user);
    }
};