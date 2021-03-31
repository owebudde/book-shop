import { Field, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

import { Book } from "../entities/Book";

// Types.
@ObjectType()
class IBooks {
	@Field(() => [Book])
	books: Book[];
}

/**
 * Book Resolver.
 */
@Resolver(Book)
export class BookResolver {
	// TODO: pass args for filtered results.
	@Query(() => IBooks)
	async getBooks() {
		const books = await getConnection().query(`
			select * from book
		`);

		return { books };
	}

	@Query(() => String)
	async test() {
		return "Getting this string at least";
	}
}
