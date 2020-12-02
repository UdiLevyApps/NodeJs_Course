import { UserCredential, UserRole } from '../model/credentials';
interface StoreType {
  credentials: UserCredential[];
}

const store: StoreType = {
  credentials: [
    { email: 'a@a.com', password: '123', userId: 1, roles: [UserRole.Reader] },
    { email: 'b', password: 'b', userId: 2, roles: [UserRole.Contributor] },
    { email: 'c', password: 'c', userId: 3, roles: [UserRole.Admin] },
  ],
};

export default store;
