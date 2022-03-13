import translateTags from "../helpers/translateTag.js"

export class Tags {
    tabOpened = false
    tagPicked = []
    constructor(tags = {
        ingredients,
        devices,
        utensils
    }) {
        this.handleTagsCtnClick()
        this.generateTagsContent(tags)
    }
    handleTagsCtnClick() {
        const tagsInput = document.getElementsByClassName('tagInput')
        let indexOpened = null
        for (let i = 0; i < tagsInput.length; i++) {
            const tag = tagsInput[i]
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
    }

    generateTagsContent(tags) {
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
        console.log(this.tagPicked)
        console.log(isAlreadyPushed)
        if (!isAlreadyPushed) {
            
            const tag = document.createElement('li')
            tag.textContent = name
            const actionIcon = document.createElement('img')
            actionIcon.setAttribute("src", "../src/assets/img/delete.png")
            actionIcon.setAttribute('alt', 'Remove the tag')
            actionIcon.addEventListener('click', (e) => {
                console.log("close !")
                this.removeTagPicked(e)
            })
            console.log(tagType)
            tag.appendChild(actionIcon)
            tag.style.backgroundColor = this.getBGColorFromTagType(tagType)
            ctnTagPicked.appendChild(tag)
            this.tagPicked.push({
                type: tagType,
                name
            })
        }

    }

    removeTagPicked(event) {
        console.log(event)
        
        //we target li to remove it
       const li = event.path[1]
       console.log(li.textContent)
       this.tagPicked = this.tagPicked.filter((t) => t.name !== li.textContent)
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
            console.log(document.getElementsByClassName('tagInput')[indexToOpen])
            this.openTab(document.getElementsByClassName('tagInput')[indexToOpen])
        }
    }

    updateTagsPlaceholders() {

    }
}