import ServerContext from 'common/ServerContext';
import PageEntity from 'databases/entities/PageEntity';
import express from 'express';

const router = express.Router();

interface PageRequest {
  title: string
  contents?: string
}

router.post('/save', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const input = req.body as PageRequest

  const page = new PageEntity()
  page.id = 1
  page.title = input.title
  page.contents = input.contents

  await ServerContext.dataSource.manager.insert(PageEntity, page)

  res.send("OK");
});

interface ErrorResponse {
  code: string
  message: string
}

router.get('/', async function (req, res, next) {
  res.setHeader('cache-control', 'no-store')
  const title = req.query["title"] as string
  console.warn("page request. title=" + title)
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
