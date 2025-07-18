import { Router } from 'express';
import {
  register,
  login,
  protectedRoute,
  publicRoute,
  getUserById,
} from '../controllers/authController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authMiddleware, protectedRoute);
router.get('/public', publicRoute);
router.get('/user/:id', authMiddleware, getUserById);

export default router;
// import { Router } from 'express';
// import {
//   register,
//   login,
//   protectedRoute,
//   publicRoute,
// } from '../controllers/authController';
// import authMiddleware from '../middleware/auth';

// const router = Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/protected', authMiddleware, protectedRoute);
// router.get('/public', publicRoute);

// export default router;
