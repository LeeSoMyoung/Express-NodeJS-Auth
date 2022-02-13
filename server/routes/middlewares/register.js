'use strict';

module.exports={
    validRegister : (req,res,next)=>{
        
        const id = req.body.id;
        const username = req.body.username;

        if(!id||id.length<3){
            return res.status(400).send({
                message:"아이디가 너무 짧거나 입력되지 않았습니다."
            });
        }

        if(!req.body.pw||req.body.pw.length<3){
            return res.status(400).send({
                message:"비밀번호가 너무 짧거나 입력되지 않았습니다."
            });
        }

        if(!req.body.pw_repeat||req.body.pw_repeat!==req.body.pw){
            return res.status(400).send({
                message: "비밀번호 확인란이 입력되지 않았거나 너무 짧습니다."
            });
        }

        if(!username){
            return res.status(400).send({
                message:"사용자 이름이 입력되지 않았습니다."
            });
        }

        next();
    }
};