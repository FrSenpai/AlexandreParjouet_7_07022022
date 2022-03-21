import translateTags from "../helpers/translateTag.js"
import { Recipes } from "./Recipes.js"

export class Tags {
    tabOpened = false
    tagPicked = []
    recipes
    constructor(tags = {
        ingredients,
        devices,
        utensils
    }) {
        this.cleanDom()
        this.handleTagsCtnClick()
        this.generateTagsContent(tags)
    }
    handleTagsCtnClick() {
        const tagsInput = document.getElementsByClassName('tagInput')
        const actionBtn = document.getElementsByClassName("tabTagInteract")
        this.createTagModalEvents([tagsInput, actionBtn])
    }

    cleanDom() {
        const list = document.getElementsByClassName('tagsList')[0]
        while (list.lastElementChild) {
            list.removeChild(list.lastElementChild)
        }
    }

    createTagModalEvents(targets) {
        targets.map((t) => {
            let indexOpened = null
            for (let i = 0; i < t.length; i++) {
                const tag = t[i]
                tag.addEventListener('click', (e) => {
                    if (!this.tabOpened) {
                        indexOpened = i
                        this.openTab(tag)
                    } else {
                        if (indexOpened !== i) {
                            indexOpened = i
                            this.closeOpenedTags(e, indexOpened)
                        } else this.closeOpenedTags(e)
                    }

                })
            }
        })
    }

    generateTagsContent(tags) {
        console.log(tags)
        Object.keys(tags).map((tag) => {
            const ctnTag = document.getElementsByClassName('tag ' + tag)[0]
            const tagList = ctnTag.getElementsByTagName("ul")
            tags[tag].map((t) => {
                const item = document.createElement("li")
                item.textContent = t
                item.addEventListener('click', (e) => {
                    this.handleTagClickEvent(e.target.innerText, tag)
                })
                tagList[0].appendChild(item)
            })
        })
    }

    handleTagClickEvent(name, tagType) {
        const isAlreadyPushed = this.tagPicked.filter((t) => t.name === name).length > 0
        const ctnTagPicked = document.getElementsByClassName('ctnTagPicked')[0]
        if (!isAlreadyPushed) {

            const tag = document.createElement('li')
            tag.textContent = name
            const actionIcon = document.createElement('img')
            actionIcon.setAttribute("src", "../src/assets/img/delete.png")
            actionIcon.setAttribute('alt', 'Remove the tag')
            actionIcon.addEventListener('click', (e) => {
                this.removeTagPicked(e)
            })
            tag.appendChild(actionIcon)
            tag.style.backgroundColor = this.getBGColorFromTagType(tagType)
            ctnTagPicked.appendChild(tag)
            this.tagPicked.push({
                type: tagType,
                name
            })
            this.recipes = new Recipes({content:document.getElementById('search').value, tags:this.tagPicked})
        }

    }

    removeTagPicked(event) {
        //we target li to remove it
        const li = event.path[1]
        this.tagPicked = this.tagPicked.filter((t) => t.name !== li.textContent)
        console.log(document.getElementById('search').value)
        this.recipes = new Recipes({content:document.getElementById('search').value, tags:this.tagPicked})
        li.remove()
    }

    getBGColorFromTagType(tagType) {
        switch (tagType) {
            case "ingredients":
                return "#3282f7"
            case "devices":
                return "#68d9a4"
            case "utensils":
                return "#ed6454"
        }
    }

    openTab(tagDom) {
        if (tagDom.className.includes("tabTagInteract")) {
            const className = tagDom.className.split("tabTagInteract ")[1]
            tagDom = document.getElementById(className+"Input")
        }
        const className = tagDom.name.split("Input")[0]
        const ctnTag = document.getElementsByClassName("tag " + className)[0]
        const tagList = ctnTag.getElementsByTagName('ul')[0]
        ctnTag.style.width = "600px"
        ctnTag.style.height = "fit-content"
        tagList.style.overflow = "auto"
        tagList.style.visibility = "visible"
        tagList.style.width = '600px'
        let translated = translateTags(className)
        //plurial to singular 
        const name = translated[0].toLowerCase() + translated.slice(1, translated.length - 1)
        tagDom.placeholder = "Rechercher un " + name
        tagDom.style.setProperty('--placeholdOpacity', "0.5")
        this.tabOpened = true
    }


    closeOpenedTags(event, indexToOpen = null) {
        const ctnTag = document.getElementsByClassName("tag")
        for (let i = 0; i < ctnTag.length; i++) {
            const tag = ctnTag[i]
            tag.style.width = "170px"
            tag.style.height = "70px"
            const tagList = tag.getElementsByTagName('ul')[0]
            tagList.style.overflow = "none"
            tagList.style.visibility = "hidden"
            tagList.style.width = '0px'
            const tagInput = tag.getElementsByTagName("input")[0]
            const className = tagInput.name.split("Input")[0]
            tagInput.placeholder = translateTags(className)
            tagInput.style.setProperty('--placeholdOpacity', "1")
        }
        this.tabOpened = false
        if (indexToOpen !== null) {
            this.openTab(document.getElementsByClassName('tagInput')[indexToOpen])
        }
    }

    updateTagsPlaceholders() {

    }
}