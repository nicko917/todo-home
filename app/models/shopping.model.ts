export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  category: string;
  price?: number;
  addedBy: string;
  addedAt: Date;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: Date;
  category: string;
  addedBy: string;
  addedAt: Date;
}