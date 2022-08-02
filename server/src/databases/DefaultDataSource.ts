import "reflect-metadata"
import { DataSource } from "typeorm"
//import { UserEntity } from "@/databases/entities/UserEntity"
import { UserEntity } from "./entities/UserEntity"

export const DefaultDataSource = new DataSource({
    type: "sqlite",
    database: "tmp/intrawiki-dev.db",
    synchronize: true,
    logging: false,
    entities: [UserEntity],
    // entities: ["src/databases/entities/**/*.ts",
    //     "databases/entities/**/*.js",
    //     "./databases/entities/**/*.js",
    //     "./build/databases/entities/**/*.js",
    //     "build/databases/entities/**/*.js",
    //     "../build/databases/entities/**/*.js",
    //     "./entities/**/*.js",
    //     __dirname + "/entities/**/*.{ts,js}"],
    migrations: [],
    subscribers: [],
})
