const express = require('express');
const multer = require('multer');
const recordingController = require('../controllers/recordingController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('audio'), recordingController.createRecording);
router.get('/', recordingController.getAllRecordings);
router.patch('/:id/loop', recordingController.updateLoopStatus);
router.delete('/:id', recordingController.deleteRecording);

module.exports = router;