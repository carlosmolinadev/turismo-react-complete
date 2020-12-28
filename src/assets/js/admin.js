const rows = document.querySelectorAll('tbody tr');
const searchInput = document.getElementById('search');
const buttons = document.getElementsByTagName('button');
const table = document.getElementById('table-show');
console.log(buttons);

searchInput.addEventListener('keyup', function(event) {
    const query = event.target.value.toLowerCase();
    rows.forEach(row => {
        row.querySelector('td').textContent.toLowerCase().includes(query) ? (row.style.display = '') : (row.style.display = 'none');
    });
})

function disableButtons(buttons){
    buttons[1].disabled = true;
    buttons[2].disabled = true;
    buttons[3].disabled = true;
}

function disableTable(table){
    table.style.display='none';
}

function createRoute(){
    const showForm = document.getElementById('route');
    showForm.style.display='';
    disableTable(table);
    disableButtons(buttons);
}

function createPackage(){
    const showForm = document.getElementById('package');
    showForm.style.display='';
    disableTable(table);
    disableButtons(buttons);
}

function createUser(){
    const showForm = document.getElementById('user');
    showForm.style='';
    showForm.style.paddingBottom = '15vh'
    disableTable(table);
    disableButtons(buttons);
}

document.querySelector('.custom-file-input').addEventListener('change',function(e){
    var fileName = document.getElementById("inputGroupFile01").files[0].name;
    var nextSibling = e.target.nextElementSibling
    nextSibling.innerText = fileName
  })

