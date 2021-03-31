import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, Connection } from "typeorm";

import { BookResolver, HelloResolver } from "./resolvers";
import { Book } from "./entities/Book";
import { typeOrmConfig } from "./ormconfig";

const __port__ = process.env.PORT || 7777;

const main = async () => {
	const app = express();
	console.log("here");
	const connection: Connection = await createConnection(typeOrmConfig);
	console.log("connected to pg::", connection);

	// Test...
	// const repository = connection.getRepository(Book);
	// const book = new Book();
	// book.title = "title";
	// book.author = "author";
	// await repository.save(book);

	// const allBooks = await Book.find();
	// console.log("all books::", allBooks);

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

	// Close the postgresql connection.
	await connection.close();
	console.log("PG connection closed.");
};

main().catch((err) => console.error(err));
