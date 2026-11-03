
import { eleves,groupes } from "./data.js";

const listeEleve = document.getElementById("liste-eleves")
const compteur=document.getElementById("compteur")
const chercherEleve = document.getElementById("cherche")

function creerDOM(eleve) {

  
      const ligne =document.createElement("li")
      ligne.classList.add("bg-white","rounded-xl","p-4","shadow-sm")
     
      const nom = document.createElement("h3")
      nom.textContent=`${eleve.prenom} ${eleve.nom}`
      nom.classList.add("font-bold","text-lg","text-black")
     
  
      const absence =document.createElement("p")
      absence.classList.add("inline-block","rounded-full","px-3","py-1","text-sm","font-medium")
      absence.textContent=`${eleve.absences} absences`;
      
   if(eleve.absences>=3 ){
    absence.classList.add("bg-red-100","text-red-700")
   }else{
    absence.classList.add("bg-green-100","text-green-700")
   }
  let moyenne;
  
  const moytotal = document.createElement("p");
  
  if (eleve.notes.length === 0) {
    moyenne = "_";
    moytotal.textContent = moyenne;
  } else {
    const total = eleve.notes.reduce(function(acc, note) {
      return acc + note;
    }, 0);
  
    moyenne = total / eleve.notes.length;
    moytotal.textContent = ` moyenne : ${moyenne}/20`;
  }
  ligne.appendChild(nom)
  ligne.appendChild(absence)
  ligne.appendChild(moytotal)
  

  return ligne
  
}

function afficherEleves(filterdata =eleves){
listeEleve.replaceChildren();

const data =filterdata.map(creerDOM)
listeEleve.append(...data)

compteur.textContent = `${filterdata.length} élèves`;
}

 // filter les groupes
const filtreGroupe = document.getElementById("filtre-groupe");

const options = groupes.map(groupe => {
  const option = document.createElement("option");

  option.value = groupe.id;
  option.textContent = groupe.nom;

  return option;
});

filtreGroupe.append(...options);

filtreGroupe.addEventListener("change", () => {
  const idGroupe = filtreGroupe.value;

  const elevesFiltres = eleves.filter(eleve =>
    idGroupe === "all" ||
    eleve.groupeId === Number(idGroupe)
  );
   compteur.textContent = elevesFiltres.length 
  afficherEleves(elevesFiltres);
});  

// Affichage initial
afficherEleves();
compteur.textContent = eleves.length;