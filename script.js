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

let currentPlayer = 'circle'; // Startspieler ist "Kreis"

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';

        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = generateAnimatedCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateAnimatedCrossSVG();
            }

            // Hinzufügen des onclick-Attributs für das Aufrufen der Funktion
            tableHTML += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    contentDiv.innerHTML = tableHTML;
}

// Funktion zum Verarbeiten des Klicks auf ein Feld
function handleClick(index) {
    // Überprüfen, ob das Feld bereits belegt ist
    if (!fields[index]) {
        // Abwechselnd "circle" oder "cross" einfügen
        fields[index] = currentPlayer;

        // HTML-Code für das entsprechende Symbol generieren
        const symbol = currentPlayer === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedCrossSVG();

        // HTML-Code in das angeklickte <td>-Element einfügen
        const clickedCell = document.getElementsByTagName('td')[index];
        clickedCell.innerHTML = symbol;

        // onclick-Funktion des angeklickten <td>-Elements entfernen
        clickedCell.removeAttribute('onclick');

        // Wechsle den Spieler
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}

function generateAnimatedCircleSVG() {
    const circleColor = "#00B0EF";
    const circleSize = 70;
    const animationDuration = 125; // 125ms Animation

    // SVG-Element erstellen
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", circleSize);
    svg.setAttribute("height", circleSize);

    // Kreis erstellen
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", circleSize / 2); // x-Koordinate des Mittelpunkts
    circle.setAttribute("cy", circleSize / 2); // y-Koordinate des Mittelpunkts
    circle.setAttribute("r", circleSize / 2); // Radius des Kreises
    circle.setAttribute("fill", "none"); // Anfangsfarbe (keine Füllung)
    circle.setAttribute("stroke", circleColor); // Kreisfarbe
    circle.setAttribute("stroke-width", circleSize / 10); // Strichstärke
    circle.setAttribute("stroke-dasharray", circleSize * Math.PI); // Länge des Striches (Umfang des Kreises)
    circle.setAttribute("stroke-dashoffset", circleSize * Math.PI); // Startposition des Striches (am Anfang des Kreises)

    // Animation erstellen
    const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animation.setAttribute("attributeName", "stroke-dashoffset");
    animation.setAttribute("from", circleSize * Math.PI); // Startposition (am Anfang des Kreises)
    animation.setAttribute("to", 0); // Endposition (am Ende des Kreises)
    animation.setAttribute("dur", `${animationDuration}ms`); // Dauer der Animation (125ms)
    animation.setAttribute("fill", "freeze"); // Animationseffekt beibehalten, wenn abgeschlossen
    animation.setAttribute("calcMode", "linear"); // Linearer Animationsmodus (gleiche Geschwindigkeit)
    circle.appendChild(animation);

    svg.appendChild(circle);

    // SVG-HTML-Code zurückgeben
    return svg.outerHTML;
}


function generateAnimatedCrossSVG() {
    const crossColor = "#FFC000";
    const crossSize = 70;
    const animationDuration = 125; // 125ms Animation

    // SVG-Element erstellen
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", crossSize);
    svg.setAttribute("height", crossSize);

    // Linie 1 (von links oben nach rechts unten)
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", 0); // Startpunkt x-Koordinate
    line1.setAttribute("y1", 0); // Startpunkt y-Koordinate
    line1.setAttribute("x2", crossSize); // Endpunkt x-Koordinate
    line1.setAttribute("y2", crossSize); // Endpunkt y-Koordinate
    line1.setAttribute("stroke", crossColor); // Linienfarbe
    line1.setAttribute("stroke-width", crossSize / 10); // Linienstärke
    line1.setAttribute("stroke-dasharray", crossSize * Math.sqrt(2)); // Länge der Linie (Diagonale des Quadrats)
    line1.setAttribute("stroke-dashoffset", crossSize * Math.sqrt(2)); // Startposition der Linie (außerhalb des Quadrats)

    // Linie 2 (von rechts oben nach links unten)
    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", crossSize); // Startpunkt x-Koordinate
    line2.setAttribute("y1", 0); // Startpunkt y-Koordinate
    line2.setAttribute("x2", 0); // Endpunkt x-Koordinate
    line2.setAttribute("y2", crossSize); // Endpunkt y-Koordinate
    line2.setAttribute("stroke", crossColor); // Linienfarbe
    line2.setAttribute("stroke-width", crossSize / 10); // Linienstärke
    line2.setAttribute("stroke-dasharray", crossSize * Math.sqrt(2)); // Länge der Linie (Diagonale des Quadrats)
    line2.setAttribute("stroke-dashoffset", crossSize * Math.sqrt(2)); // Startposition der Linie (außerhalb des Quadrats)

    // Animation erstellen
    const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animation.setAttribute("attributeName", "stroke-dashoffset");
    animation.setAttribute("from", crossSize * Math.sqrt(2)); // Startposition (außerhalb des Quadrats)
    animation.setAttribute("to", 0); // Endposition (innerhalb des Quadrats)
    animation.setAttribute("dur", `${animationDuration}ms`); // Dauer der Animation (125ms)
    animation.setAttribute("fill", "freeze"); // Animationseffekt beibehalten, wenn abgeschlossen
    animation.setAttribute("calcMode", "linear"); // Linearer Animationsmodus (gleiche Geschwindigkeit)
    line1.appendChild(animation.cloneNode(true)); // Animation für Linie 1
    line2.appendChild(animation.cloneNode(true)); // Animation für Linie 2

    svg.appendChild(line1);
    svg.appendChild(line2);

    // SVG-HTML-Code zurückgeben
    return svg.outerHTML;
}