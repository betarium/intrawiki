import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	account: string;

	@Column({ nullable: true })
	password?: string;

	@Column({ name: "user_name", unique: true })
	userName: string;

	@Column({ name: "email", unique: true })
	email: string;

	@Column({ name: "user_type" })
	userType: string = "Users";

	@Column()
	disabled: boolean = false;

	@Column({ name: "create_timestamp" })
	createTimestamp: Date;

	@Column({ name: "update_timestamp" })
	updateTimestamp: Date;

	constructor() {
		this.id = 0;
		this.account = "";
		this.userName = "";
		this.email = "";
		const date = new Date();
		this.createTimestamp = date;
		this.updateTimestamp = date;
	}
}
