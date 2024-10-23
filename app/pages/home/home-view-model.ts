import { Observable } from '@nativescript/core';
import { Task } from '../../models/task.model';
import { ShoppingItem } from '../../models/shopping.model';
import { Transaction } from '../../models/finance.model';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

export class HomeViewModel extends Observable {
  private dbService: DatabaseService;
  private authService: AuthService;

  tasks: Task[] = [];
  shoppingItems: ShoppingItem[] = [];
  transactions: Transaction[] = [];
  selectedTab: number = 0;
  monthlyBalance: number = 0;

  constructor() {
    super();
    this.dbService = DatabaseService.getInstance();
    this.authService = AuthService.getInstance();
    this.loadData();
  }

  async loadData() {
    try {
      // Suponiendo que tengas una lógica de obtención de datos
      this.tasks = await this.dbService.getTasks();
      this.shoppingItems = await this.dbService.getShoppingItems();
      this.transactions = await this.dbService.getTransactions();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async onToggleTask(args: any) {
    const task = args.object.bindingContext;
    task.completed = !task.completed;
    // Update in database
  }

  async onToggleItem(args: any) {
    const item = args.object.bindingContext;
    item.purchased = !item.purchased;
    // Update in database
  }

  async onAddTask() {
    // Navigate to add task page
  }

  async onAddShoppingItem() {
    // Navigate to add shopping item page
  }

  async onAddTransaction() {
    // Navigate to add transaction page
  }

  async onLogout() {
    await this.authService.signOut();
    // Navigate to login page
  }
}
