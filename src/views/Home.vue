<template>
    <div>
        <div class="start-screen" @click="startGame()">
            <div class="container">
                <h1>Fakboi menggodamu, yuu kita beri dia pelajaran</h1>
                <div class="img-container">
                    <img src="@/assets/images/fakboi/01.png" alt="">
                </div>
                <h5>Klik untuk memulai</h5>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
// import Rolling from "@/components/loadings/Rolling.vue";
import store from "@/store";

const loadingStatus = computed(() => store.getters["loadingStatus"]);
const btnLoading = computed(() => store.getters["btnLoading"]);

const startGame = () => {
    store.dispatch("initGame");
};
</script>

<style lang="scss">
@import "@/assets/sass/home.scss";
</style>