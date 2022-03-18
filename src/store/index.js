import { createStore } from 'vuex'

export default createStore({
  state: {
    gameStatus: null,
    loadingStatus: false,
    dialogues: [],
    health: null,
    fakboiGender: null
  },
  getters: {
    gameStatus(state){
      return state.gameStatus
    },
    loadingStatus(state){
      return state.loadingStatus
    },
    dialogues(state){
      return state.dialogues
    },
    health(state){
      return state.health
    },
    fakboiGender(state){
      return state.fakboiGender
    },
  },
  actions: {
    async selectCharacter({state}, gender){
      state.loading = true
      try{
        state.fakboiGender = gender
      }catch(error) {
        
      }
    },
    async initGame({state}){
      state.loading = true
      try{
        const response = await fetch('./Dialogue.json')
        if(response.status == 200){
          const dialogues = await response.json();
          state.dialogues = dialogues.IdleDialogues
          state.health = 100
          state.gameStatus = 'Idle'
          state.loading = false
        }
      }catch(error) {
        
      }
    },
    async hitCharacter({state}){
      try{
        const response = await fetch('./Dialogue.json')
        if(response.status == 200){
          const dialogues = await response.json();
          state.dialogues = dialogues.HitDialogues
          if(state.health >=0){
            state.health -= 5
          }
          state.gameStatus = 'Hitted'
        }
      }catch(error) {}
    },
    async defeatedCharacter({state}){
      try{
        const response = await fetch('./Dialogue.json')
        if(response.status == 200){
          const dialogues = await response.json();
          state.dialogues = dialogues.DefeatDialogues
          state.gameStatus = 'Defeated'
        }
      }catch(error) {}
    },
    async changeGameStatus({state}, status){
      state.gameStatus = status
    },
  }
})
