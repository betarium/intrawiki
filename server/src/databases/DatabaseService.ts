import { DefaultDataSource } from "./DefaultDataSource"
// import UserEntity from "./entities/UserEntity"
import { UserEntity } from "./entities/UserEntity"

export default class DatabaseService {
  async initialize() {

    await DefaultDataSource.initialize()

    const user = new UserEntity()
    user.account = "admin"
    user.password = "password"
    user.email = "admin@localhost"
    await DefaultDataSource.manager.save(user)

    const guest = new UserEntity()
    guest.account = "guest"
    guest.password = "password"
    guest.email = "guest@localhost"
    await DefaultDataSource.manager.save(guest)

    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)


  }
}
