import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import convert from "koa-convert";
import cors from "koa-cors";
import { koaPlayground } from "graphql-playground-middleware";
import { graphqlHTTP } from "koa-graphql";
import { config } from "./config";
import { accountSchema } from "./schema/account/schema";
import { mergeSchemas } from "@graphql-tools/schema";
import { transactionSchema } from "./schema/transaction/schema";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(convert(cors({ maxAge: 86400, credentials: true })));

router.get("/", (ctx) => {
  const info = [
    "/graphql - GraphiQL",
    "/playground - GraphQL Playground",
    "/status - Status server",
  ];

  ctx.status = 200;
  ctx.body = info.join("\n");
});

router.get("/status", (ctx) => {
  ctx.status = 200;
  ctx.body = "running";
});

router.all(
  "/playground",
  koaPlayground({
    endpoint: "/graphql",
  }),
);

const schemas = mergeSchemas({
  schemas: [accountSchema, transactionSchema],
});


const appGraphQL = convert(
  graphqlHTTP(async (request, response, koaContext) => {
    return {
      graphiql: config.NODE_ENV !== "production",
      schema: schemas,
      rootValue: {
        request: koaContext.request,
      },
      context: {
        koaContext,
      },
    };
  }),
);

router.all("/graphql", appGraphQL);

app.use(router.routes()).use(router.allowedMethods());

export default app;
