
import { eleves,groupes } from "./data.js";

const listeEleve = document.getElementById("liste-eleves")
const compteur=document.getElementById("compteur")
const rechercheEleve = document.getElementById("search");
const nbAlertes = document.getElementById("bilan-alertes");




function creerDOM(eleve) {

  
      const ligne =document.createElement("li")
      ligne.classList.add(
  "bg-white",
  "rounded-xl",
  "p-4",
  "shadow-sm",
  "flex",
  "items-center",
  "gap-2"
);
      const nom = document.createElement("h3")
      nom.textContent=`${eleve.prenom} ${eleve.nom}`
      nom.classList.add("font-bold","text-lg","text-black" , )
     
  
      const absence =document.createElement("p")
      absence.classList.add("inline-block","rounded-full","px-3","py-1","text-sm","font-medium")
      absence.textContent=`${eleve.absences} absences`;
      
   if(eleve.absences>=3 ){
    absence.classList.add("bg-red-100","text-red-700")
   }else{
    absence.classList.add("bg-green-100","text-green-700")
   }
  let moyenne;
  const div = document.createElement("div");
  div.classList.add("w-1/2")
  
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

  //bouton absent 
const btnAbsent = document.createElement("button");
btnAbsent.textContent = "Absent";
btnAbsent.classList.add(
  "w-1/8",
  // "shrink-0",
  "btn-absent",
  "rounded-full",
  "border",
  "px-4",
  "py-2",
  "cursor-pointer",
  "hover:bg-brand-soft"
);

btnAbsent.dataset.id = eleve.id; //permet d'identifier l'élève sur lequel tu cliques.

// Input pour saisir la note
const inputNote = document.createElement("input");

inputNote.type = "number";
inputNote.placeholder = "Note";
inputNote.min = "0";
inputNote.max = "20";
inputNote.step = "any";

inputNote.classList.add(
  "input-note",
  // "w-1/5",
  // "shrink-0",
  "rounded-full",
  "border",
  "px-3",
  "py-2",
  "w-1/8"
);

// Identifier l'élève
inputNote.dataset.id = eleve.id;


// Bouton pour ajouter la note
const btnNote = document.createElement("button");

btnNote.textContent = "Ajouter la note";
btnNote.dataset.id = eleve.id;

btnNote.classList.add(
  // "w-1/5",
  // "shrink-0",
  "btn-note",
  "bg-blue-700",
  "text-white",
  "rounded-full",
  "px-4",
  "py-2",
  "cursor-pointer",
  "hover:bg-blue-900"
);
div.appendChild(nom);
div.appendChild(absence);
div.appendChild(moytotal);
ligne.appendChild(div)

ligne.appendChild(inputNote)
ligne.appendChild(btnNote)
ligne.appendChild(btnAbsent);
   

    
  if (eleve.absences >= 3) {
    const alerte = document.createElement("span");
    absence.classList.add("bg-red-100", "text-red-700");
    ligne.classList.add("bg-red-50", "border", "border-red-400");
    
    alerte.textContent = "Prévenir les parents";
    alerte.classList.add(
      "bg-red-600",
      "text-white",
      "rounded-full",
      "px-3",
      "py-1",
      "text-xs"
    );
    
    
    
    div.appendChild(alerte);
  }
  else {
    absence.classList.add("bg-green-100", "text-green-700");
  }



  

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


// compteur des alert
function calculerAlertes() {
  const elevesEnAlerte = eleves.filter(eleve => eleve.absences >= 3);
 nbAlertes.textContent = elevesEnAlerte.length;
}
calculerAlertes() 



filtreGroupe.append(...options);

// Affichage initial
afficherEleves();


// chercher un eleve selon nom ou prenom 

function filtrerEleves() {
  const recherche = rechercheEleve.value.toLowerCase().trim();
  const idGroupe = filtreGroupe.value;
  
  const elevesFiltres = eleves.filter(eleve => {
    const nom = eleve.nom.toLowerCase();
    const prenom = eleve.prenom.toLowerCase();
    
    const rechercheOk =
    nom.includes(recherche) || prenom.includes(recherche);
    
    const groupeOk =
    idGroupe === "all" ||
    eleve.groupeId === Number(idGroupe);
    
    return rechercheOk && groupeOk;
  });
  
  afficherEleves(elevesFiltres);
   
  
  
}

listeEleve.addEventListener("click", (event) => {

  // Bouton Absent
  const btnAbsent = event.target.closest(".btn-absent");

  if (btnAbsent) {
    const id = Number(btnAbsent.dataset.id);

    const eleve = eleves.find(e => e.id === id);

    if (!eleve) return;

    eleve.absences++;

    filtrerEleves();
    calculerAlertes();

    return;
  }

  // Bouton Ajouter la note
  const btnNote = event.target.closest(".btn-note");

  if (btnNote) {
    const id = Number(btnNote.dataset.id);
   
    const eleve = eleves.find(e => e.id === id);

    if (!eleve) return;

    // Récupérer l'input correspondant à l'élève
    const ligne = btnNote.closest("li");
    const input = ligne.querySelector(".input-note");

    const valeur = input.value.trim();
    const note = Number(valeur);

    // Vérifier si la note est valide
    if (valeur === "" || !Number.isFinite(note) || note < 0 || note > 20) {
      alert("Veuillez saisir une note valide entre 0 et 20.");
      return;
    }

    // Ajouter la note dans le tableau
    eleve.notes.push(note);

    // Actualiser l'affichage
   
    afficherEleves();

  }

});

filtreGroupe.addEventListener("change", filtrerEleves)
rechercheEleve.addEventListener("input",filtrerEleves)






