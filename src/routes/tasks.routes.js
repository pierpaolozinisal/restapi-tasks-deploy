import { Router } from "express";

import * as taskCtrl from "../controllers/task.controller";


const router = Router();


router.get('/', taskCtrl.findAllTasks)
router.get('/done', taskCtrl.findAllDoneTasks)
router.get('/:id', taskCtrl.findOneTask)
router.delete('/:id', taskCtrl.deleteTask)
router.post('/', taskCtrl.createTask )
router.put('/:id',taskCtrl.updateTask )
router.get('/title/:title', taskCtrl.findOneTaskTitle)
router.get('/like/:title', taskCtrl.findOneTaskTitleLike)
router.get('/old', taskCtrl.findAllTasksOld)
export default router;