import ServerContext from 'web/ServerContext';
import UserEntity from 'databases/entities/UserEntity';
import express from 'express';
import { User } from 'api/models/User';
import { ApiResultResponse, ErrorCode, UserListResponse } from 'api/models';

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

  try {
    let user = new UserEntity()
    user.account = input.account
    user.email = input.email
    if (user.email === "") {
      user.email = undefined
    }
    user.userName = input.userName
    user.userType = input.userType
    user.disabled = input.disabled ?? false
    if (input.password !== undefined && input.password.length > 0) {
      user.password = input.password
    }

    user = await ServerContext.dataSource.manager.save(user)

    const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
    res.json(output)
  }
  catch (ex) {
    console.error("user regist failed. account=" + input.account, ex)
    res.statusCode = 500
    res.json({ success: false, status: 500, code: ErrorCode.ServerError } as ApiResultResponse)
  }
});

router.patch('/:id', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const id = req.params["id"]
  const input = req.body as User

  try {
    const userId = parseInt(id)
    let user = await ServerContext.dataSource.manager.findOneBy(UserEntity, { id: userId })
    if (user === null || user === undefined) {
      res.sendStatus(404)
      return
    }

    user.email = input.email
    user.userName = input.userName
    if (user.email === "") {
      user.email = null as any
    }
    user.userType = input.userType
    user.disabled = input.disabled ?? false
    if (input.password !== undefined && input.password.length > 0) {
      user.password = input.password
    }

    user = await ServerContext.dataSource.manager.save(user)

    const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
    res.json(output)
  }
  catch (ex) {
    console.error("user update failed. account=" + input.account, ex)
    res.statusCode = 500
    res.json({ success: false, status: 500, code: ErrorCode.ServerError } as ApiResultResponse)
  }
});

module.exports = router;
