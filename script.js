import { eleves,groupes } from "./data.js";

const listeEleve = document.getElementById("liste-eleves")
const compteur=document.getElementById("compteur")
const rechercheEleve = document.getElementById("search");
const nbAlertes = document.getElementById("bilan-alertes");

// AJOUT : récupérer le total des absences
const bilanAbsences = document.getElementById("bilan-absences");

const formulaire = document.getElementById("form-eleve");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const groupe = document.getElementById("groupe");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const code = document.getElementById("code");

const formSucces =document.getElementById("form-succes")
const formErreur =document.getElementById("form-erreur");

const champs = {
  prenom,
  nom,
  groupe,
  email,
  telephone,
  code
};

const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,}$/;

// CORRECTION : les caractères du Regex avaient été modifiés.
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// CORRECTION : syntaxe correcte pour +212.
const regexTelephone = /^(?:0[67]|\+212[67])\d{8}$/;

// CORRECTION : utilisation de .* dans les lookaheads.
const regexCode = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;


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


// AJOUT : calculer le total des absences
function calculerTotalAbsences() {

  // Additionner les absences avec reduce()
  const total = eleves.reduce((acc, eleve) => {
    return acc + eleve.absences;
  }, 0);

  // Afficher le total dans HTML
  bilanAbsences.textContent = total;
}

// AJOUT : afficher le total au chargement
calculerTotalAbsences();


filtreGroupe.append(...options);

// AJOUT : remplir le select du formulaire US4.
// Le filtre des groupes et le champ groupe sont différents.
groupes.forEach(g => {
  const option = document.createElement("option");

  option.value = g.id;
  option.textContent = `${g.nom} - ${g.cours}`;

  groupe.appendChild(option);
});

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

    // CORRECTION : remplacer seulement la ligne concernée.
    // Avant : filtrerEleves() recréait toute la liste.
    const ligne = btnAbsent.closest("li");
    ligne.replaceWith(creerDOM(eleve));

    calculerAlertes();

    // AJOUT : actualiser le total après chaque absence
    calculerTotalAbsences();

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

    // CORRECTION : ne remplacer que la ligne modifiée.
    // Avant : afficherEleves() supprimait les filtres actifs.
    ligne.replaceWith(creerDOM(eleve));
  }
});


function validerChamp(champ) {

  const valeur = champ.value.trim();
  let valide = false;
  let erreur = "";

  switch (champ.id) {

    case "prenom":
    case "nom":
      valide = regexNom.test(valeur);
      erreur = "2 caractères minimum : lettres, espaces ou tirets.";
      break;

    case "groupe":
      // CORRECTION : une valeur vide ne doit pas être acceptée.
      valide = valeur !== "" && groupes.some(g => g.id === Number(valeur));
      erreur = "Veuillez choisir un groupe.";
      break;

    case "email":
      valide = regexEmail.test(valeur);
      erreur = "Email invalide.";
      break;

    case "telephone":
      valide = regexTelephone.test(valeur);
      erreur = "Numéro marocain invalide.";
      break;

    case "code":
      valide = regexCode.test(champ.value);
      erreur = "8 caractères minimum, une majuscule, un chiffre et un caractère spécial.";
      break;
  }

  const message = document.getElementById(`${champ.id}-msg`);

  message.textContent = valide ? "Champ valide." : erreur;

  champ.parentElement.classList.toggle("valide", valide);
  champ.parentElement.classList.toggle("erreur", !valide);

  champ.classList.toggle("border-green-500", valide);
  champ.classList.toggle("border-red-500", !valide);

  champ.setAttribute("aria-invalid", String(!valide));

  return valide;
}

Object.values(champs).forEach(champ => {

  const evenement = champ.tagName === "SELECT"
    ? "change"
    : "input";

  champ.addEventListener(evenement, () => {
    validerChamp(champ);
  });

});

filtreGroupe.addEventListener("change", filtrerEleves)
rechercheEleve.addEventListener("input",filtrerEleves)


// AJOUT US4 : gérer le formulaire d'ajout d'un élève.
formulaire.addEventListener("submit", (event) => {

  // AJOUT : empêcher le rechargement de la page.
  event.preventDefault();

  formSucces.hidden = true;
  formErreur.hidden = true;

  // AJOUT : vérifier tous les champs avec every().
  const validations = Object.values(champs).map(champ => ({
    champ,
    valide: validerChamp(champ)
  }));

  const tousValides = validations.every(item => item.valide);

  if (!tousValides) {
    // AJOUT : placer le focus sur le premier champ invalide.
    const premierInvalide = validations.find(item => !item.valide);
    premierInvalide.champ.focus();
    return;
  }

  // AJOUT : vérifier si l'élève existe déjà dans ce groupe.
  const existe = eleves.some(e =>
    e.prenom.trim().toLowerCase() === prenom.value.trim().toLowerCase() &&
    e.nom.trim().toLowerCase() === nom.value.trim().toLowerCase() &&
    e.groupeId === Number(groupe.value)
  );

  if (existe) {
    formErreur.textContent = "Cet élève existe déjà dans ce groupe.";
    formErreur.hidden = false;
    prenom.focus();
    return;
  }

  // AJOUT : compter les élèves du groupe sélectionné.
  const nombreEleves = eleves.filter(e =>
    e.groupeId === Number(groupe.value)
  ).length;

  // AJOUT : empêcher l'ajout si le groupe contient 15 élèves.
  if (nombreEleves >= 15) {
    formErreur.textContent = "Ce groupe est complet (15 élèves).";
    formErreur.hidden = false;
    groupe.focus();
    return;
  }

  // AJOUT : créer le nouvel élève avec la structure de data.js.
  // Le code d'accès provisoire n'est pas enregistré.
  const nouvelEleve = {
    id: Math.max(0, ...eleves.map(e => e.id)) + 1,
    prenom: prenom.value.trim(),
    nom: nom.value.trim(),
    groupeId: Number(groupe.value),
    emailParent: email.value.trim(),
    telephoneParent: telephone.value.trim(),
    absences: 0,
    notes: []
  };

  // AJOUT : enregistrer l'élève dans le tableau.
  eleves.push(nouvelEleve);

  // AJOUT : actualiser la liste et conserver les filtres.
  filtrerEleves();

  // AJOUT : vider le formulaire après l'ajout.
  formulaire.reset();

  // AJOUT : supprimer les anciens états de validation.
  Object.values(champs).forEach(champ => {
    champ.parentElement.classList.remove("valide", "erreur");
    champ.classList.remove("border-green-500", "border-red-500");
    champ.removeAttribute("aria-invalid");

    const message = document.getElementById(`${champ.id}-msg`);
    message.textContent = "";
  });

  // AJOUT : remettre la jauge du code à zéro.
  const jauge = document.getElementById("code-force");
  if (jauge) jauge.value = 0;

  // AJOUT : afficher le message de succès.
  formSucces.textContent = "Élève ajouté avec succès.";
  formSucces.hidden = false;
});