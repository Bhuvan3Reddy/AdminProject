// src/common/base.service.ts

import {
  FindAttributeOptions,
  FindOptions,
  Includeable,
  Model,
  ModelStatic,
  Order,
  WhereOptions,
} from "sequelize";
import { ErrorResponse, SuccessResponse } from "../shared/api-response.dto";
import { ResponseStatus } from "../enum/response-status.enum";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FindAllParams<T> {
  filters?: WhereOptions<T>;
  pagination?: PaginationParams;
  order?: Order;
  include?: Includeable[];
  attributes?: FindAttributeOptions; // <-- add this for specific columns
}

export class BaseService<T extends Model> {
  constructor(protected readonly model: ModelStatic<T>) {}

  /**
   * Create and save a new record
   */
  async save(
    data: Partial<T>,
    params?: FindAllParams<T>
  ): Promise<Promise<SuccessResponse<T> | ErrorResponse>> {
    try {
      const { attributes = ["id"], filters = {} } = params || {};

      const options: FindOptions = {
        where: filters,
        attributes,
      };

      if (Object.keys(filters).length > 0) {
        const record = await this.findOneWithParams(options);
        if (record) {
          return {
            status: ResponseStatus.STATUS_ERROR,
            message: ResponseStatus.EXISTS,
          };
        }
      }
      this.model.create(data as any);
      return {
        status: ResponseStatus.STATUS_SUCCESS,
        message: ResponseStatus.MSG_SUCCESS,
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  /**
   * Update a record by ID
   */
  async update(
    id: number | string,
    data: Partial<T>
  ): Promise<SuccessResponse<T> | ErrorResponse> {
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        return {
          status: ResponseStatus.STATUS_ERROR,
          message: ResponseStatus.RECORD_NOT_FOUND,
        };
      }

      record.update(data as any);
      return {
        status: ResponseStatus.STATUS_SUCCESS,
        message: ResponseStatus.MSG_SUCCESS,
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  /**
   * Find a single record
   */
  async findOneWithParams(options: FindOptions): Promise<T> {
    try {
      const record = await this.model.findOne(options);
      return record;
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  /**
   * Find a single record
   */
  async findOne(params?: FindAllParams<T>): Promise<T> {
    try {
      const { attributes, filters = {} } = params || {};

      const options: FindOptions = {
        where: filters,
        attributes,
      };

      const record = await this.model.findOne(options);
      return record;
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  /**
   * Find all records with optional filters, pagination, and order
   */
  async findAll(params?: FindAllParams<T>): Promise<{
    data: T[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const {
        attributes,
        filters = {},
        pagination = {},
        order = [["createdAt", "DESC"]] as Order,
        include = [],
      } = params || {};

      const page = pagination.page ?? 1;
      const limit = pagination.limit ?? 10;
      const offset = (page - 1) * limit;

      const options: FindOptions = {
        attributes,
        where: filters,
        order,
        include,
        limit,
        offset,
      };

      const { rows, count } = await this.model.findAndCountAll(options);

      return {
        data: rows,
        total: count,
        page,
        limit,
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  /**
   * Delete a record by ID
   */
  async delete(id: number | string): Promise<boolean> {
    const record = await this.model.findByPk(id);
    if (!record) throw new Error("Record not found");
    await record.destroy();
    return true;
  }
}
