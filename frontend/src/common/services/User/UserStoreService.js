let _instance = null;

class UserStoreService {
    constructor() {
        if (_instance) {
            return _instance;
        }

        _instance = this;
        this.initialize();
    }

    initialize() {
        this.userInfo = null;
        this.shoppingCart = [];
    }

    setUser(userInfo) {
        this.userInfo = userInfo;
    }

    getUser() {
        return this.userInfo;
    }
    isLoggedin() {
        return this.userInfo !== null;
    }

    addShoppingCartInfo(additem) {
        this.shoppingCart.push(additem);
    }
    getShoppingCart() {
        return this.shoppingCart;
    }
    setShoppingCart(itemList) {
        this.shoppingCart = itemList;
    }
}

export default new UserStoreService();

