import { dummyUsers } from "../usersData";

let users = [...dummyUsers];

export function apiGetUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...users]), 300);
  });
}

export function apiAddUser(userData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        ...userData,
        id: users.length ? users[users.length - 1].id + 1 : 1,
        lastLogin: null,
        active: true,
        canPromote: false,
        canResend: false,
      };

      users.push(newUser);
      resolve(newUser);
    }, 400);
  });
}

export function apiUpdateUser(id, changes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = users.findIndex((user) => user.id === id);

      if (idx === -1) return reject(new Error("User not found"));

      users[idx] = { ...users[idx], ...changes };

      resolve(users[idx]);
    }, 400);
  });
}

export function apiDeleteUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = users.findIndex((user) => user.id === id);
      if (idx === -1) return reject(new Error("Invalid User ID"));
      users.splice(idx, 1);
      resolve(id);
    }, 400);
  });
}
