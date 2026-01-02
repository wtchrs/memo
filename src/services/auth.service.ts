import { requestContext } from "../middlewares/context";

export function getCurrentUserId(): string | undefined {
    return requestContext.getStore()?.currentUserId
}
