export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  completed: boolean;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}