import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string): Promise<User> {
  // Create the new user object
  let newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;

  // Then save it to the database
  // NOTES: We reassign to `newUser` so we can access
  // NOTES: the fields the database autogenerates (the id & default columns)
  newUser = await userRepository.save(newUser);

  return newUser;
}
async function getAllUsers(): Promise<User[]> {
  return await userRepository.find();
}

// async function getAllUnverifiedUsers(): Promise<User[]> {
//   return userRepository.find({ where: { verifiedEmail: false } });
// }
async function getAllUnverifiedUsers(): Promise<User[]> {
  return userRepository.find({
    select: { email: true, userId: true },
    where: { verifiedEmail: false },
  });
}

// async function getUserByEmail(email: string): Promise<User | null> {
//   return await userRepository.findOne({ where: { email } });
// }
async function getUserByEmail(email: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { email } });
  return user;
}

async function getViralUsers(): Promise<User[]> {}

export { addUser, getUserByEmail, getAllUsers, getAllUnverifiedUsers };
