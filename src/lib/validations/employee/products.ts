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
const variantError = { message: "Variant must be 1 or more" }

export const CreateProductSchema = z.object({
    productImage: z.string(),
    name: z.string().min(3).max(20),
    quantity: z.coerce.number().min(0, numberError),
    category: z.string().min(2).max(21),
    typeOfMeasurement: z.string().min(1).max(21),
    perMeasurement: z.array(
        z.object({
            measurement: z.coerce.number().min(0, variantError),
            price: z.coerce.number().min(0, numberError),
            estPieces: z.string().min(0, numberError),
        })
    ),
});

export type UpdateProductType = z.infer<typeof UpdateProductSchema>

export const UpdateProductSchema = z.object({
    id: z.string().optional(),
    productImage: z.string().optional(),
    name: z.string().min(3).max(20).optional(),
    // quantity: z.coerce.number().min(0, numberError),
    category: z.string().min(2).max(21).optional(),
    // typeOfMeasurement: z.string().min(1).max(21),
    // perMeasurement: z.array(
        // z.object({
            // measurement: z.coerce.number().min(0, variantError),
            // price: z.coerce.number().min(0, numberError),
            // estPieces: z.string().min(0, numberError),
        // })
    // ),
});