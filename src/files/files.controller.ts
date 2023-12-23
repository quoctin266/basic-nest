import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
  ParseFilePipeBuilder,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';
import { ResponseMessage } from 'src/decorator/customize';
// import fileConfig from './config/files.format';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ResponseMessage('Upload image successfully')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'folder_type',
    description: 'Folder type',
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() data: UploadFileDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return {
      fileName: file.filename,
    };
  }

  @Put('update')
  @ResponseMessage('Update image successfully')
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'folder_type',
    description: 'Folder type',
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  updateImage(
    @Body() data: UpdateFileDto,
    @UploadedFile()
    file: Express.Multer.File,
    @Headers() headers,
  ) {
    return this.filesService.removeFile(
      data.oldFileName,
      headers.folder_type,
      file,
    );
  }

  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
