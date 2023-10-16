import Medusa from "@medusajs/medusa-js";
import {useAdminOrders} from "medusa-react";

export const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
export const medusaService = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
