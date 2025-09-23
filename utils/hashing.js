import { hash, compare } from 'bcryptjs';

export const doHash = (value, saltValue) => {
    return hash(value, saltValue);
}

export const doHashValidation = (value, hashedValue) => {
    return compare(value, hashedValue);
}