const Recording = require('../models/Recording');
const { saveFile, deleteFile } = require('../utils/fileStorage');

exports.createRecording = async (req, res) => {
  try {
    const { duration } = req.body;
    const filename = await saveFile(req.file);
    const recording = new Recording({
      filename,
      duration,
    });
    await recording.save();
    res.status(201).json(recording);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find().sort({ createdAt: -1 });
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLoopStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { loopStatus } = req.body;
    const recording = await Recording.findByIdAndUpdate(
      id,
      { loopStatus },
      { new: true }
    );
    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }
    res.json(recording);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRecording = async (req, res) => {
  try {
    const { id } = req.params;
    const recording = await Recording.findById(id);
    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }
    await deleteFile(recording.filename);
    await recording.remove();
    res.json({ message: 'Recording deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};