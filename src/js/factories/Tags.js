import translateTags from "../helpers/translateTag.js"
import {
    Recipes
} from "./Recipes.js"

export class Tags {
    tabOpened = false
    tagPicked = []
    recipes
    allTags //contain tags sended by parent, will be immutable
    tags //active tags list displayed
    constructor(tags = {
        ingredients,
        devices,
        utensils
    }) {
        this.tags = tags
        this.allTags = {...tags}
        this.cleanDom()
        this.refreshTagPicked()
        this.handleTagsCtnClick()
        this.generateTagsContent()
        this.handleTagsSearchBar()
    }
    handleTagsCtnClick() {
        const tagsInput = document.getElementsByClassName('tagInput')
        const actionBtn = document.getElementsByClassName("tabTagInteract")
        this.createTagModalEvents([tagsInput, actionBtn])
    }

    handleTagsSearchBar() {
        const searchs = document.getElementsByClassName("tagInput")
        for (let i = 0; i < searchs.length; i++) {
            searchs[i].addEventListener('keyup', (e) => {
                const searchValue = searchs[i].value
                if (searchValue.length < 3 && searchValue !== "") return
                if (searchValue !== "") {
                    this.cleanDom(i)
                    const tags = Object.values(this.tags)[i].filter((v) => {
                        return v.toLowerCase().includes(searchValue.toLowerCase())
                    })
                    this.tags[Object.entries(this.tags)[i][0]] = tags
                    this.generateTagsContent(i)
                } else {
                    console.log(this.allTags)
                    this.cleanDom(i)
                    this.tags[Object.entries(this.tags)[i][0]] = [...this.allTags[Object.entries(this.allTags)[i][0]]]
                    this.generateTagsContent(i)
                }

            })
        }
    }
    /**
     * 
     * @param {null | number} index we take it to only clean a specific taglist if needed
     */
    cleanDom(index = null) {
        const list = document.getElementsByClassName('tagsList')
        if (index !== null) {
            this.removeAllChildsDOM(list[index])
            return
        }
        for (let i = 0; i < list.length; i++) {
            this.removeAllChildsDOM(list[i])
        }
    }

    removeAllChildsDOM(dom) {
        while (dom.lastElementChild) {
            dom.removeChild(dom.lastElementChild)
        }
    }

    refreshTagPicked() {
        const tags = document.getElementsByClassName("ctnTagPicked")[0].getElementsByTagName("li")
        for (let i = 0; i < tags.length; i++) {
            this.tagPicked.push({
                type: this.getTagType(tags[i].style.backgroundColor),
                name: tags[i].innerText
            })
        }
    }

    getTagType(bgColor) {
        switch (bgColor) {
            case "rgb(50, 130, 247)":
                return "ingredients"
            case "rgb(104, 217, 164)":
                return "devices"
            case "rgb(237, 100, 84)":
                return "utensils"
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
    /**
     * 
     * @param {null | number} index we take it to only generate a specific taglist if needed
     */
    generateTagsContent(index = null) {
        Object.keys(this.tags).map((tag, i) => {
            if (index !== null && index !== i) {
                return
            }
            const ctnTag = document.getElementsByClassName('tag ' + tag)[0]
            const tagList = ctnTag.getElementsByTagName("ul")
            this.tags[tag].map((t) => {
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
        console.log(this.tagPicked)
        const isAlreadyPushed = this.tagPicked.filter((t) => t.name.toLowerCase() === name.toLowerCase()).length > 0
        console.log(isAlreadyPushed)
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
            this.recipes = new Recipes({
                content: document.getElementById('search').value,
                tags: this.tagPicked
            })
        }

    }

    removeTagPicked(event) {
        //we target li to remove it
        const li = event.path[1]
        this.tagPicked = this.tagPicked.filter((t) => t.name !== li.textContent)
        console.log(document.getElementById('search').value)
        li.remove()
        this.recipes = new Recipes({
            content: document.getElementById('search').value.toLowerCase(),
            tags: this.tagPicked
        })

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
            tagDom = document.getElementById(className + "Input")
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
            tagInput.value = ""
        }
        this.tabOpened = false
        if (indexToOpen !== null) {
            this.openTab(document.getElementsByClassName('tagInput')[indexToOpen])
        }
    }
}