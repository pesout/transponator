/*
************************
Created by Stepan Pesout
*****www.pesout.eu******
************************
*/

var chords = new Array;

function addChord(chord) {
    if (chords.length == 50) {
        alert("Můžete vybrat maximálně 50 akordů.");
        return false;
    }
    chords.push(chord);
    document.getElementById('chosen-chords').innerHTML =
        chords.toString().replace(/,/g, " ");
}

function removeLastChord() {
    chords.pop();
    if (chords.length == 0) {
        document.getElementById('chosen-chords').innerHTML =
            "Vyberte akordy ze seznamu:"
        return false;
    }
    document.getElementById('chosen-chords').innerHTML =
        chords.toString().replace(/,/g, " ");
}

function transposeChord(chord, shift) {
    let chords_all = ["C","C#","D","D#","E","F","F#","G","G#","A","B","H"];
    let chord_suffix;

    if (chord.indexOf("#") == -1) {
        chord_suffix = chord.substr(1, chord.length);
        chord = chord.substr(0, 1);
    } else {
        chord_suffix = chord.substr(2, chord.length);
        chord = chord.substr(0, 2);
    }

    let chord_position = chords_all.indexOf(chord.toUpperCase());
    return chords_all[(chord_position + shift) % 12] + chord_suffix;
}

function transposition(shift) {
    let transposed = new Array;
    let transposed_chords = "";
    if (chords.length == 0) return transposed;
    for (let i = 0; i < chords.length; i++)
        // transposed.push(transposeChord(chords[i], shift));
        transposed_chords +=
            "<span class='chord'>" + chords[i] + "</span>&nbsp;&rarr;&nbsp;<span class='chord'>" + transposeChord(chords[i], shift) + "</span><br />";
    return transposed_chords;
}

function showTransposedChords() {
    if (chords.length == 0) {
        alert('Musíte vybrat alespoň 1 akord');
        return;
    }
    document.getElementById('transposed-chords').innerHTML = ""
    for (let i = 1; i < 12; i++) {
        document.getElementById('transposed-chords').innerHTML +=
            "<div class='transposed-chords-inner'>" +
            "<h2>+" + i + " (-" + (12-i) + ")</h2>" +
            transposition(i) +
             "</div>";
    }
    document.getElementById('chord-form').style.display = "none";
    document.getElementById('back').style.display = "inline";
    document.getElementById('back2').style.display = "inline";
}

function goBack() {
    document.getElementById('chord-form').style.display = "block";
    document.getElementById('back').style.display = "none";
    document.getElementById('back2').style.display = "none";
    document.getElementById('transposed-chords').innerHTML = ""
}

$( function() {
   $(".chord-list").accordion();
 } );
