//name tag value will be eng 
export default function translateTags(name) {
    const tags = [{eng:"ingredients", fr: "Ingrédients"},{eng:"devices", fr: "Appareils"},{eng:"utensils", fr: "Ustensiles"}]
    return tags.filter((t) => t.eng === name)[0].fr
}