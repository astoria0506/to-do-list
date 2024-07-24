import jwt from 'jsonwebtoken';
export const validateJWT = (request) => {
  const token = request.headers.get('Authorization')?.split('Bearer ').pop() || '';
  if (token) {
    try {
      const jwtSecret = process.env.AUTH_PRIVATE_KEY ? process.env.AUTH_PRIVATE_KEY : 'shhhhh';
      const decoded = jwt.verify(token, jwtSecret);
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
  throw new Error('No token provided');
};