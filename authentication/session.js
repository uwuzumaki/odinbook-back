import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";

const prismaSession = session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax",
    //secure: true, turn on in prod
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdFunction: undefined,
    dbRecordIdIsSessionId: true,
  }),
});

export default prismaSession;
