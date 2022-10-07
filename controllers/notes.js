const Note = require('../models/Note');

//@ desc    Get all notes
//@route    GET /api/v1/notes
//@access   Public
exports.getNotes = async (req,res,next) => {
    try {
        const notes = await Note.find();

        return res.status(200).json({
            success: true,
            count : notes.length,
            data : notes
        });
    } catch (err) {
        return res.status(500).json({
            success: true,
            error : 'Server Error'
        })
    }
};

//@ desc     add note
//@route    POST /api/v1/notes
//@access   Public
exports.addNote = async (req,res,next) => {
    try {
        const {title,content} = req.body;

        const note = await Note.create(req.body);

        return res.status(201).json({
            success:true,
            data : note
        })

    } catch (err) {
        if (err.name === 'ValidationError') {
            const message = Object.values(err.error).map(val => val.message);
            return res.status(400).json({
                success:false,
                error: message
            })
        } else {
            return res.status(500).json({
                success: true,
                error : 'Server Error'
            })
        }
    }
    

};

//@ desc    delete notes
//@route    DELETE /api/v1/notes/:id
//@access   Public
exports.deleteNote = async (req,res,next) => {
    try {

        const note = await Note.findById(req.params.id)

        if(!note){
            return res.status(404).json({
                success:false,
                error: 'No note found'
            });
        }
        await note.remove();
        return res.status(200).json({
            success:true,
            data:{}
        })
    } catch (err) {
        return res.status(500).json({
            success: true,
            error : 'Server Error'
        })
    }
};