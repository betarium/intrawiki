import CommonConfig from 'common/CommonConfig';
import express from 'express';

const router = express.Router();

router.get('/*', function (req, res, next) {
  const path = req.path
  if (path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".png")) {
    res.setHeader('cache-control', 'no-store')
    req.statusCode = 404
    res.statusMessage = "Not found."
    return
  }

  req.statusCode = 404
  res.setHeader('cache-control', 'no-store')
  res.sendFile(CommonConfig.PUBLIC_DIR + "/index.html");
});

module.exports = router;
