import type { Request, Response } from 'express';

import {
  FinalStructuredService
} from './finalStructured.service.js';


export class FinalStructuredController {

  constructor(
    private service =
      new FinalStructuredService()
  ) {}

  create = async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await this.service.create(
          req.body
        );

      res.status(201).json({
        success: true,
        data: result
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };


  getByClientId = async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await this.service.getByClientId(
          req.params.clientId as string
        );

      res.json({
        success: true,
        data: result
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}