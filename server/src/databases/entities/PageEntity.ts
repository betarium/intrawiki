import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "pages" })
export default class PageEntity {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	contents?: string;

	@Column({ name: "create_user" })
	createUser: number;

	@Column({ name: "update_user" })
	updateUser: number;

	@Column({ name: "create_timestamp" })
	readonly createTimestamp: Date;

	@Column({ name: "update_timestamp" })
	updateTimestamp: Date;

	constructor() {
		this.id = undefined as any as number;
		this.title = "";
		this.createUser = 1
		this.updateUser = 1
		const date = new Date();
		this.createTimestamp = date;
		this.updateTimestamp = date;
	}
}
