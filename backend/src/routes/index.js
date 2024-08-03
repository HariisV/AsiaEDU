const express = require('express');

const router = express.Router();

const { authenticateUser, authorizeRoles } = require('#middlewares');

const authRouter = require('#api/auth/route.js');
const fileRouter = require('#api/file/route.js');

const userRouter = require('#api/user/route.js');
const dashboardRouter = require('#api/dashboard/route.js');
const manageUserRouter = require('#api/manage-user/route.js');
const kelasRouter = require('#api/kelas/route.js');
const kelasArticleRouter = require('#api/kelas/article/route-user.js');
const kelasArticleAdminRouter = require('#api/kelas/article/route.js');
const kelasUserRouter = require('#api/kelas/route.user.js');
const manageHomeSectionRouter = require('#api/home-section/route.js');

router.use('/api/file', fileRouter);
router.use('/api/auth', authRouter);
router.use('/api/dashboard', dashboardRouter);

router.use('/api/user', authenticateUser, userRouter);
router.use('/api/user/kelas', kelasUserRouter);
router.use('/api/user/kelas/article', authenticateUser, kelasArticleRouter);

router.use('/api/admin', authenticateUser, authorizeRoles('ADMIN'));
router.use('/api/admin/kelas', kelasRouter);
router.use('/api/admin/users', manageUserRouter);
router.use('/api/admin/home-section', manageHomeSectionRouter);
router.use(
  '/api/admin/kelas/article',
  authenticateUser,
  kelasArticleAdminRouter
);

module.exports = router;
