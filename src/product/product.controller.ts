import {
  Controller,
  Get,
  UseGuards,
  CacheTTL,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AccessGuard } from 'src/utils/guard';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('employer/product')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(20)
  @UseGuards(AccessGuard)
  async fetch_employer_product() {
    return this.productService.fetch_employer_product();
  }
}
