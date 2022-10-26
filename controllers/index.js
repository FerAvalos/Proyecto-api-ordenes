const FS = require('../firebase')
const {db}=FS

// Endpoint para crear una cuenta
const createAccount = async(req, res)=>{
    try {
        const {body:account}=req //Alias al body llamada account
        const AccountDb = db.collection('accounts')// Acceso a la colección
        const {_path: {segments}}= await AccountDb.add(account) //Agrega el objeto account a la colección
        const id=segments[1] //Obtiene el id del objeto que se acaba de agregar
        res.send({ //Manda el id del objeto que se acaba de agregar
            status:200, 
            id, 
            money:1000,
            collectables:[]
        }) 
    } catch(error){
        res.send(error) //Manda el error
    }
}
// Endpoint para agregar dinero a una cuenta
const fundAccount = async (req, res) => {
    try {
        const {params:{id}}=req //Para que funcione fieldsproto
        const {body: account} = req
        const {money: moneyToAdd} = account
        const AccountDb = db.collection('accounts').doc(id)
        const {_fieldsProto} = await AccountDb.get()
        const currentMoney= parseInt(_fieldsProto.money.integerValue)
        const newmoney = currentMoney + moneyToAdd
        const resp = await AccountDb.update({ //Reemplazando
            money: newmoney
        })
        res.send({
            current_balance: {
                money: newmoney,
                collectables: []
            },
            business_errors: []
        })
    } catch(error) {
        res.send(error)
    }
}
  
module.exports = {
    createAccount,
    fundAccount,
}

