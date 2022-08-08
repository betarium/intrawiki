import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "pages" })
export default class PageEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	contents?: string;

	@Column({ name: "create_timestamp" })
	createTimestamp: Date;

	@Column({ name: "update_timestamp" })
	updateTimestamp: Date;

	constructor() {
		this.id = -1;
		this.title = "";
		const date = new Date();
		this.createTimestamp = date;
		this.updateTimestamp = date;
	}
}
