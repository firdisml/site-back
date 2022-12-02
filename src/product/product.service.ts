import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async fetch_employer_product() {
    const employer_product = this.prismaService.employer_Product.findMany();
    return employer_product;
  }
}
