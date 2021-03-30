import { ObjectType, Field, Int } from "type-graphql";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	OneToMany,
} from "typeorm";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt!: Date;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	author!: string;
}
