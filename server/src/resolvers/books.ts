import {
	Arg,
	Ctx,
	Field,
	FieldResolver,
	InputType,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { Book } from "../entities/Book";
// import { MyContext } from "../types";

// @InputType()
// class PostInput {
// 	@Field()
// 	title: string;

// 	@Field()
// 	author: string;
// }

// @ObjectType()
// class PaginatedPosts {
//   @Field(() => [Post])
//   posts: Post[];
//   @Field()
//   hasMore: boolean;
// }

export class BookResolver {
	async getBooks() {
		return "fetching all books...";
	}
	// async getBooks(@Arg("limit", () => Int) limit: number) {
	// 	const books = getConnection().query(`
	// 		select * from books;
	// 	`);

	// 	return {
	// 		books,
	// 		// render more?
	// 	};
	// }

	// async createBook(@Arg("input") input: PostInput, @Ctx() { req }: MyContext) {
	// 	return Book.create({});
	// }
}
