import { z } from "zod";
import { GiftType } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "next/server/api/trpc";

const createGiftInput = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  bought: z.boolean().default(false),
  type: z.nativeEnum(GiftType),
  boughtBy: z.string().optional(),
  descripton: z.string().optional(),
  messages: z.string().optional(),
  photoUrl: z.string(),
});

export const giftRouter = createTRPCRouter({
  create: publicProcedure
    .input(createGiftInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.gift.create({
        data: {
          name: input.name,
          price: input.price,
          bought: input.bought,
          type: input.type,
          boughtBy: input.boughtBy,
          descripton: input.descripton,
          messages: input.messages,
          photoUrl: input.photoUrl,
        },
      });
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.gift.findMany();
  }),
  types: publicProcedure.query(() => {
    return Object.keys(GiftType).map((key) => key);
  }),
});
