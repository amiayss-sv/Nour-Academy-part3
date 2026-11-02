
import { eleves,groupes } from "./data.js";

const data= document.getElementById("liste-eleves")

eleves.forEach(eleve => {
    data.innerHTML+= `
    
      <li class="rounded-2xl border border-line bg-card p-3" data-id="1">
            <div class="flex flex-col gap-3 lg:flex-row lg:items-center">

              <button type="button" class="btn-fiche flex min-h-11 flex-1 items-center gap-3 text-left">
                <span class="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand">SA</span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate font-medium">${eleve.prenom}</span>
                  <span class="block text-sm text-muted">1 absence</span>
                </span>
                <span class="font-serif text-xl">13,5 / 20</span>
              </button>

              <div class="flex gap-2">
                <button type="button" class="btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper">Absent</button>
                <label class="flex-1">
                  <span class="sr-only">Note sur 20</span>
                  <input type="number" min="0" max="20" step="0.5" placeholder="Note"
                         class="h-11 w-full rounded-full border border-line bg-paper px-4 text-sm lg:w-24">
                </label>
                <button type="button" class="btn-note h-11 rounded-full bg-ink px-3 sm:px-4 text-sm font-medium text-white hover:bg-brand">Ajouter la note</button>
              </div>
            </div>
            <p class="message mt-2 text-xs text-alert" hidden>La note doit être un nombre entre 0 et 20.</p>
          </li>
    
    
    
    `
})