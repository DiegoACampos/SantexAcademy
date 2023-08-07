const express = require('express');
const courseController = require('../controllers/course-controller');

const router = express.Router();

router.post('/create', courseController.createCourse);
router.delete('/delete/:id', courseController.deleteCourse);

module.exports = router;
