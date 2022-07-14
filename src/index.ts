import { sequelizeConnection } from 'database'
import { User } from 'database/models'

const main = async () => {
  await sequelizeConnection.authenticate()
  // await sequelizeConnection.sync()

  const user = await User.create({
    email: 'sluzquinosa@uni.pe',
    name: 'Anthony',
    lastName: 'Luzquiños'
  })

  await user.createProject({
    name: 'Harper'
  })
}

main()
