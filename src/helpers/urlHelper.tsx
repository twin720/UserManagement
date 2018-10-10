export let spaPatterns = {
    users: () => "/users/:pageNumber",
    user: () => "/user/:userId",
    userOperations: () => "/user/:userId/operations",
    userEdit: () => "/user/:userId/edit",
    userBalance: () => "/user/:userId/balance",
};

export let spaUrls = {
    home: () => "/",
    usersNoPage: () => "/users",
    users: (pageNumber: number) => `/users/${pageNumber != null ? pageNumber : 1}`,
    user: (userId: string) => `/user/${userId}`,
    userOperations: (userId: string) => `/user/${userId}/operations`,
    userEdit: (userId: string) => `/user/${userId}/edit`,
    userBalance: (userId: string) => `/user/${userId}/balance`,
};