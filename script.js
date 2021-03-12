const addBtn = document.getElementById("add");

//event listener on add button
addBtn.addEventListener("click", () => addNewNote(""));

//function to add new note with para of text which is by default blank
function addNewNote(text = "") {
   const add_note = document.getElementById("add_new");
   add_note.style.display = "none";

   // Creating a div with classname of note and adding inner html of edit and delete button
   const note = document.createElement("div");
   note.classList.add("note");
   note.innerHTML = `
    <div class="tools">
      <button class="edit" title="edit & submit"><i class="fas fa-edit"></i></button>
      <button class="delete" title="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <!-- conditionaly giving hidden class to div and text area -->
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
  `;

  //grabbing all the elements inside the div
   const editBtn = note.querySelector(".edit");
   const deleteBtn = note.querySelector(".delete");
   const main = note.querySelector(".main");
   const textArea = note.querySelector("textarea");
   
   // giving the text area a value of the text which is passed as argument
   textArea.value = text;
   // adding the `markedown` inside the main
   main.innerHTML = marked(text);
   
   // deleting the note
   deleteBtn.addEventListener("click", () => {
      note.remove();

      // updating the local storage
      updateLs();
   });

   // editing the note
   editBtn.addEventListener("click", () => {
      // toggling hidden classes
      main.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
   });
   // grabing the value input in text area and giving it to main
   textArea.addEventListener("input", (e) => {
      const { value } = e.target;

      main.innerHTML = marked(value);
      // updating local storage
      updateLs();
   });
   
   // grabbing .note_app div and appending entire note to it
   const notes__app = document.querySelector(".note_app");
   notes__app.appendChild(note);
}


// local storage update function
function updateLs() {
   //selecting all the text area
   const notesText = document.querySelectorAll("textarea");

   //an empty array of notes
   const notes = [];

   // looping over the text area and pushing its values to the notes array
   notesText.forEach((note) => notes.push(note.value));

   //  setting the array inside local storage , converting it to string
   localStorage.setItem("notes", JSON.stringify(notes));

   // checking if notes array length is 0 or not and changing the display of add notes description
   if (notes.length == 0) {
      const add_note = document.getElementById("add_new");
      add_note.style.display = "inline-block";
   }
}

// get notes from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

// loop over the notes in local storage and run the addNewNote function
if (notes) {
   notes.forEach((note) => addNewNote(note));
}
