export const appRoutes = {
    signIn: () => "/sign-in",

    signUp: () => "/sign-up",
    authConfirm: () => "/sign-up/confirm",

    activate: (uid: string, token: string) => `/activate/${uid}/${token}`,
    activateSuccess: () => "/activate/success",
    activateFail: () => "/activate/fail",

    home: () => "/",//all goods

    products: () => "/products",
    product: (id: string) => `/products/${id}`,

    category: () => "/category",//под вопросом

    cart: () => "/cart",

    checkout: () => "/checkout",
    orders: () => "/orders",



    profile: () => "/profile",

    productNotFound: (productId: string) => `/product/${productId}/not-found`,
    searchProducts: (query: string = "") => `/products/search${query}`,

    contacts: () => "/contacts",

};