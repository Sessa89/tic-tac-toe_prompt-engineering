let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];


function init() {
    render();
}

/*
function render() {
    let content = document.getElementById("content");
    let table = document.createElement("table");
    let index = 0;
    
    for (let i = 0; i < 3; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("td");
            if (fields[index]) {
                cell.textContent = fields[index];
            }
            row.appendChild(cell);
            index++;
        }
        table.appendChild(row);
    }
    content.innerHTML = "";
    content.appendChild(table);
}
*/

function render() {
    const contentDiv = document.getElementById('content');
    
    // Generate table HTML
    let tableHTML = '<table>';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';

        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = 'o';
            } else if (fields[index] === 'cross') {
                symbol = 'x';
            }

            tableHTML += `<td>${symbol}</td>`;
                
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';        
    
    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHTML;   
}