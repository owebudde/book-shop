import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { HelloResolver } from "./resolvers";

const __port__ = process.env.PORT || 7777;

const main = async () => {
	const app = express();

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
