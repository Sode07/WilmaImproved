// Luodaan muuttuja oppitunnille.
var ClassElementNumber = 0;
var ClassModule;

// Odotetaan että sivu latautuu
setTimeout(FindClass, 1000)

function FindClass() {
  
  // Etsitään oppituntielementti.
  var ClassElement = document.getElementsByClassName("block")[ClassElementNumber];
  // Etsitään opptunnintiedot.
  var ClassInformation = document.getElementsByClassName("block")[ClassElementNumber].getElementsByClassName("info")[0];
  // Kopioidaan oppitunnin nimi.
  var ClassName = ClassInformation.getElementsByClassName("no-underline-link")[0].innerHTML;

  // Valitaan ainoastaan palkkinumero.
  ClassModule = ClassName.slice(1, 3);
  ClassModule = parseInt(ClassModule);

  // Tarkistetaan löytyikö moduulia. Jos moduulia ei löydetty, ohjelma lopetetaan
  if (ClassModule != null) {
    ChangeColor()
  }

}

function ChangeColor() {

  // Palkkien värit
  const colors = [
    "#ffff00", // 1
    "#b4c6e7", // 2
    "#c65911", // 3
    "#ffccff", // 4
    "#d6dce4", // 5
    "#c6e0b4", // 6
    "#ff0000", // 7
    "#0066ff", // 8
    "#ffffff", // 9
    "#DC143C"  // Crimson
  ]  

  // Asetetaan palkin mukainen väri oppitunnin elementille
  var ClassElement = document.getElementsByClassName("block")[ClassElementNumber].style.backgroundColor = colors[ClassModule - 1];

  // Valitaan seuraava tunti
  ClassElementNumber++

  // Etsitään seuraava tunti
  FindClass()

}