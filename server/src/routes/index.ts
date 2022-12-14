import CommonConfig from 'common/CommonConfig';
import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.setHeader('cache-control', 'no-store')
  res.sendFile(CommonConfig.PUBLIC_DIR + "/index.html");
});

router.get('/static/*', function (req, res, next) {
  res.sendFile(CommonConfig.PUBLIC_DIR + req.path);
});

module.exports = router;
