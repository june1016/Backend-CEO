import { connectToDatabase } from '../../config/index.js';

/**
 * Authenticates the database connection.
 * @throws Will throw an error with a message if authentication fails.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   120-01-2025
 */
const authenticateDatabase = () => connectToDatabase().authenticate();

export default authenticateDatabase;
