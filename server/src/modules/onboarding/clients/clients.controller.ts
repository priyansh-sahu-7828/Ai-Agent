// src/modules/clients/clients.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { ClientsService } from './clients.service.js';

export class ClientsController {
  constructor(private service: ClientsService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await this.service.createClient(req.body);
      res.status(201).json({ success: true, data: client });
    } catch (e) { next(e); }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await this.service.getClient(req.params.id as string);
      res.json({ success: true, data: client });
    } catch (e) { next(e); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await this.service.updateClient(req.params.id as string, req.body);
      res.json({ success: true, data: client });
    } catch (e) { next(e); }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteClient(req.params.id as string);
      res.json({ success: true });
    } catch (e) { next(e); }
  };
}