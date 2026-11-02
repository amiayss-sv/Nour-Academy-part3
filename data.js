
export const groupes = [
  { id: 1, nom: "2e Bac", cours: "Mathématiques" },
  { id: 2, nom: "1ère Bac", cours: "Français" },
  { id: 3, nom: "3e collège", cours: "Anglais" }
];

 export const eleves = [
  // Groupe 1 : 2e Bac - Mathématiques
  {
    id: 1,
    prenom: "Salma",
    nom: "Amrani",
    groupeId: 1,
    telephoneParent: "0612345678",
    absences: 0,
    notes: [14, 16, 15]
  },
  {
    id: 2,
    prenom: "Youssef",
    nom: "Alaoui",
    groupeId: 1,
    telephoneParent: "0712345678",
    absences: 3,
    notes: [12, 10, 14]
  },
  {
    id: 3,
    prenom: "Imane",
    nom: "Bennani",
    groupeId: 1,
    telephoneParent: "0623456789",
    absences: 1,
    notes: [17, 16, 18]
  },
  {
    id: 4,
    prenom: "Omar",
    nom: "Idrissi",
    groupeId: 1,
    telephoneParent: "0723456789",
    absences: 2,
    notes: [10, 12, 11]
  },
  {
    id: 5,
    prenom: "Aya",
    nom: "El Fassi",
    groupeId: 1,
    telephoneParent: "0634567890",
    absences: 4,
    notes: []
  },

  // Groupe 2 : 1ère Bac - Français
  {
    id: 6,
    prenom: "Mohamed",
    nom: "Tazi",
    groupeId: 2,
    telephoneParent: "0734567890",
    absences: 0,
    notes: [13, 15, 14]
  },
  {
    id: 7,
    prenom: "Sara",
    nom: "Mansouri",
    groupeId: 2,
    telephoneParent: "0645678901",
    absences: 2,
    notes: [16, 17, 15]
  },
  {
    id: 8,
    prenom: "Hamza",
    nom: "Karimi",
    groupeId: 2,
    telephoneParent: "0745678901",
    absences: 3,
    notes: [9, 11, 10]
  },
  {
    id: 9,
    prenom: "Nour",
    nom: "Berrada",
    groupeId: 2,
    telephoneParent: "0656789012",
    absences: 1,
    notes: [18, 17, 19]
  },
  {
    id: 10,
    prenom: "Adam",
    nom: "Rami",
    groupeId: 2,
    telephoneParent: "0756789012",
    absences: 0,
    notes: []
  },

  // Groupe 3 : 3e collège - Anglais
  {
    id: 11,
    prenom: "Lina",
    nom: "Haddad",
    groupeId: 3,
    telephoneParent: "0667890123",
    absences: 1,
    notes: [15, 14, 16]
  },
  {
    id: 12,
    prenom: "Anas",
    nom: "Ziani",
    groupeId: 3,
    telephoneParent: "0767890123",
    absences: 3,
    notes: [8, 10, 9]
  },
  {
    id: 13,
    prenom: "Meryem",
    nom: "Saidi",
    groupeId: 3,
    telephoneParent: "0678901234",
    absences: 0,
    notes: [17, 18, 16]
  },
  {
    id: 14,
    prenom: "Ilyas",
    nom: "Naciri",
    groupeId: 3,
    telephoneParent: "0778901234",
    absences: 2,
    notes: [12, 13, 14]
  },
  {
    id: 15,
    prenom: "Hiba",
    nom: "El Amrani",
    groupeId: 3,
    telephoneParent: "0689012345",
    absences: 4,
    notes: []
  }
];