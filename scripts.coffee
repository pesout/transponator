/*
************************
Created by Stepan Pesout
*****www.pesout.eu******
************************
*/

var chords = new Array;

function addChord(chord) {
    if (chords.length == 10) {
        alert("Můžete vybrat maximálně 10 akordů.");
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
    if (chords.length == 0) return transposed;
    for (let i = 0; i < chords.length; i++)
        transposed.push(transposeChord(chords[i], shift));
    return transposed;
}

function showTransposedChords() {
    // document.getElementById('transposed-chords').innerHTML = "&nbsp;"
    // for (let i = 1; i < 12; i++) {
    //     document.getElementById('transposed-chords').innerHTML += i + " - " + transposition(i) + "<br>";
    // }
    let transposed = "";
    for (let i = 1; i < 12; i++) {
        transposed += i + " - " + transposition(i) + "\n";
    }
    alert(transposed);
}

$( function() {
   $(".chord-list").accordion({
       // collapsible: true,
       // active: false
    });
 } );
