import { z } from "zod";

const bgmiIdSchema = z.object({
    gameID: z.string().min(1, { message: "Bgmi Id is required" }),
});

const freeFireIdSchema = z.object({
    gameID: z.string().min(1, { message: "FreeFire Id is required" }),
});

const valorantIdSchema = z.object({
    gameID: z.object({
        riotId: z.string().min(1, { message: "Riot Id is required" }),
        tagline: z.string().min(1, { message: "Tagline is required" }),
    }),
});

const codmIdSchema = z.object({
    gameID: z.string().min(1, { message: "Codm Id is required" }),
});

const asphaltIdSchema = z.object({
    gameID: z.string().min(1, { message: "Asphalt Id is required" }),
});

export {
    bgmiIdSchema,
    freeFireIdSchema,
    valorantIdSchema,
    codmIdSchema,
    asphaltIdSchema,
};
