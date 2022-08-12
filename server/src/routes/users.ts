import ServerContext from 'web/ServerContext';
import { UserEntity } from 'databases/entities/UserEntity';
import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  // const users = await ServerContext.dataSource.manager.find(UserEntity)
  // res.json(users)
});

module.exports = router;
