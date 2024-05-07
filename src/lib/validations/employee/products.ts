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
    priceInKg: z.coerce.number().min(0, numberError),
    harvestedFrom: z.string().min(3).max(20),
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

export type AddStocksType = z.infer<typeof AddStocksScehma>

export const AddStocksScehma = z.object({
    id: z.string().optional(),
    typeOfMeasurement: z.string().min(1).max(21),
    quantity: z.coerce.number().min(0, numberError),
    perMeasurement: z.array(
        z.object({
            measurement: z.coerce.number().min(0, variantError),
            price: z.coerce.number().min(0, numberError),
            estPieces: z.string().min(0, numberError).optional(),
        })
    ),
})

export type UpdateStocksType = z.infer<typeof UpdateStocksSchema>

export const UpdateStocksSchema = z.object({
    typeOfMeasurement: z.string().min(1).max(21),
    quantity: z.coerce.number().min(0, numberError),
})


export type FormType = z.infer<typeof DeclineProductSchema>

export const DeclineProductSchema = z.object({
    transactionId: z.string().optional(),
    type: z.enum([
        //employee
        "OutOfStock", "PaymentIssues", "AddressVerification", "SellerError", "NonResponsiveBuyer", "ViolationOfPolicies", "ShippingRestrictions", "ProductDiscontinuation", "SystemErrors",
        //users
        "ChangeOfMind", "FoundBetterDeal", "UnavailabilityOfItem", "DeliveryDelay", "IncorrectItem", "CommunicationIssues",
        //all
        "Other_Reason"], {
        required_error: "You need to select a reason for cancelling.",
    }),
    otherReason: z.string({
        required_error: "Specifying a reason is required. This will help us improve our service."
    }).min(5, { message: "Reason for cancelling must atleast contain (5) characters" }).max(500, { message: "Error: You've reached the maximum of 500 characters." }),
})