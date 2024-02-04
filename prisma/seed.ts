// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed users
    const user1 = await prisma.user.create({
      data: {
        name: 'Johny Oghayon',
        username: 'johny',
        email: 'johny@example.com',
        // Add other user data as needed
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Ralph Saladina',
        username: 'ralp',
        email: 'ralp@example.com',
        // Add other user data as needed
      },
    });

    // temporary comment

    // Seed products
    // const product1 = await prisma.product.create({
    //   data: {
    //     name: 'Product 1',
    //     kilo: 2.5,
    //     price: 10.99,
    //     creatorId: user1.id,
    //     // Add other product data as needed
    //   },
    // });

    // const product2 = await prisma.product.create({
    //   data: {
    //     name: 'Product 2',
    //     kilo: 1.0,
    //     price: 5.99,
    //     creatorId: user2.id,
    //     // Add other product data as needed
    //   },
    // });

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
}

// Call the seed function to execute the seeding process
seed();
