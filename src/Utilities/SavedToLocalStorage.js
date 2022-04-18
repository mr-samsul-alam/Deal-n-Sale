// use local storage as your db for now
const addToDb = (pdCode,count) => {
    const exists = getDb();
    let shopping_wishlist = {};
    if (!exists) {
        shopping_wishlist[pdCode] = count;
    }
    else {
        shopping_wishlist = JSON.parse(exists);
        if (shopping_wishlist[pdCode]) {
            const newCount =  count;
            shopping_wishlist[pdCode] = newCount;
        }
        else {
            shopping_wishlist[pdCode] = 1;
        }
    }
    updateDb(shopping_wishlist);
}

const getDb = () => localStorage.getItem('shopping_wishlist');

const updateDb = cart => {
    localStorage.setItem('shopping_wishlist', JSON.stringify(cart));
}

const removeFromDb = id => {
    const exists = getDb();
    if (!exists) {

    }
    else {
        const shopping_wishlist = JSON.parse(exists);
        delete shopping_wishlist[id];
        updateDb(shopping_wishlist);
    }
}

const getStoredCart = () => {
    const exists = getDb();
    return exists ? JSON.parse(exists) : {};
}

const clearTheCart = () => {
    localStorage.removeItem('shopping_wishlist');
}

export { addToDb, removeFromDb, clearTheCart, getStoredCart }