import bcrypt from"bcryptjs"

export const Hash=({salt,password}={salt:parseInt(process.env.Salt),password})=>{
    const hash=bcrypt.hashSync(password,salt)
    return hash
}

export const Compare=({password,hash}={password,hash})=>{
    const compare=bcrypt.compareSync(password,hash)
    return compare
}