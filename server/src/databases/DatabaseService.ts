import { DataSource } from "typeorm";
import { DefaultDataSource } from "./DefaultDataSource"
// import UserEntity from "./entities/UserEntity"
import { UserEntity } from "./entities/UserEntity"

export default class DatabaseService {

  public get value(): DataSource {
    return DefaultDataSource;
  }

  async initialize() {

    console.log("initialize database...")

    await DefaultDataSource.initialize()

    const userCount = await DefaultDataSource.manager.count(UserEntity)

    if (userCount !== 0) {
      console.log("initialize database complete.")
      return
    }

    console.log("insert data...")

    const user = new UserEntity()
    user.id = 1
    user.account = "admin"
    user.password = "password"
    user.userName = "Administrator"
    user.email = "admin@localhost"
    await DefaultDataSource.manager.insert(UserEntity, user)

    const guest = new UserEntity()
    guest.id = 2
    guest.account = "guest"
    guest.password = "password"
    user.userName = "Guest"
    guest.email = "guest@localhost"
    guest.disabled = true
    await DefaultDataSource.manager.insert(UserEntity, guest)

    console.log("initialize database complete.")
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)


  }
}
