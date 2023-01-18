// document.getElementById('test').innerHTML = "hansome buddy";

const addbtn = document.querySelector("#addbtn");

const main = document.querySelector("#main")

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    // console.log(data)
    if (data.length === 0){
        localStorage.removeItem("notes")
    }else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
    
}


addbtn.addEventListener(
    "click",
    function(){
        addNote()
    }
)

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.innerHTML = `
    <div class="note">
        <div class="tool">
            <img class="save" src="save_icon.png" alt="save">
            <img class="trash" src="trash_icon.png" alt="trash">
        </div>
        <textarea>${text}</textarea>
    </div>    
    `;

    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    
    )

    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes()
        }
    )

    main.appendChild(note);
    saveNotes()
}
(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
    
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }
    }
)()