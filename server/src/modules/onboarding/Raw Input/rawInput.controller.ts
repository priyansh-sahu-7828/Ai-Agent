import type {
  Request,
  Response,
  NextFunction
} from 'express';

import { RawInputService } from './rawInput.service.js';

export class RawInputController {

  constructor(
    private service: RawInputService
  ) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const rawInput =
        await this.service.createRawInput(req.body);

      res.status(201).json({
        success: true,
        data: rawInput
      });

    } catch (e) {
      next(e);
    }
  };

  getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const rawInput =
        await this.service.getRawInput(
          req.params.id as string
        );

      res.json({
        success: true,
        data: rawInput
      });

    } catch (e) {
      next(e);
    }
  };

  getByClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const rawInputs =
        await this.service.getClientRawInputs(
          req.params.clientId as string
        );

      res.json({
        success: true,
        data: rawInputs
      });

    } catch (e) {
      next(e);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const rawInput =
        await this.service.updateRawInput(
          req.params.id as string,
          req.body
        );

      res.json({
        success: true,
        data: rawInput
      });

    } catch (e) {
      next(e);
    }
  };

  updateByClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const rawInput =
        await this.service.updateByClientRawInput(
          req.params.clientId as string,
          req.body
        );

      res.json({
        success: true,
        data: rawInput
      });

    } catch (e) {
      next(e);
    }
  };

  remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      await this.service.deleteRawInput(
        req.params.id as string
      );

      res.json({
        success: true
      });

    } catch (e) {
      next(e);
    }
  };

  removeByClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      await this.service.deleteByClientRawInput(
        req.params.clientId as string
      );

      res.json({
        success: true
      });

    } catch (e) {
      next(e);
    }
  };
}