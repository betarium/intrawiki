import ServerContext from 'web/ServerContext';
import PageEntity from 'databases/entities/PageEntity';
import express from 'express';
import { SessionModel } from 'web/SessionModel';

const router = express.Router();

interface PageRequest {
  title: string
  contents?: string
}

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}

router.post('/save', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const input = req.body as PageRequest

  if (input.title === undefined || input.title.length <= 0) {
    throw new Error("invalid parameter")
  }

  const title = fixTitle(input.title)

  if (title.length <= 0) {
    throw new Error("invalid parameter")
  }

  const oldPage = await ServerContext.dataSource.manager.findOneBy(PageEntity, { title: title })

  const page = oldPage ?? new PageEntity()
  page.title = title
  page.contents = input.contents
  page.createUser = page.createUser ?? req.session.userId ?? 1
  page.updateUser = req.session.userId ?? 1

  await ServerContext.dataSource.manager.save(PageEntity, page)

  res.send("OK");
});

interface ErrorResponse {
  code: string
  message: string
}

function fixTitle(title: string): string {
  return (title === "/" ? "/" : (title.startsWith("/") ? title.substring(1) : title))
}

router.get('/', async function (req, res, next) {
  res.setHeader('cache-control', 'no-store')
  const titleParam = req.query["title"] as string

  const title = fixTitle(titleParam)

  if (title.length <= 0) {
    throw new Error("invalid parameter")
  }

  console.debug("page request. title=" + title)
  const page = await ServerContext.dataSource.manager.findOneBy(PageEntity, { title: title })
  if (page === undefined || page === null) {
    res.status(404)
    const error = { code: "NotFound", message: "data not found" } as ErrorResponse
    res.json(error)
    return
  }

  const output = { title: page?.title, contents: page?.contents } as PageRequest
  res.json(output)
});

module.exports = router;
