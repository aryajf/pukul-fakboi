<template>
    <div>
        <audio id="soundtrack" loop>
            <source src="@/assets/music/soundtrack.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <audio id="ohmygod">
            <source src="@/assets/audios/ohmygod.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <audio id="wow">
            <source src="@/assets/audios/wow.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <audio id="punch">
            <source src="@/assets/audios/punch.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>

        <img id="cursor" src="@/assets/images/hammer.png" alt="">
        <div id="selected-screen">
            <div class="container">
                <h1>Pilih Fakboi</h1>
                <div class="row">
                    <div class="col-md-6">
                        <div class="img-container">
                            <img @click="selectCharacter('Man', 750)" src="@/assets/images/characters/fakboi-man/idle.png" alt="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="img-container">
                            <img @click="selectCharacter('Woman', 750)" src="@/assets/images/characters/fakboi-woman/idle.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="start-screen" @click="startGame()">
            <div class="container">
                <h1>Fakboi menggodamu, yuu kita kasih dia pelajaran</h1>
                <div class="img-container">
                    <img v-if="fakboiGender == 'Man'" src="@/assets/images/characters/menu/man.png" alt="">
                    <img v-else-if="fakboiGender == 'Woman'" src="@/assets/images/characters/menu/woman.png" alt="">
                </div>
                <h5>Klik untuk memulai</h5>
            </div>
        </div>
        <div id="winner-screen" class="hidden">
            <div class="container-fluid">
                <img id="winner-image-1" src="@/assets/images/winner.png" alt="">
                <img id="winner-image-2" src="@/assets/images/winner2.png" alt="">
                <h1>Yeay! Kamu sudah buat dia nyerah</h1>
                <div>
                    <button @click="restartGame" class="button-82-pushable">
                        <span class="button-82-shadow"></span>
                        <span class="button-82-edge"></span>
                        <span class="button-82-front text">
                            Ulangi Permainan
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div id="game-container">
            <template v-if="fakboiGender && gameStatus">
                <template v-if="fakboiGender == 'Man'">
                    <img v-if="gameStatus == 'Idle'" @click="hitCharacter()" id="buaya" src="@/assets/images/characters/fakboi-man/idle.png" alt="">
                    <img v-else-if="gameStatus == 'Hitted'" @click="hitCharacter()" id="buaya" src="@/assets/images/characters/fakboi-man/hitted.png" alt="">
                    <img v-else-if="gameStatus == 'Defeated'" @click="hitCharacter()" id="buaya" src="@/assets/images/characters/fakboi-man/defeated.png" alt="">
                </template>
                <template v-else-if="fakboiGender == 'Woman'">
                    <img v-if="gameStatus == 'Idle'" @click="hitCharacter()" id="buaya" src="@/assets/images/characters/fakboi-woman/idle.png" alt="">
                    <img v-else-if="gameStatus == 'Hitted'" @click="hitCharacter()" id="buaya" src="@/assets/images/characters/fakboi-woman/hitted.png" alt="">
                    <img v-else-if="gameStatus == 'Defeated'" @click="hitCharacter()" id="buaya" src="@/assets/images/characters/fakboi-woman/defeated.png" alt="">
                </template>
            </template>
            <div id="health-bar-container">
                <div id="health-bar">
                    <div id="bar"></div>
                </div>
                <div v-if="fakboiGender == 'Man'" id="boss">
                    Buaya Jantan
                </div>
                <div v-else-if="fakboiGender == 'Woman'" id="boss">
                    Buaya Betina
                </div>
            </div>
            <div id="counter">
                {{ score }}
            </div>
            <div v-if="dialogues" id="dialogues-bar">
                {{ dialogues[0] }}
            </div>
            <img v-if="fakboiGender == 'Man'" id="main-char" src="@/assets/images/characters/main/woman.png" alt="">
            <img v-else-if="fakboiGender == 'Woman'" id="main-char" src="@/assets/images/characters/main/man.png" alt="">
            <div id="grounds">
                <img src="@/assets/images/ground/01.png" class="ground" alt="">
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import moment from "moment/min/moment-with-locales"
import store from "@/store";
let intervalChar, intervalDialogues, intervalScore
let counter = 0
let score = ref(0)

const gameStatus = computed(() => store.getters["gameStatus"]);
const difficulty = computed(() => store.getters["difficulty"]);
const loadingStatus = computed(() => store.getters["loadingStatus"]);
const dialogues = computed(() => store.getters["dialogues"]);
const health = computed(() => store.getters["health"]);
const fakboiGender = computed(() => store.getters["fakboiGender"]);

onMounted(() => {
    window.addEventListener('mousemove', mouseIsMoving);
    window.addEventListener('click', () => {
        if(gameStatus.value == 'Idle') mouseClick()
    })
})

watch(gameStatus, () => {
    
});

const selectCharacter = (gender, difficulty) => {
    store.dispatch("selectCharacter", {gender: gender, difficulty: difficulty}).then(()=> {
        document.getElementById('selected-screen').classList.add("hidden")
    });
};
const startGame = () => {
    InitGame()
};

const initChar = () => {
    document.getElementById('buaya').style.zIndex = '1'
    document.getElementById('buaya').style.transform = `translate(${Math.floor(Math.random() * (500 - -500 + 1)) + -500}px, -20%)`
    document.getElementById('buaya').style.top = `${Math.floor(Math.random() * (50 - 40 + 1)) + 40}%`
    document.getElementById('buaya').style.left = `${Math.floor(Math.random() * (50 - 25 + 1)) + 25}%`
}

const InitGame = () => {
    store.dispatch("initGame").then(()=> {
        score.value = moment().hour(0).minute(0).second(counter++).format('HH : mm : ss')
        counter = 0
        initChar()
        document.getElementById('start-screen').classList.add("hidden")
        document.getElementById('bar').style.width = `${health.value}%`
        document.getElementById('soundtrack').play()
        intervalChar = setInterval(()=> {
            initChar()
        }, difficulty.value)
        intervalDialogues = setInterval(()=> {
            dialogues.value.sort(() => Math.random() - 0.5)
        }, 2000)
        intervalScore = setInterval(()=> {
            score.value = moment().hour(0).minute(0).second(counter++).format('HH : mm : ss');
        }, 1000)
    });
}

const mouseIsMoving = (e) => {
    const x = e.pageX + 10;
    const y = e.pageY - 100;
    document.getElementById('cursor').style.top = `${y}px`
    document.getElementById('cursor').style.left = `${x}px`
}

const mouseClick = () => {
    document.getElementById('cursor').classList.add("clicked")
    initChar()
    setTimeout(() => {
        if(gameStatus.value != 'Defeated') changeGameStatus('Idle')
        document.getElementById('cursor').classList.remove("clicked")
    }, 250)
}

const hitCharacter = () => {
    clearInterval(intervalDialogues)
    document.getElementById('bar').style.width = `${health.value}%`
    document.getElementById("punch").play()
    initChar()
    if(health.value <= 0){
        return defeatedCharacter()
    }
    store.dispatch("hitCharacter");
}
const defeatedCharacter = () => {
    clearInterval(intervalChar)
    clearInterval(intervalScore)
    store.dispatch("defeatedCharacter").then(() => {
        document.getElementById('counter').classList.add("end")
        document.getElementById('winner-screen').classList.remove("hidden")
        document.getElementById("wow").play()
        document.getElementById('buaya').style.zIndex = '1'
        document.getElementById('buaya').style.bottom = '10%'
        document.getElementById('buaya').style.left = '50%'
        document.getElementById('buaya').style.transform = `translate(-50%, 0)`
    })

}
const changeGameStatus = (status) => {
    store.dispatch("changeGameStatus", status);
}
const closeWinner = () => {
    document.getElementById('winner-screen').classList.add("hidden")
}
const restartGame = () => {
    closeWinner()
    document.getElementById('selected-screen').classList.remove("hidden")
    document.getElementById('start-screen').classList.remove("hidden")
    document.getElementById('counter').classList.remove("end")
    document.getElementById('soundtrack').pause()
    document.getElementById('soundtrack').currentTime = 0
}
</script>

<style lang="scss">
@import "@/assets/sass/home.scss";
</style>