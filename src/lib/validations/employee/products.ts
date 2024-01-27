import { z } from "zod"

export type CreateProductType = z.infer<typeof CreateProductSchema>

// export const CreateProductSchema = z.object({
//     productImage: z.string(),
//     name: z.string()
//         .min(3, { message: "Minimum product name should be 3 characters" })
//         .max(20, { message: "Maximum product name should be 20 characters" }),
//     // kilo: z.coerce.number(),
//     // price: z.coerce.number(),
//     quantity: z.coerce.number({
//         required_error: "Number expected!"
//     }),
//     category: z.string().min(2, { message: "Category must be atleast (2) characters" }).max(21, { message: "Category must be (21) characters max" }),
//     perKilo: z.array(
//         z.object({
//             price: z.coerce.number(),
//             estPieces: z.coerce.number(),
//         })
//     ),
//     perPack: z.array(
//         z.object({
//             price: z.coerce.number(),
//             estPieces: z.coerce.number(),
//         })
//     ),
//     estPiecesKilo: z.coerce.number(),
//     estPiecesPack: z.coerce.number(),
// })

const numberError = { message: "Field must be 0 or more" }

export const CreateProductSchema = z.object({
    productImage: z.string(),
    name: z.string().min(3).max(20),
    quantity: z.coerce.number().min(0, numberError),
    category: z.string().min(2).max(21),
    perKilo: z.array(
        z.object({
            kilo: z.coerce.number().min(0, numberError),
            price: z.coerce.number().min(0, numberError),
            estPieces: z.string().min(0, numberError),
        })
    ),
    perPack: z.array(
        z.object({
            pack: z.coerce.number().min(0, numberError),
            price: z.coerce.number().min(0, numberError),
            estPieces: z.string().min(0, numberError),
        })
    ),
    // estPiecesKilo: z.number().optional(),
    // estPiecesPack: z.number().optional(),
});

export type UpdateProductType = z.infer<typeof UpdateProductSchema>

export const UpdateProductSchema = z.object({
    id: z.string().optional(),
    itemNumber: z.coerce.number().optional(),
    name: z.string(),
    kilo: z.coerce.number().optional(),
    price: z.coerce.number(),
})