import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import fs from 'fs';
import { diskStorage } from 'multer';
import path, { join } from 'path';
import { acceptTypes } from './config/files.format';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  // get root directory of project
  getRootPath = () => {
    return process.cwd();
  };

  // create directory if not exist
  ensureExists(targetDirectory: string) {
    fs.mkdir(targetDirectory, { recursive: true }, (error) => {
      if (!error) {
        console.log('Directory successfully created, or it already exists.');
        return;
      }
      switch (error.code) {
        case 'EEXIST':
          // Error:
          // Requested location already exists, but it's not a directory.
          break;
        case 'ENOTDIR':
          // Error:
          // The parent hierarchy contains a file with the same name as the dir
          // you're trying to create.
          break;
        default:
          // Some other error like permission denied.
          console.error(error);
          break;
      }
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // get folder name from request header
          const folder = req?.headers?.folder_type ?? 'default';
          this.ensureExists(`public/images/${folder}`);
          cb(null, join(this.getRootPath(), `public/images/${folder}`));
        },
        filename: (req, file, cb) => {
          //get image extension
          const extName = path.extname(file.originalname);
          //get image's name (without extension)
          const baseName = path.basename(file.originalname, extName);
          const finalName = `${baseName}-${Date.now()}${extName}`;
          cb(null, finalName);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 5 },

      // validate file mime type
      fileFilter(req, file, cb) {
        try {
          if (!acceptTypes.includes(file.mimetype))
            throw new UnprocessableEntityException(
              'Invalid file type. Expected type: image/jpeg|image/png|text/plain',
            );
          cb(null, true);
        } catch (error) {
          cb(error, false);
        }
      },
    };
  }
}
