import {
    recipes
} from "../../assets/data/recipes.js"
import {
    Tags
} from "./Tags.js"
export class Recipes {
    recipesList = recipes
    tags
    constructor(filter = {
        content: "",
        tags: []
    }) {

        // this.generateRecipesDOM()
        this.getRecipes(filter)
        this.handleSearchUpdate(filter.tags)
    }

    getRecipes(filter) {
        const filteredRecipes = []
        for (let i = 0; i < this.recipesList.length; i++) {
            let match = []
            const r = this.recipesList[i]
            match.push(r.name.toLowerCase().includes(filter.content.toLowerCase()) || r.description.toLowerCase().includes(filter.content.toLowerCase()))
            for (let k = 0; k < filter.tags.length; k++) {
                const t = filter.tags[k]
                switch (t.type) {
                    case "ingredients":
                        const ingredients = [];
                        for (let j = 0; j < r[t.type].length; j++) {
                            const item = r[t.type][j]
                            if (item.ingredient.toLowerCase() === t.name.toLowerCase()) {
                                ingredients.push(item)
                            }
                        }
                        match.push(ingredients.length > 0)
                        break
                    case "utensils":
                        const utensils = [];
                        for (let j = 0; j < r.ustensils.length; j++) {
                            const item = r.ustensils[j]
                            if (item.toLowerCase() === t.name.toLowerCase()) {
                                utensils.push(item)
                            }
                        }
                        match.push(utensils.length > 0)
                        break
                    case "devices":
                        match.push(r.appliance.toLowerCase() === t.name.toLowerCase())
                }

            }
            if (!match.includes(false)) filteredRecipes.push(r)
        }
        this.cleanDom()
        this.generateRecipesDOM(filteredRecipes)

    }

    handleSearchUpdate(tags) {
        document.getElementById("search").addEventListener('keyup',(e) => {
            const word = document.getElementById("search").value
            if (word.length > 2) {
                this.getRecipes({content: word, tags})
            } else if (word.length === 0) {
                this.getRecipes({content:"", tags:[]})
            }
        })
    }

    cleanDom() {
        const items = document.getElementsByClassName('itemsList')[0]
        while (items.lastElementChild) {
            items.removeChild(items.lastElementChild)
        }
    }

    generateRecipesDOM(recipes) {
        const tags = {
            ingredients: [],
            devices: [],
            utensils: []
        }
        recipes.map((r) => {
            //fill tags list 
            if (!tags.devices.includes(r.appliance)) tags.devices.push(r.appliance)
            r.ustensils.map((u) => {
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
                const alreadyPushed = tags.ingredients.filter((ing) => {
                    return ing.toLowerCase().includes(i.ingredient.toLowerCase())
                })
                if (!alreadyPushed.length > 0) {
                    tags.ingredients.push(i.ingredient)
                } 
               
                const ingredient = document.createElement("li")
                const bold = document.createElement('span')
                bold.setAttribute("class", "bold")
                bold.textContent = i.ingredient + ":"
                const quantity = document.createElement("p")
                if (i.unit) quantity.textContent = i.quantity + i.unit
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