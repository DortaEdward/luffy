import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const spotRouter = router({
  create: protectedProcedure.input(z.object({
    image_url: z.string({
      required_error: 'Image is needed'
    }),
    description: z.string({
      required_error: 'Description is needed'
    }),
    location: z.string({
      required_error: 'Location is needed'
    }),
  })).mutation(({ input, ctx }) => {
    const { prisma, session } = ctx;
    const authorId = session.user.id;
    return prisma.spot.create({
      data: {
        description: input.description,
        image_url: input.image_url,
        location: input.location,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    })
  })
});
