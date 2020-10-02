// here we design the board
let trID = ['A', 'B', 'C', 'D', 'E', 'F'];
let tdID = 1;

// We create the rows
const tableBody = $('tbody');
for (let tableRow = 0; tableRow < 6; tableRow++) {
      tableBody.append(`<tr id=${trID[tableRow]}></tr>`)
};

// We create the cells
const allRows = $('tr');
for (let insideRow = 0; insideRow < 7; insideRow++) {
  allRows.append("<td id=''></td>")
}

// We give the cells their respective ID
const allCells = $('td');
for (let cell of allCells) {
  cell.attributes.id.value = tdID;
  tdID++
}
