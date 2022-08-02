import { DefaultDataSource } from "databases/DefaultDataSource"
import { DataSource } from "typeorm"

class ServerContextImpl {
  public get dataSource(): DataSource {
    return DefaultDataSource
  }
}

const ServerContext = new ServerContextImpl()

export default ServerContext
