class NotePocket{
    constructor (title, content, color, pin, createdDate){
        this.title = title;
        this.content = content;
        this.color = color;
        this.pin = pin;
        this.createdDate = createdDate;
        this.notes = [];
    }

    addNote = () => {
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;
        const color = document.querySelector("#color").value;
        const pin = document.querySelector("#pin").checked;
        const createdDate = new Date();

        const newNote = new NotePocket(title, content, color, pin, createdDate);

        const notesArray = JSON.parse(localStorage.getItem('notes')) || [];
        notesArray.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        displayNotes();  
    }
}

const addButton = document.querySelector("#add");
addButton.addEventListener("click", () => {
  new NotePocket().addNote();
});

function displayNotes(){
    const notesArray = JSON.parse(localStorage.getItem('notes')) || [];

    const notes = document.querySelector(".notes");
    notes.innerHTML = "";

    for(let i = 0; i < notesArray.length; i++){
        const note = notesArray[i];

        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const noteTitle = document.createElement("h3");
        noteTitle.textContent = note.title;

        noteDiv.style.backgroundColor = note.color;

        const noteContent = document.createElement("p");
        noteContent.textContent = note.content;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";

        editBtn.addEventListener("click", () => {
            const title = note.title;
            const content = note.content;
            const color = note.color;

            const editForm = document.createElement("form");
            editForm.innerHTML = `<input type = "text" id = "edit-title" value="${title}" required>
            <textarea id="edit-content">${content}</textarea> <select id="edit-color" required> 
            <option value="">Select color...</option> <option value="#43B9B3" ${color === 
            "#43B9B3" ? "selected" : ""}>Blue</option> <option value="#B343B9" ${color ===   
            "#B343B9" ? "selected" : ""}>Violet</option> <option value="#B9B343" ${color ===
            "#B9B343" ? "selected" : ""}>Yellow</option> </select> <button id="save-edit">Save</button> <button id="cancel-edit">Cancel</button> `;
             editForm.id = "edit-form";       

            editForm.querySelector("#save-edit").addEventListener("click", () => {
              const newTitle = editForm.querySelector("#edit-title").value;
              const newContent = editForm.querySelector("#edit-content").value;
              const newColor = editForm.querySelector("#edit-color").value;
          
              notesArray[i].title = newTitle;
              notesArray[i].content = newContent;
              notesArray[i].color = newColor;
          
              localStorage.setItem('notes', JSON.stringify(notesArray));
          
              noteDiv.removeChild(editForm);
              displayNotes();
            });
          
            editForm.querySelector("#cancel-edit").addEventListener("click", () => {
              noteDiv.removeChild(editForm);
            });

            noteDiv.appendChild(editForm);
            editBtn.addEventListener("click", () => {
            noteDiv.removeChild(editBtn);
            });
    
        });

        deleteBtn.addEventListener("click", () =>{
            notesArray.splice(i, 1);

            //aktualizacja localStorage
            localStorage.setItem('notes', JSON.stringify(notesArray));
            displayNotes();
        });

        noteDiv.appendChild(noteTitle);
        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(deleteBtn);
        noteDiv.appendChild(editBtn);
        notes.appendChild(noteDiv);
    }
}

displayNotes();