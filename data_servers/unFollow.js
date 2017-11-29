import sequelize from '../data-model/data-base';

const Account = sequelize.model('account');
const User = sequelize.model('user');
const FriendShip = sequelize.model('friendship');

export default async (req,res)=>{
    
    const {access_token,userId} = req.body;
    const account = await Account.findOne({where:{access_token}});
    if(!account){
        return res.json({
            success:false,
            message:'access_token无效',
            code:10003,
        })
    }


    await FriendShip.destroy({
        where:{
            userId:account.userId,
            followedId:userId
        }
    })

    return res.json({
        success:true
    });



}