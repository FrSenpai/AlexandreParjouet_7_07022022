import {Recipes} from "../src/js/factories/Recipes.js"
class Home {
    recipes
    constructor() {
        this.recipes = new Recipes()
    }
}
new Home()