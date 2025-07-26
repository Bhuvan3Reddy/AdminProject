import { FindAttributeOptions } from "sequelize";
import { FindAllParams, PaginationParams } from "../services/base.service";

type OrderDirection = "ASC" | "DESC";

export function parseFindAllParams<T>(
  rawFilters?: string,
  rawOrder?: string,
  rawPagination?: PaginationParams,
  rawAttributes?: string
): FindAllParams<T> {
  // Parse filters JSON safely
  let filters: Record<string, any> = {};
  if (rawFilters) {
    try {
      filters = JSON.parse(rawFilters);
    } catch {
      filters = {};
    }
  }

  // Parse order string like "name:ASC"
  let order: [string, OrderDirection][] = [["createdAt", "DESC"]];
  if (rawOrder) {
    const [field, direction] = rawOrder.split(":");
    if (field && (direction === "ASC" || direction === "DESC")) {
      order = [[field, direction]];
    }
  }

  // Parse attributes string like "id,name,email"
  let attributes: FindAttributeOptions | undefined = undefined;
  if (rawAttributes) {
    const parsed = rawAttributes
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
    if (parsed.length > 0) {
      attributes = parsed;
    }
  }

  // Pagination with defaults
  const page =
    rawPagination?.page && rawPagination.page > 0 ? rawPagination.page : 1;
  const limit =
    rawPagination?.limit && rawPagination.limit > 0 ? rawPagination.limit : 10;

  return {
    filters,
    order,
    pagination: { page, limit },
    attributes,
  };
}
