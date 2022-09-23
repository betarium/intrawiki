import CommonConfig from "common/CommonConfig"
import "reflect-metadata"
import { DataSource } from "typeorm"
import PageEntity from "./entities/PageEntity"
import UserEntity from "./entities/UserEntity"

export const DefaultDataSource = new DataSource({
    type: "sqlite",
    database: `tmp/db/intrawiki-${CommonConfig.NODE_ENV}.db`,
    synchronize: true,
    logging: false,
    entities: [
        UserEntity,
        PageEntity
    ],
    migrations: [],
    subscribers: [],
})
