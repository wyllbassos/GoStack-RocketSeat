import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreteUserService';
import UpdateUserAvatarServices from '../services/UpdateUserAvatarServices';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();
const upload = multer(uploadConfig);

userRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.send({
      ...user,
      password: undefined,
    });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarServices();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json({
      ...user,
      password: undefined,
    });
  },
);

export default userRoutes;
