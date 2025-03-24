import sqlite3, {Database} from 'sqlite3';

export const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            bio TEXT,
            is_active INTEGER DEFAULT 1,
            rating FLOAT DEFAULT 1,
            created_at DATETIME,
            updated_at DATETIME
            
        )
    `);
});

interface ISuccessResponse<T> {
    status: 1;
    error: '';
    result: T | null;
}

interface IFailedResponse {
    status: 0;
    error: Error;
    result: null
}


type IResponse<T> = ISuccessResponse<T> | IFailedResponse;
export async function insertRecord<ReturnT>(db: Database, sql: string, values?: any[]): Promise<IResponse<ReturnT>> {
    return new Promise<IResponse<ReturnT>>((res, rej) => {
            db.run(sql, values ?? [], function(err) {
                if (err) {
                    rej({ status: 0, error: err.message, result: null });
                } else {
                    res({
                        status: 1,
                        error: '',
                        result: this.lastID as ReturnT
                    });
                }
            });
    });
}


export async function GetData<ReturnT>(db: Database, sql: string, values?: any[]){
    return new Promise<IResponse<ReturnT>>((res,rej) => {
        
            db.get(sql,values ?? [], (err,row:any) => {
                if (err){
                    rej({status: 0, error: err, result: null});
                } else {
                    res({status: 1, error: '', result: row || null});
                }
            })
    } )
}