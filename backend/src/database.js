import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

export const DB = Database("database.db");

export const prepare = (query) => {
    if (prepareCache.has(query)) {
        return (
            prepareCache.get(query)
        );
    }

    const stmt = DB.prepare(query);
    prepareCache.set(query, stmt);
    return stmt;
};

export const setupDB = () => {
    const setupUsersTable = DB.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY NOT NULL,
            username TEXT NOT NULL,
            password_hash TEXT NOT NULL
        )
    `);
    setupUsersTable.run();
}

/**
 * Insert a user into the database
 * @param {string} id id of user
 * @param {string} username username of user
 * @param {string} password_hash password hash of user
 */
export const insertUser = (id, username, password_hash) => {
    const insertUserStmt = prepare(`
        INSERT INTO users VALUES (@id, @username, @password_hash)
    `);

    console.log({ id, username, password_hash });

    insertUserStmt.run({ id, username, password_hash });
};

/**F
 * Get a user from the database
 * @param {string} id id of user
 * @returns {User | undefined} user
 */
export const getUser = (id) => {
    const getUserStmt = prepare(`
        SELECT id, username, password FROM users WHERE id = ?
    `);

    return (getUserStmt.get(id));
}

/**
 * Get total amount of users
 */
export const getUserCount = () => {
    const getUserCountStmt = prepare(`
        SELECT COUNT(*) AS user_count FROM users
    `);

    return (getUserCountStmt.get())
}

/**
 * Delete a specific user
 * @param {string} cid id of user
 */
export const deleteUser = (cid) => {
    const deleteUserStmt = prepare(`
        DELETE FROM users WHERE id = ?
    `);

    deleteUserStmt.run(cid);
};