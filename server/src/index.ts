import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";

import { HelloResolver } from "./resolvers";

const main = async () => {
	const app = express();

	// TODO: look into fix for local dev.
	app.use("*", cors());

	// Create the server.
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: false,
		}),
	});

	// Apply the middleware.
	apolloServer.applyMiddleware({ app, path: `/api/v1` });

	// Start the port.
	app.listen(3600, () => console.log("Server started on localhost:3600"));
};

main().catch((err) => console.error(err));
