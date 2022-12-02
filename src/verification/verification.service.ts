import { Injectable, ForbiddenException } from '@nestjs/common';
import { EmployerVerificationDto } from 'src/utils/dto';
import * as sharp from 'sharp';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { FlatVerificationFileType } from 'src/utils/type';
import { AccountEnum } from 'src/utils/enum';

@Injectable()
export class VerificationService {
  constructor(private readonly prismaService: PrismaService) {}
  //Submit pictures anmd form
  async employer_submit(
    files: any,
    employerVerificationDto: EmployerVerificationDto,
    employer_id: string,
  ) {
    const type = await this.prismaService.user.findMany({
      //Check if user is employer
      where: {
        AND: [{ id: employer_id }, { account_type: AccountEnum.EMPLOYER }],
      },
    });

    //Throw error if user is not employer
    if (type.length === 0) {
      throw new ForbiddenException('You are not employer!');
    }

    //Check if user already created profile (Submitted verification)
    const profile = await this.prismaService.employer_Profile.findUnique({
      where: {
        user_id: employer_id,
      },
    });

    //Throw error if user already created profile
    if (profile) {
      throw new ForbiddenException('Verification already submitted!');
    }

    //Uploadedfile temp array
    const uploaded = [];
    //Loop through files array
    for (const [key, value] of Object.entries(files)) {
      //Upload individual file from the loop to S3
      const { url } = await this.employer_upload(value[0].buffer, employer_id);
      //Push uploaded file link to temp array
      uploaded.push({ [key]: url });
    }

    //Flat array of object
    const flat = this.flat(uploaded);

    //Update database
    const update = this.employer_update(
      employerVerificationDto,
      flat,
      employer_id,
    );

    return update;
  }

  /*  This is a helper function section  */
  /*  This is a helper function section  */
  /*  This is a helper function section  */
  /*  This is a helper function section  */

  //Object flattener
  flat(obj: any) {
    return Object.assign({}, ...obj);
  }

  //file transformer
  transformer(buffer: Buffer) {
    return sharp(buffer).resize(800).webp({ effort: 3 });
  }

  //AWS S3 upload function
  async employer_upload(buffer: Buffer, user_id: string) {
    try {
      //Initialize AWS S3 Service
      const s3 = new S3();
      //Upload to S3
      const uploadResult = await s3
        .upload({
          Bucket: 'bucketfirdaus',
          Body: this.transformer(buffer),
          Key: `employer/${user_id}/files/` + `${uuid()}.webp`,
        })
        .promise();
      //Return key and url
      return {
        url: uploadResult.Location,
      };
    } catch (err) {
      console.log(err);
      return { key: 'error', url: err.message };
    }
  }

  //Query to postgres
  //Save data to database
  async employer_update(
    employerVerificationDto: EmployerVerificationDto,
    flat: FlatVerificationFileType,
    employer_id: string,
  ) {
    //Update database with verification form
    const update = await this.prismaService.user.update({
      where: {
        id: employer_id,
      },
      data: {
        employer_profile: {
          create: {
            employer_verification_submission: true,
            employer_name: employerVerificationDto.employer_name,
            employer_size: employerVerificationDto.employer_size,
            employer_industry: employerVerificationDto.employer_industry,
            employer_register_number: employerVerificationDto.employer_website,
            employer_type: employerVerificationDto.employer_type,
            employer_website: employerVerificationDto.employer_website,
            employer_file: {
              create: {
                employer_document: flat.employer_document,
                employer_picture: flat.employer_picture,
              },
            },
            employer_address: {
              create: {
                employer_address: employerVerificationDto.employer_address,
                employer_postal: employerVerificationDto.employer_postal,
                employer_city: employerVerificationDto.employer_city,
                employer_state: employerVerificationDto.employer_state,
                employer_country: employerVerificationDto.employer_country,
              },
            },
          },
        },
      },
    });
    return update;
  }
}
