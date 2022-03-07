import translateTags from "../helpers/translateTag.js"

export class Tags {
    tabOpened = false
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
                tagList[0].appendChild(item)
            })
        })
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