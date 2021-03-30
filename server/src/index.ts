import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, Connection } from "typeorm";

import { BookResolver, HelloResolver } from "./resolvers";
import { Book } from "./entities/Book";

const __port__ = process.env.PORT || 7777;

const main = async () => {
	const app = express();
	const connection: Connection = await createConnection({
		type: "postgres",
		url: process.env.DATABASE_URL,
		logging: true,
		username: "postgres",
		password: "Lewesbeach!3",
		database: "unique_books",
		entities: [Book],
	});

	// Test...
	const repository = connection.getRepository(Book);
	const book = new Book();
	book.title = "title";
	book.author = "author";
	await repository.save(book);

	const allBooks = await Book.find();
	console.log("all books::", allBooks);

	// TODO: Redis.

	// Create the server.
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: false,
		}),
	});

	// Set api path, and turn off cors for local dev.
	apolloServer.applyMiddleware({
		app,
		path: `/api/v1`,
		cors: false,
	});

	app.listen(__port__, () => {
		console.log(`Server started on localhost: ${__port__}`);
	});
};

main().catch((err) => console.error(err));
