export const authService = {
  register: (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username)) {
      throw new Error("User already exists");
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users)); //store username and pass in localstorage
    return { username };
  },

  login: (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem("currentUser"); //username and pass will perish once the user logs out
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  },
};
