import axios from 'axios'

var baseURL = "http://localhost:3000/api";
baseURL = "https://peaceful-dawn-70653.herokuapp.com/api/";

const ApiService = {
    loadGroceryList(){
        axios.get(baseURL + 'grocerylist').then((grocerylist) => {
            return grocerylist;
        }).catch((error) => {
            return (error);
        })
    }
};

export default ApiService;