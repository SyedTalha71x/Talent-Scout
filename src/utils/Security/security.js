import CryptoJs from 'crypto-js';
import jwt from 'jsonwebtoken'

export function decryptedPassword(password, key) {
    const bytes = CryptoJs.AES.decrypt(password, key);
    const decryptedPassword = bytes.toString(CryptoJs.enc.Utf8);
    return decryptedPassword;
}

export function hashpassword(password) {
    const hashpassword = CryptoJs.SHA256(password).toString(CryptoJs.enc.Hex);
    return hashpassword;
}

export function generateToken(id, email, secret) {
    const token = jwt.sign(
        { id, email },
        secret
    );
    return token;
}