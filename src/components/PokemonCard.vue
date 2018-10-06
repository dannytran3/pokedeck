<template>
    <div class="max-w-xxs mb-6" >
        <div class=" shadow-md rounded-lg text-none">
            <slot name="image"></slot>
        </div>
        <div class="px-6 py-2">
            <slot name="name"></slot>
        </div>
    </div>
</template>

<script>
    import CardModal from "@/components/CardModal.vue";
    export default {
        
    }
</script>

<style scoped>

</style>