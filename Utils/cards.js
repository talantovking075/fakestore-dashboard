const api = "https://fakestoreapi.com/carts";
const getCards = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}
getCards(api);

const showCards = (cards) => {
    
}