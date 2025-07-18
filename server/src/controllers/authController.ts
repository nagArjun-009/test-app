// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import UserModel from '../models/user';
// import { AuthRequest } from '../types/auth';

// interface JwtPayload {
//   userId: string;
//   username: string;
// }

// export const register = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: 'Username and password are required' });
//   }

//   try {
//     const existingUser = await UserModel.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new UserModel({ username, password: hashedPassword });
//     await user.save();

//     const payload: JwtPayload = {
//       userId: user._id.toString(),
//       username: user.username,
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
//       expiresIn: '1h',
//     });
//     res.status(201).json({ token, username: user.username });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error during registration' });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: 'Username and password are required' });
//   }

//   try {
//     const user = await UserModel.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload: JwtPayload = {
//       userId: user._id.toString(),
//       username: user.username,
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
//       expiresIn: '1h',
//     });
//     res.json({ token, username: user.username });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// };

// export const protectedRoute = (req: AuthRequest, res: Response) => {
//   res.json({ message: 'This is a protected page', user: req.user });
// };

// export const publicRoute = (req: Request, res: Response) => {
//   res.json({ message: 'This is a public page' });
// };

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import { AuthRequest } from '../types/auth';

interface JwtPayload {
  userId: string;
  username: string;
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, password: hashedPassword });
    await user.save();

    const payload: JwtPayload = {
      userId: user._id.toString(),
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '3600h',
    });
    res.status(201).json({ token, username: user.username });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload: JwtPayload = {
      userId: user._id.toString(),
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.json({ token, username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const protectedRoute = (req: AuthRequest, res: Response) => {
  res.json({ message: 'This is a protected page', user: req.user });
};

export const publicRoute = (req: Request, res: Response) => {
  res.json({ message: 'This is a public page' });
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId, '-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user._id, username: user.username });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};
