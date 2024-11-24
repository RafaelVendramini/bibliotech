import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

export default async function openDb() {
    return open({
        filename: './dataBase.db',
        driver: sqlite3.Database
    });
}