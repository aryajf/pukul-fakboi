import { createStore } from 'vuex'

export default createStore({
  state: {
    gameStatus: null,
    difficulty: null,
    loadingStatus: false,
    dialogues: [],
    health: null,
    gender: null
  },
  getters: {
    gameStatus(state){
      return state.gameStatus
    },
    difficulty(state){
      return state.difficulty
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
    gender(state){
      return state.gender
    },
  },
  actions: {
    async selectCharacter({state}, data){
      state.loading = true
      try{
        state.gender = data.gender
        state.difficulty = data.difficulty
      }catch(error) {
        
      }
    },
    async initGame({state}){
      state.loading = true
      try{
        const response = await fetch('./Dialogue.json')
        if(response.status == 200){
          const dialogues = await response.json()
          console.log(dialogues.IdleDialogues[Math.floor(Math.random()*dialogues.IdleDialogues.length)])
          state.dialogues = dialogues.IdleDialogues[Math.floor(Math.random()*dialogues.IdleDialogues.length)]
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
          const dialogues = await response.json()
          state.dialogues = dialogues.HitDialogues[Math.floor(Math.random()*dialogues.HitDialogues.length)]
          console.log(state.dialogues)
          if(state.health >=0){
            state.health -= 5
          }
          state.gameStatus = 'Hitted'
        }
      }catch(error) {}
    },
    async returnDialogues({state}){
      try{
        const response = await fetch('./Dialogue.json')
        if(response.status == 200){
          const dialogues = await response.json()
          state.dialogues = dialogues.IdleDialogues[Math.floor(Math.random()*dialogues.IdleDialogues.length)]
        }
      }catch(error) {}
    },
    async defeatedCharacter({state}){
      try{
        const response = await fetch('./Dialogue.json')
        if(response.status == 200){
          const dialogues = await response.json()
          state.dialogues = dialogues.DefeatDialogues[Math.floor(Math.random()*dialogues.DefeatDialogues.length)]
          state.gameStatus = 'Defeated'
        }
      }catch(error) {}
    },
    async changeGameStatus({state}, status){
      state.gameStatus = status
    },
  }
})
