import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import mongoose from "mongoose";

import { BooksResolver, HelloResolver } from "./resolvers";
import { mongo_db } from "./app.config";

const __port__ = process.env.PORT || 3939;

const main = async () => {
	const app = express();

	// TODO: look into fix for local dev.
	app.use("*", cors());

	// Create the server.
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, BooksResolver],
			validate: false,
		}),
	});

	// Apply the middleware.
	apolloServer.applyMiddleware({ app, path: `/api/v1` });

	// Connect Mongodb.
	await mongoose
		.connect(mongo_db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("MongoDB connected");
			return app.listen({ port: __port__ });
		})
		.catch((err) => console.error(err));
};

main().catch((err) => console.error(err));
