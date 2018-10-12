<template>
    <div v-show="show" class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke flex">
      <div class="animated fadeInUp flex fixed items-center shadow-inner max-w-xl md:relative pin-b pin-x align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">
            <img :src="card.imageUrl" :alt="card.name" :title="card.name" class="w-1/3">
        <div class="w-2/3">
            <div class="flex justify-between items-center mx-6 md:mt-8">
                <h2 class="text-4xl text-center font-hairline">{{ card.name }}</h2>
                <div class="flex items-center">
                    <h2 class="text-2xl text-center font-hairline" v-if="card.hp && card.hp != 'None'">{{ card.hp }} HP</h2>
                    <img v-if="card.types" :src="`${ baseUrl}${ card.types[0] }.png`" :alt="card.types[0]" class="mx-2" width="25px" height="25px" :key="card.types[0].id">
                </div>
            </div>
            <p class="text-grey-dark text-left mb-4 mx-6" v-if="card.evolvesFrom">{{ card.subtype }}, Evolves from {{ card.evolvesFrom }}</p>
            <div class="flex py-4 mx-6 border-b border-grey-light items-center" v-if="card.ability || card.text">
                <div class="text-left">
                    <p class="text leading-normal mb-4" v-if="card.text">
                        {{ card.text[0] }}
                    </p>
                    <p class="text-xl" v-if="card.ability">
                        <img :src="`${ baseUrl}${ card.ability.type }.png`" :alt="card.ability.type" class="mx-1" width="70px" height="20px" :key="card.ability.type.id">
                        {{ card.ability.name }}
                    </p>
                    <p class="text leading-normal" v-if="card.ability">
                        {{ card.ability.text }}
                    </p>
                </div>
            </div>
            <div class="flex py-4 mx-6 border-b border-grey-light items-center" v-for="attack in card.attacks" :key="attack.id">
                <div class="px-3 w-24">
                    <template  v-for="energy in attack.cost">
                        <img v-if="energy != 'Free'" :src="`${ baseUrl}${ energy }.png`" :alt="`${energy} energy`" class="mx-1" width="20px" height="20px" :key="energy.id">
                    </template>
                </div>
                <div class="flex-1 text-left">
                    <p class="text-xl">
                        {{ attack.name }}
                    </p>
                    <p class="text leading-normal">
                        {{ attack.text }}
                    </p>
                </div>
                <div class="text-xl font-bold leading-normal px-3 w-24">
                    {{ attack.damage }}
                </div>
            </div>
            <div class="flex justify-around py-6 px-3">
                <div class="flex flex-col justify-center items-center" v-if="card.weaknesses">
                    <p class="leading-normal uppercase text-xs tracking-wide">Weaknesses</p>
                    <div v-for="weakness in card.weaknesses" class="flex items-center" :key="weakness.id">
                        <img :src="`${ baseUrl}${ weakness.type }.png`" :alt="`${weakness.type} energy`" class="mx-1" width="20px" height="20px">
                        {{ weakness.value }}
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center" v-if="card.resistances">
                    <p class="leading-normal uppercase text-xs tracking-wide">Resistances</p>
                    <div class="flex items-center">
                        <template v-for="resistance in card.resistances" >
                            <img  :key="resistance.id" :src="`${ baseUrl}${ resistance.type }.png`" :alt="`${resistance.type} energy`" class="mx-1" width="20px" height="20px">
                            <p class="mx-1" :key="resistance.id">{{ resistance.value }}</p>
                        </template>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center" v-if="card.retreatCost">
                    <p class="leading-normal uppercase text-xs tracking-wide">Retreat Cost</p>
                    <div class="flex items-center">
                        <template v-for="retreatCost in card.retreatCost">
                            <img :key="retreatCost.id" :src="`${ baseUrl}${ retreatCost }.png`" :alt="`${retreatCost.type} energy`" class="mx-1" width="20px" height="20px">
                        </template>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center" v-if="card.rarity">
                    <p class="leading-normal uppercase text-xs tracking-wide">Rarity</p>
                    <p class="font-bold">{{ card.rarity }}</p>
                </div>
            </div>
        </div>
        <span @click="dismiss" class="absolute pin-t pin-r pt-4 px-4">
            <svg class="h-12 w-12 text-grey hover:text-grey-darkest" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
    </div>
</template>

<script>
export default {
    props: ["show", "card"],
    created() {
        const escapeHandler = e => {
            if (e.key === "Escape" && this.show) {
            this.dismiss()
            }
        }
        document.addEventListener("keydown", escapeHandler)
        this.$once("hook:destroyed", () => {
            document.removeEventListener("keydown", escapeHandler)
        })
    },
    data () {
        return {
            baseUrl: process.env.BASE_URL
        }
    },
    methods: {
        dismiss() {
            this.$emit("close")
        }
    },

}
</script>

<style scoped>

</style>