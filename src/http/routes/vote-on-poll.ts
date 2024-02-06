import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { randomUUID } from "node:crypto";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);

    let { sessionId } = request.cookies;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, //7 days
        signed: true,
        httpOnly: true,
      });
    }

    return reply.status(201).send({ sessionId });
  });
}
