import { Controller, All, Res, Req, Inject } from '@nestjs/common';

import { FileStore } from '@tus/file-store';
import { Server } from '@tus/server';
import { Request, Response } from 'express';

@Controller('files')
export class AppController {
  // we define it here as a property so
  // it can be used in a bigger scope:
  private tusInstanceforImage: Server;
  private tusInstanceforVideo: Server;

  constructor() {
    this.tusInstanceforImage = new Server({
      respectForwardedHeaders: true,
      path: '/files/image',
      datastore: new FileStore({ directory: './files/image' }),
    });
    this.tusInstanceforVideo = new Server({
      respectForwardedHeaders: true,
      path: '/files/video',
      datastore: new FileStore({ directory: './files/video' }),
    });
  }

  @All(['image', 'image/*'])
  uploadPhoto(@Res() res: Response, @Req() req: Request) {
    this.tusInstanceforImage.handle(req, res);
  }

  @All(['video', 'video/*'])
  uploadVideo(@Res() res: Response, @Req() req: Request) {
    this.tusInstanceforVideo.handle(req, res);
  }
}
