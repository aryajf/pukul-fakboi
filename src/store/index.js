import { createStore } from 'vuex'

export default createStore({
  state: {
    btnLoading: false,
    loadingStatus: false,
    health: null
  },
  mutations: {
    SET_BUTTON_LOADING(state, status){
      state.btnLoading = status
    },
    SET_LOADING(state, status){
      state.loadingStatus = status
    },
  },
  actions: {
    async initGame({state, commit}){
      try{
        const response = await fetch('./Dialogue.json')
        const dialogues = await response.json();
        console.log(dialogues)
        state.loading = true
        state.health = 100
        state.loading = false
      }catch(error) {
        console.error(`Could not get products: ${error}`);
      }
    }
  },
  getters: {
    btnLoading(state){
      return state.btnLoading
    },
    loadingStatus(state){
      return state.loadingStatus
    },
  },
})
