import express from 'express';

import userCtrl from '../controllers/user.controller';

const router = express.Router();

/***********************
 * URL: /api/user
 ***********************/

router.get('/:username', userCtrl.getUserByUsername.bind(userCtrl));
router.put('/', userCtrl.register.bind(userCtrl));

export default router;
