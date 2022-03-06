import {
    recipes
} from "../../assets/data/recipes.js"
import { Tags } from "./Tags.js"
export class Recipes {
    recipesList = recipes
    tags
    constructor() {
        this.generateRecipesDOM()

    }



    generateRecipesDOM() {
        const tags = {ingredients: [], devices: [], utensils: []}
        this.recipesList.map((r) => {
            console.log(r)
            //fill tags list 
            if (!tags.devices.includes(r.appliance)) tags.devices.push(r.appliance)
            r.ustensils.map((u) => {
                console.log(u)
                if (!tags.utensils.includes(u.toLowerCase())) tags.utensils.push(u.toLowerCase())
            })
            const ctnItems = document.createElement('li')
            ctnItems.setAttribute('class', "ctnItems")
            const item = document.createElement('section')
            item.setAttribute('class', "item")
            ctnItems.appendChild(item)
            const itemName = document.createElement("h3")
            itemName.textContent = r.name
            item.appendChild(itemName)
            const duration = document.createElement('span')
            duration.setAttribute('class', 'time')
            
            const durationIcon = document.createElement('img')
            durationIcon.setAttribute('src', 'assets/img/timer.png')
            durationIcon.setAttribute('alt', "Icone de durée de la recette")
            duration.appendChild(durationIcon)
            duration.textContent = r.time + " min"
            item.appendChild(duration)
            const steps = document.createElement("ul")
            r.ingredients.map((i) => {
                if (!tags.ingredients.includes(i.ingredient.toLowerCase())) tags.ingredients.push(i.ingredient.toLowerCase())
                const ingredient = document.createElement("li")
                const bold = document.createElement('span')
                bold.setAttribute("class", "bold")
                bold.textContent = i.ingredient + ":"
                const quantity = document.createElement("p")
                if (i.unit)quantity.textContent = i.quantity + i.unit
                else quantity.textContent = i.quantity
                
                ingredient.appendChild(bold)
                ingredient.appendChild(quantity)
                // ingredient.textContent =i.quantity
                steps.appendChild(ingredient)
            })
            item.appendChild(steps)
            const desc = document.createElement('p')
            desc.textContent = r.description
            item.appendChild(desc)

            const itemsList = document.getElementsByClassName('itemsList')[0]
            itemsList.appendChild(ctnItems)
        })
        this.tags = new Tags(tags)
    }
}