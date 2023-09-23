// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import {Request, Response, NextFunction} from 'express';
import {Point} from 'geojson';
import CustomError from '../../classes/CustomError';
import UploadMessageResponse from '../../interfaces/UploadMessageResponse';
import {validationResult} from 'express-validator';

const catPost = async (
  req: Request,
  res: Response<{}, {coords: Point}>,
  next: NextFunction
) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
          .array()
          .map((error) => `${error.msg}: ${error.param}`)
          .join(', ');
          next (new CustomError(messages, 400));
          return;
      }

    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      throw err;
    }

    const response: UploadMessageResponse = {
      message: 'file uploaded',
      data: {
        filename: req.file.filename + '_thumb',
        location: res.locals.coords,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export {catPost};
