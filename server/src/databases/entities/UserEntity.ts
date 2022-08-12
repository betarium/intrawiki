import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ unique: true })
	account: string;

	@Column({ nullable: true })
	password?: string;

	@Column({ name: "user_name" })
	userName: string;

	@Column({ name: "email", unique: true, nullable: true })
	email?: string;

	@Column({ name: "user_type" })
	userType: string = "Users";

	@Column()
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
