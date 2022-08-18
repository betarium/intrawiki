import ServerContext from 'web/ServerContext';
import UserEntity from 'databases/entities/UserEntity';
import express from 'express';
import { User } from 'api/models/User';
import { UserListResponse } from 'api/models';

const router = express.Router();

/* GET users listing. */
router.get('/', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const users = await ServerContext.dataSource.manager.find(UserEntity)
  const items = users.map(p => ({ id: p.id, account: p.account, email: p.email, userName: p.userName, userType: p.userType } as User))
  const output = { items: items } as UserListResponse
  res.json(output)
});

router.get('/:id', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const id = req.params["id"]
  const userId = parseInt(id)
  const user = await ServerContext.dataSource.manager.findOneBy(UserEntity, { id: userId })
  if (user === null || user === undefined) {
    res.sendStatus(404)
    return
  }

  const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
  res.json(output)
});

router.put('/', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const input = req.body as User

  let user = new UserEntity()
  user.account = input.account
  user.email = input.email
  user.userName = input.userName

  user = await ServerContext.dataSource.manager.save(user)

  const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
  res.json(output)
});

router.patch('/:id', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const id = req.params["id"]
  const input = req.body as User

  const userId = parseInt(id)
  let user = await ServerContext.dataSource.manager.findOneBy(UserEntity, { id: userId })
  if (user === null || user === undefined) {
    res.sendStatus(404)
    return
  }

  user.email = input.email
  user.userName = input.userName

  user = await ServerContext.dataSource.manager.save(user)

  const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
  res.json(output)
});

module.exports = router;
