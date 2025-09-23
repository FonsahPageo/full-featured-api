import { hash, compare } from 'bcryptjs';
import { createHmac } from 'crypto';

export const doHash = (value, saltValue) => {
    return hash(value, saltValue);
}

export const doHashValidation = (value, hashedValue) => {
    return compare(value, hashedValue);
}

export const hmacProcess = (value, key) => {
    const result = createHmac('sha256', key).update(value).digest('hex');
    return result;
}