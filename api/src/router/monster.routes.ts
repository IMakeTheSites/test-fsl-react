import { Router } from 'express';
import { MonsterController } from '../controllers/monster.controller';

const router = Router();

router.get('/', MonsterController.list);
router.get('/del', MonsterController.del);

export default router;
