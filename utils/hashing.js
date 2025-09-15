import { hash } from "bcryptjs"

export const doHash = (value, saltValue) => {
    return result = hash(value, saltValue);
}