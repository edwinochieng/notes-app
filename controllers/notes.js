//@ desc    Get all notes
//@route    GET /api/v1/notes
//@access   Public
exports.getNotes = (req,res,next) => {
    res.send('Get all notes')
};

//@ desc     add note
//@route    POST /api/v1/notes
//@access   Public
exports.addNote = (req,res,next) => {
    res.send('Add note')
};

//@ desc    delete notes
//@route    DELETE /api/v1/notes/:id
//@access   Public
exports.deleteNote = (req,res,next) => {
    res.send('Delete note')
};