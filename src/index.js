import {Recipes} from "../src/js/factories/Recipes.js"
import { Tags } from "./js/factories/Tags.js"
class Home {
    recipes
    constructor() {
        this.recipes = new Recipes()
    }

}
new Home()