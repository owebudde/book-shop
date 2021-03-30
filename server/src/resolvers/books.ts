import { Resolver, Query, Int, Arg, Ctx, Mutation } from "type-graphql";
import { Book } from "../entities/Book";

Book.

@Resolver()
export class BooksResolver {
	@Query(() => [Book])
	async books(): Promise<Book[]> {
		const posts = await Book.find().sort({ createdAt: -1 });
		return posts;
	}

	// Get book, by id.
	// @Query(() => Book, { nullable: true })
	// book(
	// 	@Arg("id", () => Int) id: number
	// 	// @Ctx() { em }: MyContext
	// ): Promise<Book | null> {
	// 	return em.findOne(Book, { id });
	// }
}
