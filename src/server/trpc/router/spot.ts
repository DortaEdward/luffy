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
    image_public_id: z.string()
  })).mutation(({ input, ctx }) => {
    const { prisma, session } = ctx;
    const authorId = session.user.id;
    return prisma.spot.create({
      data: {
        description: input.description,
        image_url: input.image_url,
        location: input.location,
        image_public_id: input.image_public_id,
        mark_for_deletion: false,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    })
  }),

  getSpots: publicProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(10)
    }))
    .query(({ ctx, input }) => {
      const { prisma } = ctx;
      const userId = ctx.session?.user?.id
      const { limit, cursor } = input;

      return prisma.spot.findMany({
        take: limit + 1,
        orderBy: {
          createdAt: 'desc'
        },
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          likes: {
            where: {
              userId
            },
            select: {
              userId: true
            }
          },
          author: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          _count: {
            select: {
              likes: true,
            },
          },
        }
      });
    }),

  exploreFeed: protectedProcedure.query(({ ctx }) => {
    const { prisma, session } = ctx;
    const userId = session?.user.id;
    return prisma.spot.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        authorId: {
          not: userId
        }
      },
      include: {
        likes: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
      }
    })
  }),

  likeSpot: protectedProcedure
    .input(z.object({
      spotId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { prisma } = ctx;
      return prisma.like.create({
        data: {
          Spot: {
            connect: {
              id: input.spotId
            }
          },
          User: {
            connect: {
              id: userId
            }
          }
        }
      })
    }),

  unLikeSpot: protectedProcedure
    .input(z.object({
      spotId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { prisma } = ctx;
      return prisma.like.delete({
        where: {
          spotId_userId: {
            spotId: input.spotId,
            userId
          }
        }
      })
    }),

});
