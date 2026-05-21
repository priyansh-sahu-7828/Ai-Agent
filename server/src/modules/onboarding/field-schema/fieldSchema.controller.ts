import type {
  Request,
  Response,
  NextFunction
} from 'express';

import { FieldSchemaRepository }
from './fieldSchema.repository.js';

export class FieldSchemaController {

  constructor(
    private repo: FieldSchemaRepository
  ) {}

  // ───────────────────────────────────────────
  // GET ALL
  // ───────────────────────────────────────────

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const schemas =
        await this.repo.findAll();

      res.status(200).json({
        success: true,
        count: schemas.length,
        data: schemas
      });

    } catch (error) {

      console.error(
        '[FieldSchema] getAll:',
        error
      );

      next(error);
    }
  };

  // ───────────────────────────────────────────
  // GET BY ID
  // ───────────────────────────────────────────

  getOne = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const schema =
        await this.repo.findById(
          req.params.id
        );

      if (!schema) {

        res.status(404).json({
          success: false,
          message:
            `Field schema with id "${req.params.id}" not found.`
        });

        return;
      }

      res.status(200).json({
        success: true,
        data: schema
      });

    } catch (error) {

      console.error(
        '[FieldSchema] getOne:',
        error
      );

      next(error);
    }
  };

  // ───────────────────────────────────────────
  // GET BY FIELD KEY
  // ───────────────────────────────────────────

  getByKey = async (
    req: Request<{ fieldKey: string }>,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const schema =
        await this.repo.findByFieldKey(
          req.params.fieldKey
        );

      if (!schema) {

        res.status(404).json({
          success: false,
          message:
            `Field schema with key "${req.params.fieldKey}" not found.`
        });

        return;
      }

      res.status(200).json({
        success: true,
        data: schema
      });

    } catch (error) {

      console.error(
        '[FieldSchema] getByKey:',
        error
      );

      next(error);
    }
  };

  // ───────────────────────────────────────────
  // CREATE
  // ───────────────────────────────────────────

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const {
        field_key,
        field_name,
        field_description,
        field_type,
        required,
        regex_pattern,
        min_value,
        max_value,
        allowed_values,
        extraction_hint,
        example_value,
        category,
        display_order
      } = req.body;

      // REQUIRED VALIDATION

      const missing: string[] = [];

      if (!field_key)  missing.push('field_key');
      if (!field_name) missing.push('field_name');
      if (!field_type) missing.push('field_type');
      if (!category)   missing.push('category');

      if (missing.length > 0) {

        res.status(400).json({
          success: false,
          message:
            `Missing required fields: ${missing.join(', ')}`
        });

        return;
      }

      // TYPE VALIDATION

      const validTypes = [
        'string',
        'number',
        'boolean',
        'array',
        'json',
        'date'
      ];

      if (!validTypes.includes(field_type)) {

        res.status(400).json({
          success: false,
          message:
            `Invalid field_type "${field_type}"`
        });

        return;
      }

      // CATEGORY VALIDATION

      const validCategories = [
        'general',
        'business',
        'communication',
        'ai_config',
        'services',
        'escalation',
        'compliance'
      ];

      if (!validCategories.includes(category)) {

        res.status(400).json({
          success: false,
          message:
            `Invalid category "${category}"`
        });

        return;
      }

      // DUPLICATE CHECK

      const existing =
        await this.repo.findByFieldKey(field_key);

      if (existing) {

        res.status(409).json({
          success: false,
          message:
            `Field schema "${field_key}" already exists`
        });

        return;
      }

      const schema =
        await this.repo.create({
          field_key,
          field_name,
          field_description,
          field_type,
          required,
          regex_pattern,
          min_value,
          max_value,
          allowed_values,
          extraction_hint,
          example_value,
          category,
          display_order
        });

      res.status(201).json({
        success: true,
        message:
          'Field schema created successfully',
        data: schema
      });

    } catch (error) {

      console.error(
        '[FieldSchema] create:',
        error
      );

      next(error);
    }
  };

  // ───────────────────────────────────────────
  // UPDATE
  // ───────────────────────────────────────────

  update = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const existing =
        await this.repo.findById(
          req.params.id
        );

      if (!existing) {

        res.status(404).json({
          success: false,
          message:
            `Field schema with id "${req.params.id}" not found`
        });

        return;
      }

      if (
        !req.body ||
        Object.keys(req.body).length === 0
      ) {

        res.status(400).json({
          success: false,
          message:
            'Empty request body'
        });

        return;
      }

      const updated =
        await this.repo.update(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          'Field schema updated successfully',
        data: updated
      });

    } catch (error) {

      console.error(
        '[FieldSchema] update:',
        error
      );

      next(error);
    }
  };

  // ───────────────────────────────────────────
  // DELETE
  // ───────────────────────────────────────────

  remove = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const existing =
        await this.repo.findById(
          req.params.id
        );

      if (!existing) {

        res.status(404).json({
          success: false,
          message:
            `Field schema with id "${req.params.id}" not found`
        });

        return;
      }

      await this.repo.delete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          `Field schema "${existing.field_key}" deleted successfully`
      });

    } catch (error) {

      console.error(
        '[FieldSchema] remove:',
        error
      );

      next(error);
    }
  };
}