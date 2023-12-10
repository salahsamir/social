import chalk from "chalk"
import { log } from "console"
import mongoose from "mongoose"

export const DbConnected=async()=>{
    return await  mongoose.connect(process.env.DbUrl).then(result=>{
        log(chalk.bgCyanBright('success to connect'))
    }).catch(err=>{
        log(chalk.bgYellowBright('fail to connect'))
    })
}