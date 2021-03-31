import {
	// Arg,
	// Ctx,
	Field,
	// FieldResolver,
	// InputType,
	// Int,
	// Mutation,
	ObjectType,
	Query,
	Resolver,
	// Root,
	// UseMiddleware,
} from "type-graphql";
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
	// Get all books.
	// TODO: pass args to slim down the results.
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
