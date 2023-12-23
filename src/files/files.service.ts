import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

  async removeFile(
    fileName: string,
    folder: string,
    file: Express.Multer.File,
  ) {
    const filePath = join(process.cwd(), `public/images/${folder}/${fileName}`);
    if (existsSync(filePath)) {
      await unlink(filePath);
      return {
        fileDeleted: fileName,
        fileUploaded: file.filename,
      };
    } else
      return {
        fileDeleted: 'Not found',
        fileUploaded: file.filename,
      };
  }
}
