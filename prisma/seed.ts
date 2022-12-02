import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const create = await prisma.employer_Product.create({
    data: {
      name: 'Starter',
      product_api: 'price_1LzPxhC3J13TnkehVXwawAAK',
      product_credit_value: 10,
    },
  });
}

main();
