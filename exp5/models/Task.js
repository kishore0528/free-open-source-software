const mongoose = require('mongoose'); 
const TaskSchema = new mongoose.Schema({ 
 title: { type: String, required: true, trim: true }, 
 description: { type: String, default: '' }, 
 status: { 
 type: String, 
 enum: ['TODO', 'IN_PROGRESS', 'DONE'], 
 default: 'TODO' 
 }, 
 dueDate: { type: Date }, 
 createdBy: { type: String }, // User ID or name
 estimatedHours: { type: Number }, 
}, { timestamps: true }); 
module.exports = mongoose.model('Task', TaskSchema); 
