import {
  Controller,
  UseInterceptors,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { EmployerVerificationDto } from 'src/utils/dto';
import { AccessTokenDecorator } from 'src/utils/decorator/access.decorator';
import { AccessGuard } from 'src/utils/guard';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('employer/submission')
  @UseGuards(AccessGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'employer_picture', maxCount: 1 },
      { name: 'employer_document', maxCount: 1 },
    ]),
  )
  async employer_verification(
    @AccessTokenDecorator('user_id') employer_id: string,
    @UploadedFiles()
    employer_files: {
      employer_picture?: Express.Multer.File[];
      employer_document?: Express.Multer.File[];
    },
    @Body() employerVerificationDto: EmployerVerificationDto,
  ) {
    if (Object.entries(employer_files).length !== 2) {
      return { error: 'Files invalid!' };
    }
    return this.verificationService.employer_submit(
      employer_files,
      employerVerificationDto,
      employer_id,
    );
  }
}
