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

async function getUserByEmail(email: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { email } });

  return user;
}

// async function getUserById(userId: string): Promise<User | null> {
//   const user = await userRepository.findOne({ where: { userId } });

//   return user;
// }
// async function getUserById(id: string): Promise<User | null> {
//   const user = await userRepository.findOne({ where: { userId: id } });

//   return user;
// } //cannot fit the userid in number bc the data is big for number

async function getUserById(userId: string): Promise<User[] | null> {
  if (!userId) {
    return null;
  }
  const user = await userRepository
    .createQueryBuilder('user')
    .where({ userId })
    .select(['user.email', 'user.profileViews', 'user.joined0n', 'user.userId'])
    .getMany();

  return user;
}

async function getViralUsers(): Promise<User[]> {
  const viralUsers = await userRepository
    .createQueryBuilder('user')
    .where('profileViews >= :viralAmount', { viralAmount: 1000 })
    .select(['user.email', 'user.profileViews', 'user.userId'])
    .getMany();

  return viralUsers;
} // User[] : returning array of the user.

// async function getUsersByViews(minViews: number): Promise<User[]> {
//   const users = await userRepository
//     .createQueryBuilder('user')
//     .where('profileViews >= :viralAmount', { minViews })
//     .select(['user.email', 'user.userId', 'user.joinedOn', 'user.profileViews'])
//     .getMany();

//   return users;
// }
async function getUsersByViews(minViews: number): Promise<User[]> {
  const users = await userRepository
    .createQueryBuilder('user')
    .where('profileViews >= :minViews', { minViews })
    .select(['user.verifiedemail'])
    .getMany(); // getting multiple user account

  return users;
}

export {
  addUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  getAllUnverifiedUsers,
  getViralUsers,
  getUsersByViews,
};
