export class Tags {
    tabOpened = false
    constructor(tags={ingredients, devices, utensils}) {
        this.handleTagsCtnClick()
        this.generateTagsContent(tags)
    }
    handleTagsCtnClick() {
        const tagsInput = document.getElementsByClassName('tagInput')
        for (let i =0; i< tagsInput.length; i++) {
            const tag = tagsInput[i]
            tag.addEventListener('click', () => {
                console.log("click !")
                !this.tabOpened ? this.openTab(tag) : null
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
        console.log(tagDom)
        const ctnTag = document.getElementsByClassName("tag " + className)[0]
        const tagList = ctnTag.getElementsByTagName('ul')[0]
        ctnTag.style.width = "600px"
        ctnTag.style.height = "fit-content"
        tagList.style.overflow = "auto"
        tagList.style.visibility = "visible"
        tagList.style.width = '600px'
        tagDom.placeholder = "Rechercher un ingrédient"
        tagDom.style.setProperty('--placeholdOpacity', "0.5")
        this.tabOpened = true
    }


    closeOpenedTags() {

    }
}