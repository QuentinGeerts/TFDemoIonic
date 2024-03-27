import {Component} from '@angular/core';
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {addIcons} from "ionicons";
import {trashOutline} from "ionicons/icons";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonList, IonItem, IonText,
    IonButton, FormsModule, IonCheckbox, NgClass, IonIcon, IonRow, IonGrid, IonCol]
})
export class Tab2Page {
  userInput: string = "";
  todos: Todo[] = [
    {label: "Coder l'application Angular/Ionic", isDone: true},
    {label: "Faire la vaisselle", isDone: false},
    {label: "Nettoyer la litière", isDone: true},
    {label: "Ranger les linges", isDone: false},
  ];

  constructor() {
    addIcons({trashOutline})
  }

  addTask(): void {

    // Nettoyage de la donnée
    // : Suppression des espaces avant et après
    let input: string = this.userInput.trim();

    // Si l'utilisateur n'a rien rentré, on annule
    if (input === '') return;

    // Si le label est déjà dans la liste, on annule
    if (this.todos.find((task: Todo) => task.label.toLowerCase() === input.toLowerCase())) return;

    this.todos.push({label: input, isDone: false});
    this.userInput = "";


  }

  deleteTask(index: number): void {
    this.todos.splice(index, 1);
  }

  clearTodos() {
    this.todos.length = 0;
  }
}

export interface Todo {
  label: string;
  isDone: boolean;
}
