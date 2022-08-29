import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import UserTypeCode from "./UserTypeCode";

@Entity({ name: "users" })
export default class UserEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ unique: true, length: 100 })
	account: string;

	@Column({ nullable: true, length: 100 })
	password?: string;

	@Column({ name: "user_name", type: "nvarchar", length: 100 })
	userName: string;

	@Column({ unique: true, nullable: true, length: 100 })
	email?: string;

	@Column({
		name: "user_type",
		length: 20,
		default: UserTypeCode[UserTypeCode.Normal]
	})
	userType: string = UserTypeCode[UserTypeCode.Normal];

	@Column({ default: false })
	disabled: boolean = false;

	@Column({ name: "create_user", nullable: true })
	createUser: number;

	@Column({ name: "update_user", nullable: true })
	updateUser: number;

	@Column({ name: "create_timestamp" })
	readonly createTimestamp: Date;

	@Column({ name: "update_timestamp" })
	updateTimestamp: Date;

	constructor() {
		this.id = undefined as any as number;
		this.account = "";
		// this.password = null;
		this.userName = "";
		this.email = "";
		this.createUser = 1
		this.updateUser = 1
		const date = new Date();
		this.createTimestamp = date;
		this.updateTimestamp = date;
	}
}
