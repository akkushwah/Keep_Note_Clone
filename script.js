let Notes = [];

// let deletedNote = [];
storedTodos = localStorage.getItem('Notes');

Notes = storedTodos ? storedTodos.split(',') : [];

let deletedValue = [];


let dialogPage = document.querySelector('.dialogPage');
let container = document.querySelector('.dialogPage .container');
let closeBtn = document.querySelector('.dialogPage .closeBtn');
let modifiedNote = document.querySelector('.scroll');
let mainPage = document.querySelector('.main-container');
let binPage = document.querySelector('.binPage');
let binContainer = document.querySelector('.binContainer');


//****************************/ toggle dropdown /**************************** */
function showdropDown() {
  let grid = document.querySelector('#drop');
  grid.classList.toggle('active');
  if (grid.classList.contains('active')) {
    document.querySelector('.googleOptions').style.backgroundColor = "#c8c8c8cd";
  } else {
    document.querySelector('.googleOptions').style.backgroundColor = "transparent";
  }
}


// ************************************************************
// let tooltip = document.querySelectorAll('.tooltip');
// let text = document.querySelectorAll('.tooltiptext')

// tooltip.forEach((icon) => {
//   icon.addEventListener('mouseover', () => {
//     text.forEach((t) => {
//       t.style.visibilty = "visible";
//     })
//   })
// })

//****************************/ Menu button /*************************
function toggleNavBar() {
  let navBar = document.querySelector(".navbar");
  navBar.classList.toggle('collapse');
}



// *********************************************************************

// function for main page
function home() {
  binPage.style.display = "none";
}

//****************************/ Hover on list /*************************
let list = document.querySelectorAll('.navbar .navitem');
list.forEach(item => {
  // item.addEventListener('mouseover', () => {
  //   document.querySelector('.navbar').style.boxShadow = "1px 1px 5px #c8c8c8cd";
  // });

  item.addEventListener('click', (e) => {
    console.log(e);
    list.forEach(navitem => {
      navitem.classList.remove('active-hover')
    });

    item.classList.add('active-hover');
  })
});




//****************************/ Enter Key while adding Notes /*************************
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    // Prevent default behavior (form submission)
    event.preventDefault();
    // Trigger button click event
    addNotes();
  }
}

//************************/ Grid/List toggle /*******************


let clicked = true;
function gridToggle() {
  let gridIcon = document.querySelector('.gridIcon');
  let cards = document.querySelectorAll('.notecard');
  let noteConatiner = document.querySelector('.noteContainer');

  if (clicked) {
    gridIcon.style.display = "none";
    document.querySelector('.tile').style.display = "block";

    cards.forEach(card => {
      card.style.marginInline = "auto";
      card.style.width = "50vw";
      noteConatiner.style.flexDirection = "column";
    });
    clicked = false;
  } else {
    gridIcon.style.display = "block";
    document.querySelector('.tile').style.display = "none";
    noteConatiner.style.flexDirection = "row";

    cards.forEach(card => {
      card.style.width = "275px";
      card.style.margin = "1rem";

    });
    clicked = true;
  }


}

//************************/ hovering style of top header search bar /************/
function selectedsearch() {
  let searchDiv = document.querySelector('.search-div'); searchDiv.classList.toggle('selected');
}


//**************** Adding Notes *********************
function addNotes() {
  let noteItem = document.querySelector('.inputValue');
  let inputText = noteItem.value.trim();
  if (inputText !== '') {
    Notes.push(inputText);
    saveNotesTolocalStorage(); // call function to save Notes
    noteItem.value = "";
    displayNotes();
  }
  else {
    alert("please enter a Note");
  }
}

// *******************/ Save Notes to local storage /*******************
function saveNotesTolocalStorage() {
  localStorage.setItem('Notes', Notes);
}



//*******************/ Displaying todos /***********************
function displayNotes() {
  let noteContainer = document.querySelector('.noteContainer');
  noteContainer.innerHTML = '';

  if (Notes.length > 0) {
    Notes.forEach((note) => {
      // showing Notes
      noteContainer.innerHTML += `<div class="notecard" > ${note}
    <i class="fa-solid fa-trash-can deleteBtn"></i>
      </div> `;
    });

    let noteCard = document.querySelectorAll('.notecard');
    let cancelBtn = document.querySelector('.cancelBtn');
    cancelBtn.onclick = () => {
      dialogPage.style.display = "none";
    }
    // Edit Notes
    noteCard.forEach((card, index) => {
      let deleteBtn = card.querySelector('.deleteBtn');
      card.addEventListener('click', () => {
        dialogPage.style.display = "block";
        dialogPage.style.paddingLeft = "27%";
        let tempIndex = index;
        modifiedNote.innerHTML = Notes[tempIndex];
        closeBtn.addEventListener('click', () => {
          Notes[index] = modifiedNote.value;
          saveNotesTolocalStorage();
          dialogPage.style.display = "none";
          window.location.reload()
        })
      });

      // Hovering on Note
      card.addEventListener('mouseover', () => {
        deleteBtn.style.display = "block";
        // delete note
        deleteBtn.addEventListener('click', (event) => {
          event.stopImmediatePropagation();
          let value = Notes.splice(index, 1)
          deletedValue.push(value);
          console.log(deletedValue);
          saveNotesTolocalStorage();
          window.location.reload();
        })

      })
      card.addEventListener('mouseout', () => {
        card.querySelector('.deleteBtn').style.display = "none";
      });
    })
  }
  else {
    // Empty Notes
    noteContainer.innerHTML = `<div id = "noteContainerOverlay" >
      <img src="assets/lightBulb.svg" height="135px">
        <span>Notes you add appear here</span>
      </div> `
  }
}

displayNotes();

// function for adjusting dialog page height while editing notes
function adjustHeight(textarea) {
  textarea.style.maxHeight = "60vh";
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
  textarea.focus();
}

