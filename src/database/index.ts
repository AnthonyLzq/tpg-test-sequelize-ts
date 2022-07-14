import { Sequelize } from 'sequelize'
import { initProject, initUser } from './models'

const initArray = [initProject, initUser]
const sequelizeConnection = new Sequelize(process.env.DB_URI as string)

initArray.forEach(initFn => initFn(sequelizeConnection))

export { sequelizeConnection }
