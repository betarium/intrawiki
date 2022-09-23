import CommonConfig from "common/CommonConfig";
import { DataSource } from "typeorm";
import { DefaultDataSource } from "./DefaultDataSource"
import PageEntity from "./entities/PageEntity";
import UserEntity from "./entities/UserEntity"
import UserTypeCode from "./entities/UserTypeCode";

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
    user.account = "admin"
    user.password = "password"
    user.userName = "Administrator"
    user.email = "admin@localhost"
    user.userType = UserTypeCode[UserTypeCode.Admin]
    await DefaultDataSource.manager.insert(UserEntity, user)

    if (CommonConfig.NODE_ENV !== 'production') {
      const guest = new UserEntity()
      guest.account = "guest"
      guest.password = "password"
      guest.userName = "Guest"
      guest.email = "guest@localhost"
      // guest.disabled = true
      guest.userType = UserTypeCode[UserTypeCode.Guest]
      await DefaultDataSource.manager.insert(UserEntity, guest)
    }

    const home = new PageEntity()
    home.title = "/"
    home.contents = "#Home"
    await DefaultDataSource.manager.insert(PageEntity, home)

    const help = new PageEntity()
    help.title = "Help"
    help.contents = "#Help"
    await DefaultDataSource.manager.insert(PageEntity, help)

    console.log("initialize database complete.")
  }
}
