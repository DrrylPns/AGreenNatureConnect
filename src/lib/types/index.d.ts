'use server'
import { Message, NotificationType, ReviewDislike, ReviewLike, User, ChatRoom, Prisma } from '@prisma/client';

export interface CustomButtonProps {
  title: string,
  btnType: "button" | "submit",
  containerStyles?: string,
  handleClick?: () => void,
}
export interface Author {
  id: string;
  name: string | null;
  username: string;
  email: string | null;
  emailVerified: boolean | null;
  image: string | null;
  hashedPassword: string | null;
  middleName: string | null;
  lastName: string | null;
  suffix: string | null;
  phoneNumber: string | null;
  address: string | null;
  bio: string
  role: string;
  createdAt: string;
  updatedAt: string;
  isBanned: boolean;
  numberOfViolations: number;
}


export interface PostTypes {
  id: string;
  title: string;
  content: Content;
  reports: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: Author;
  topicId: string;
  comments: Comment[];
  likes: Like[];
  replyOnComent: Reply[]
  topic: Topic
}

export interface Post {
  id: string;
  title: string;
  content: Content;
  reports: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: Author;
  topicId: string;
  comments: Comment[];
  likes: Like[];
  topic: Topic
}

export interface Like {
  userId: string;
  postId: string;
}

export interface Topic {
  id: string;
  name: string;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
  creatorId: string | null;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  authorId: string;
  post: Post;
  postId: string;
  replyToId: string | null;
  replyTo: Comment | null;
  replies: Comment[];
  replyOnComent: Reply[]
  commentId: string;
}

export interface Content {
  time: number,
  blocks: Blocks[],
  version: string
}
export interface Block {
  id: String
  data: Data
  type: String
}
export interface Data {
  text: string,
  file: File
  caption: string
  stretched: boolean
  withBorder: boolean
  withBackground: boolean
}
export interface File {
  url: string
}

export interface Product {
  id: string;
  itemNumber: number | null;
  productImage: string;
  name: string;
  kilograms: number;
  grams: number;
  pounds: number;
  pieces: number;
  packs: number;
  variants: Variants[]
  category: string;
  status: string;
  isFree: boolean;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  community: Community;
  communityId: string;
  reviews: Reviews[]
}
export interface Community {
  id: string;
  name: string;
  carouselImage: CommunityImage[];
  displayPhoto: string;
  urbanFarmName: string;
  address: string;
  email: string;
  contactNumber: string;
  description: string;
  isArchived: boolean;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  blogs: Blog[];
}

export interface CommunityImage {
  id: string,
  communityId: string,
  imageUrl: string,
}
export interface Variants {
  id: string
  unitOfMeasurement: string;
  variant: number;
  price: number;
  EstimatedPieces: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  orderVariant: OrderedVariant[];
}
export interface Cart {
  id: string
  createdAt: string;
  updatedAt: string;
  user: Author;
  variant: Variants;
  variantId: string;
  community: Community;
  communityId: string;
  quantity: number;
}

export interface Reviews {
  id: string
  image: string | null
  priceRating: number
  qualityRating: number
  serviceRating: number
  freshnessRating: number
  overAllRating: number
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  productId: string
  User: ReviewUser
  userId: string
  like: ReviewLike[]
  dislike: ReviewDislike[]
}

export interface ReviewUser {
  image: string | null
  username: string | null;
}

export interface ReviewDislike {
  id: string
  user: Author
  userId: string
  review: Review
  reviewId: string
}
export interface ReviewLike {
  id: string
  user: Author
  userId: string
  review: Review
  reviewId: string
}
export interface ReviewDislike {
  id: string
  user: User
  userId: string
  review: Review
  reviewId: string
}
export interface ShippingInfo {
  id: string
  createdAt: Date;
  updatedAt: Date;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  facebook: string;
  userId: string;
}

export interface ResultItem {
  communityId: string;
  totalPrice: number;
  products: ProductVariant[]
}

export interface ProductVariant {
  productId: string;
  variant: Variants;
  isFree: boolean;
  quantity: number;
}

export interface Transaction {
  id: string;
  referenceId: string;
  amount: number;
  status: string;
  buyer: Author;
  buyerId: string;
  seller: Community
  sellerId: string;
  orderedVariant: OrderedVariant[]
  createdAt: string;
  updatedAt: string;
}

export interface OrderedVariant {
  id: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  variant: Variants;
  variantId: string;
  product: Product;
  productId: string
  transaction: Transaction;
  transactionId: string;
}

export interface NotificationWithUser {
  id: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  communityId: string;
  transactionId: string;
  user: User;
  community: Community;
  transaction: Transaction;
  Reaction: string;
  Comment: string;
  author: string;
}

export interface CommentsWithReplies {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  postId: string;
  replyToId: string | null;
  commentId: string;
  replyOnComent: Reply[]
}

interface Reply {
  id: string;
  text: string;
  createdAt: Date;
  commentId: string;
  userId: string;
  user: User
}

export interface CommunityWithMessages {
  id: string;
  name: string;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[]
}

export interface ChatRoomWithMessagesAndCommunity {
  id: string;
  createdAt: Date;
  userId: string;
  communityId: string;
  community: Community;
  // messages: Message[]
}

// export interface UsersWithCommunityMessages {
//   id: string;
//   name: string | null;
//   EmployeeId: string | null;
//   username: string | null;
//   email: string | null;
//   emailVerified: Date | null;
//   image: string | null;
//   hashedPassword: string | null;
//   middleName: string | null;
//   lastName: string | null;
//   phoneNumber: string | null;
//   address: string | null;
//   role: $Enums.Role;
//   gender: string | null;
//   birthday: Date | null;
//   bio: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   isBanned: boolean;
//   numberOfViolations: number,
//   isNotificationsEnabled: boolean,
//   lastUsernameChange: Date,
//   isBannedFromPosting: Date,
//   communityId: string | null;
//   Message: Message[]
// }

export type UserWithCommunityMessages = Prisma.UserGetPayload<{
  include: {
    Message: true
  }
}>

export type ProductWithOrderedVariant = Prisma.ProductGetPayload<{
  include: {
    orderedVariant: true,
  },
}>

export type CommunityMessages = Prisma.CommunityGetPayload<{
  include: {
    messages: true
  }
}>

export type ChatRoomWithRelations = Prisma.ChatRoomGetPayload<{
  include: {
    community: true,
    messages: true,
  }
}>

export type ChatRoomWithAllRelation = Prisma.ChatRoomGetPayload<{
  include: {
    messages: true,
    community: true,
    user: true,
  }
}>

export type employeeActivityHistoryWithTransaction = Prisma.EmployeeActivityHistoryGetPayload<{
  include: {
    product:{
      include:{
        orderedVariant: true
      },
    },
    employee: true,
    transaction: {
      include: {
        orderedVariant: {
          include: {
            product: true,
            variant: true
          }
        }
      }
    },
    blog: true,
    video: true,
    learningMaterial: true,
  },
}>

export type NotificationWithUser = Prisma.NotificationGetPayload<{
  error: String, 
  include: {
    user: true,
    community: true,
    transaction: true,
    Reaction: {
        include: {
            post: {
                include: {
                    topic: true
                }
            },
            user: true
        }
    },
    Reply: {
        include: {
            user: true,
            comment: {
                include: {
                    post: {
                        include: {
                            topic: true
                        }
                    }
                }
            }
        }
    },
    Comment: {
        include: {
            post: {
                include: {
                    topic: true
                }
            },
            author: true
        }
    },
    Post: {
        include: {
            author: true,
            topic: true,
        }
    },
},
}>