
import { eleves,groupes } from "./data.js";

const listeEleve = document.getElementById("liste-eleves")
const compteur=document.getElementById("compteur")
const rechercheEleve = document.getElementById("search");
const nbAlertes = document.getElementById("nb-alertes");
const parentsAppeler = document.getElementById("parents-appeler");
const totalAbsences = document.getElementById("total-absences");



function creerDOM(eleve) {

  
      const ligne =document.createElement("li")
      ligne.classList.add(
  "bg-white",
  "rounded-xl",
  "p-4",
  "shadow-sm",
  "flex",
  "justify-between",
  "items-center",
  "gap-4"
);
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
  const div = document.createElement("div")
 
  
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
  "btn-absent",
  "rounded-full",
  "border",
  "px-4",
  "py-2"
);

btnAbsent.dataset.id = eleve.id; //permet d'identifier l'élève sur lequel tu cliques.
 div.appendChild(nom);
  div.appendChild(absence);
  div.appendChild(moytotal);
  ligne.appendChild(div)
  ligne.appendChild(btnAbsent);
   

  if (eleve.absences >= 3) {
  absence.classList.add("bg-red-100", "text-red-700");
  ligne.classList.add("bg-red-50", "border", "border-red-400");
} else {
  absence.classList.add("bg-green-100", "text-green-700");
}

if (eleve.absences >= 3) {
  const alerte = document.createElement("span");

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
  const button = event.target.closest(".btn-absent");

  if (!button) return;

  const id = Number(button.dataset.id);

  const eleve = eleves.find(e => e.id === id);

  if (!eleve) return;

  eleve.absences++;

  filtrerEleves();
});


filtreGroupe.addEventListener("change", filtrerEleves)
rechercheEleve.addEventListener("input",filtrerEleves)
