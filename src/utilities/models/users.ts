import md5 from "md5";

import LoginFormValues from "@components/login";

export interface User {
  email: string;
  password: string;
  favouritePokemon: number | string | null;
  theme: string | null;
}

export interface UsersList extends Map<string, User> {}

const updateStorage_ = (users: UsersList) => {
  window.localStorage.setItem(
    "users",
    JSON.stringify(Object.fromEntries(users))
  );
};

class Users {
  static list = (): UsersList => {
    const usersJson: string | null = window.localStorage.getItem("users");
    if (usersJson) {
      return new Map(Object.entries(JSON.parse(usersJson)));
    } else {
      return new Map();
    }
  };

  static get = (userEmail: string): User | null => {
    const user = Users.list().get(userEmail);
    return user ? user : null;
  };

  static add = (userCredentials: LoginFormValues) => {
    const users: UsersList = Users.list();
    users.set(userCredentials.email, {
      email: userCredentials.email,
      password: md5(userCredentials.password),
      favouritePokemon: null,
      theme: null,
    });

    updateStorage_(users);
  };

  static update = (user: User) => {
    const users: UsersList = Users.list();
    if (users.has(user.email)) {
      users.set(user.email, user);
    }

    updateStorage_(users);
  };
}

export default Users;
