import { DataSource } from "typeorm";
import { DefaultDataSource } from "./DefaultDataSource"
import PageEntity from "./entities/PageEntity";
import UserEntity from "./entities/UserEntity"

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
    // user.id = 1
    user.account = "admin"
    user.password = "password"
    user.userName = "Administrator"
    user.email = "admin@localhost"
    await DefaultDataSource.manager.insert(UserEntity, user)

    const guest = new UserEntity()
    // guest.id = 2
    guest.account = "guest"
    guest.password = "password"
    guest.userName = "Guest"
    guest.email = "guest@localhost"
    guest.disabled = true
    await DefaultDataSource.manager.insert(UserEntity, guest)

    const home = new PageEntity()
    home.title = "/"
    home.contents = "#Home"
    await DefaultDataSource.manager.insert(PageEntity, home)

    const help = new PageEntity()
    help.title = "Help"
    help.contents = "#Help"
    await DefaultDataSource.manager.insert(PageEntity, help)

    console.log("initialize database complete.")
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)


  }
}
