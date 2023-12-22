import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export default new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /^(image\/jpeg|image\/png|text\/plain)$/, // allow .jpg, .png and .txt,
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 5, // Max 5Mb,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });

export const acceptTypes = ['image/png', 'image/jpeg', 'text/plain'];
