import type { Request, Response }
from 'express';

import { WhatsAppService }
from './whatsapp.service.js';


export class WhatsAppController {

  constructor(
    private service =
      new WhatsAppService()
  ) {}


  create = async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await this.service.create(req.body);

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


  getByPhoneNumberId = async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await this.service.getByPhoneNumberId(
          req.params.phoneNumberId as string
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


  update = async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await this.service.update(
          req.params.id as string,
          req.body
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


  delete = async (
    req: Request,
    res: Response
  ) => {

    try {

      await this.service.delete(
        req.params.id as string
      );

      res.json({
        success: true
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}