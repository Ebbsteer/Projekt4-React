import { createHash } from 'crypto'

/**
 * Hashes a string using MD5
 * @param {string} input String to hash
 * @returns {string} MD5 hash of input
 */
export const hashMD5 = (input) => {
    return createHash('md5').update(input).digest('hex');
}