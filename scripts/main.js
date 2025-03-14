// Display Coins on the Main Page
const coinsElement = document.getElementById('coins');
const coins = localStorage.getItem('coins') || 0;
coinsElement.textContent = coins;