// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// const $noteTitle = $(".note-title");
          // const $noteText = $(".note-textarea");
          // const $saveNoteBtn = $(".save-note");
          // const $newNoteBtn = $(".new-note");
          // const $noteList = $(".list-container .list-group");
// ===============================================================================

const notesArray = [
  {
    noteTitle: "My note",
    noteText: "This is my Note.",
    noteID: "1",
  },
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = notesArray;
