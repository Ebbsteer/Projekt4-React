import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

export const DB = Database("database.db");

const prepareCache = new Map();

export const prepare = (query) => {
    if (prepareCache.has(query)) {
        return prepareCache.get(query);
    }

    const stmt = DB.prepare(query);
    prepareCache.set(query, stmt);
    return stmt;
};

export const setupDB = () => {
    /*const dropUsersTable = DB.prepare(`
        DROP TABLE users
    `);
    dropUsersTable.run();*/

    const setupUsersTable = DB.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY NOT NULL,
            username TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            question TEXT NOT NULL,
            question_answer_hash TEXT NOT NULL,
            image BLOB,
            favorites TEXT 
        )
    `);
    setupUsersTable.run();
};

/**
 * Insert a user into the database
 * @param {string} id id of user
 * @param {string} username username of user
 * @param {string} password_hash password hash of user
 * @param {string} question qustion for revocering account 
 * @param {string} question_answer_hash hash of answer to question
 */
export const insertUser = (id, username, password_hash, question, question_answer_hash) => {
    const insertUserStmt = prepare(`
        INSERT INTO users VALUES (@id, @username, @password_hash, @question, @question_answer_hash, NULL, NULL)
    `);

    console.log({ id, username, password_hash, question, question_answer_hash });

    insertUserStmt.run({ id, username, password_hash, question, question_answer_hash });
};

/**
 * Get user by id from database
 * @param {string} id id of user
 * @returns {User | undefined} user
 */
export const getUser = (id) => {
    const getUserStmt = prepare(`
        SELECT id, username, password_hash, question, question_answer_hash, image FROM users WHERE id = ?
    `);

    return getUserStmt.get(id);
};

/**
 * Get user by id without password hash from database
 * @param {string} id username of user
 * @returns {Omit<User, 'password_hash'> | undefined} user
 */
export const getSecureUser = (id) => {
    const getSecureUserStmt = prepare(`
        SELECT id, username, question, image FROM users WHERE id = ?
    `);

    return getSecureUserStmt.get(id);
};

/**
 * Get a user by username from the database
 * @param {string} username username of user
 * @returns {User | undefined} user
 */
export const getUserByUsername = (username) => {
    const getUserByUsernameStmt = prepare(`
        SELECT id, username, password_hash FROM users WHERE username = ?
    `);

    return getUserByUsernameStmt.get(username);
};

/**
 * Get user based on correct answer to question
 * @param {string} username username of user
 * @param {string} question_answer_hash hash of question answer
 * @returns {User | undefined} user
 */
export const getUserByQuestion = (username, question_answer_hash) => {
    const getUserCountStmt = prepare(`
        SELECT id, username, password_hash FROM users WHERE username = @username AND question_answer_hash = @question_answer_hash
    `);

    return getUserCountStmt.get({username, question_answer_hash});
};

/**
 * Get total amount of users
 */
export const getUserCount = () => {
    const getUserCountStmt = prepare(`
        SELECT COUNT(*) AS user_count FROM users
    `);

    return getUserCountStmt.get();
};

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

/**
 * Update all information about a user
 * @param {string} cid id of user
 * @param {string} username users username
 * @param {string} password_hash password hash
 * @param {string} question question for account recovery
 * @param {string} question_answer_hash hash of question answer
 * @param {string} image image blob of users profile picture
 */
export const updateUser = (cid, username, password_hash, image) => {
    const updateUserStmt = prepare(`
        UPDATE users SET username = @username, password_hash = @password_hash, question = @question, question_answer_hash = @question_answer_hash, image = @image WHERE id = @id
    `);

    updateUserStmt.run({ id: cid, username, password_hash, question, question_answer_hash, image });
};

/**
 * Update username for specific user
 * @param {string} cid id of user
 * @param {string} username users username
 */
export const updateUserUsername = (cid, username) => {
    const updateUserUsernameStmt = prepare(`
        UPDATE users SET username = @username WHERE id = @id
    `);

    updateUserUsernameStmt.run({ id: cid, username });
};

/**
 * Update password for specific user
 * @param {string} cid id of user
 * @param {string} password_hash users hashed password
 */
export const updateUserPassword = (cid, password_hash) => {
    const updateUserPasswordStmt = prepare(`
        UPDATE users SET password_hash = @password_hash WHERE id = @id
    `);

    updateUserPasswordStmt.run({ id: cid, password_hash });
};

/**
 * Update username for specific user
 * @param {string} cid id of user
 * @param {string} image image blob of users profile picture
 */
export const updateUserImage = (cid, image) => {
    const updateUserImageStmt = prepare(`
        UPDATE users SET image = @image WHERE id = @id
    `);

    updateUserImageStmt.run({ id: cid, image });
};

/**
 * Get favorites
 * @param {string} cid id of user
 * @returns {string} total favorites, seperated by special
 */
export const getFavorites = (cid) => {
    const getFavoritesStmt = prepare(`
        SELECT favorites FROM users WHERE id = ?
    `);

    return getFavoritesStmt.get(cid);
};

/**
 * Add favorite
 * @param {string} cid id of user
 */
export const addFavorite = (cid, fid) => {
    const oldFavorite = getFavorites(cid).split(",");
    console.log(oldFavorite);

    if (favorites.find(fid)) return null;

    const newFavorite = oldFavorite + "," + fid;

    const addFavoriteStmt = prepare(`
        UPDATE users SET favorites = @favorites WHERE id = @id
    `);

    deleteFavoriteStmt.run({ id: cid, favorites: newFavorites });
};

/**
 * Delete favorite
 * @param {string} cid id of user
 */
export const deleteFavorite = (cid, fid) => {
    const favorites = getFavorites(cid).split(",");

    const position = favorites.find(fid);

    if (!position) res.send(401);

    const newFavorites = favorites.splice(position, 1).join(",");

    const deleteFavoriteStmt = prepare(`
        UPDATE users SET favorites = @favorites WHERE id = @id
    `);

    deleteFavoriteStmt.run({ id: cid, favorites: newFavorites });
};

//  home - login - skapa user - id-uuid4 - cid
// finns - finns -    inte    -   inte   - finns
