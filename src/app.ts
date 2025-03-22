import type { NextFunction, Request, Response } from "express";

import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { auth } from "~/lib/auth";
import { expandResponse } from "~/middlewares/response";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(morgan("dev"));

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expandResponse);

app.use("/me", async (request, response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  response.success(
    {
      data: {
        session,
      },
    },
    {
      message: "Session retrieved successfully",
    },
  );
});

app.all("*", (_request, response) => {
  response.notFound({}, { message: "Not Found" });
});

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    console.error(error);

    response.internalServerError({}, { message: "Internal Server Error" });
  },
);

export { app };
