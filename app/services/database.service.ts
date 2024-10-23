import { knownFolders } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-firestore';

export class DatabaseService {
  private static instance: DatabaseService;
  private dbPath: string;

  private constructor() {
    this.dbPath = knownFolders.documents().path + '/homemanager.db';
    this.initializeDatabase();
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private async initializeDatabase() {
    try {
      // Using native SQLite through NativeScript core
      const db = await this.getDatabase();
      await this.createTables(db);
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  private async getDatabase() {
    return new Promise((resolve, reject) => {
      try {
        const db = require('nativescript-sqlite');
        new db(this.dbPath, (err, db) => {
          if (err) {
            reject(err);
          } else {
            resolve(db);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private async createTables(db: any) {
    const queries = [
      `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        category TEXT,
        priority TEXT,
        dueDate INTEGER,
        completed INTEGER,
        assignedTo TEXT,
        createdBy TEXT,
        createdAt INTEGER,
        updatedAt INTEGER,
        syncedAt INTEGER
      )`,
      `CREATE TABLE IF NOT EXISTS shopping_items (
        id TEXT PRIMARY KEY,
        name TEXT,
        quantity INTEGER,
        purchased INTEGER,
        category TEXT,
        price REAL,
        addedBy TEXT,
        addedAt INTEGER,
        syncedAt INTEGER
      )`,
      `CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        type TEXT,
        amount REAL,
        category TEXT,
        description TEXT,
        date INTEGER,
        createdBy TEXT,
        createdAt INTEGER,
        syncedAt INTEGER
      )`
    ];

    for (const query of queries) {
      await new Promise((resolve, reject) => {
        db.execSQL(query, [], (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        });
      });
    }
  }

  async syncWithCloud() {
    const firestore = firebase.firestore();
    // Implement sync logic here
  }
}