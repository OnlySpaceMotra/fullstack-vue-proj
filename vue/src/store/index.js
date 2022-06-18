import {createStore} from "vuex";
import axiosClient from "@/axios";

const tmpSurveys = [
  {
    id: 1,
    title: 'My First Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A eveniet dolorum deleniti quis unde ut cum quisquam aliquam, delectus laborum.',
    status: "draft",
    image: 'public/boo.PNG',
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: 'kjflksdjlfk jsldkfjsjdf lskdfj ewkhrokewhhrokwej ksjdlkf sdl fhsd',
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e51ea", text: "USA"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "Georgia"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e53ea", text: "Germany"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e54ea", text: "India"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e55ea", text: "Russia"},
          ]
        }
      },
      {
        id: 2,
        type: "checkbox",
        question: "Second questihons?",
        description: 'kjflksdjlfk jsldkfjsjdf lskdfj ewkhrokewhhrokwej ksjdlkf sdl fhsd',
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e51ea", text: "JavaScript"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "Php"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e53ea", text: "Alphine"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e54ea", text: "Bootstrap"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e55ea", text: "Laravel"},
          ]
        }
      },
      {
        id: 3,
        type: "radio",
        question: "Thert questihons?",
        description: 'kjflksdjlfk jsldkfjsjdf lskdfj ewkhrokewhhrokwej ksjdlkf sdl fhsd',
        data: {
          options: [
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e51ea", text: "JavaScript"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "Php"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e53ea", text: "Alphine"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e54ea", text: "Bootstrap"},
            {uuid: "f8af96f2-1d80-4632-9e9e-b560670e55ea", text: "Laravel"},
          ]
        }
      },
      {
        id: 4,
        type: "text",
        question: "Four questihons?",
        description: 'kjflksdjlfk jsldkfjsjdf lskdfj ewkhrokewhhrokwej ksjdlkf sdl fhsd',
        data: {}
      }
    ]
  }
]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: tmpSurveys,
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"]
  },
  getters: {},
  actions: {
    saveSurvey({commit}, survey){
      let response;
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`,survey)
          .then((res) => {
            commit("updateSurvey", res.data)
            return res
          })
      } else {
        response = axiosClient
          .post(`/survey`,survey)
          .then((res) => {
            commit("saveSurvey",res.data)
            return res
          })
      }
      return res
    },
    register({ commit }, user) {
      return axiosClient.post('/register', user)
        .then(({data})=> {
          commit('setUser', data)
          return data;
        }) 
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user)
        .then(({data})=> {
          commit('setUser', data)
          return data;
        })
    },
    logout({ commit }) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response
        })
    }
  },
  mutations: {
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data]
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) =>{
        if (s.id == survey.data.id) {
          return survey.data
        }
        return s
      })
    },
    logout: state => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.clear('TOKEN')
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  modules: {},
})

export default store
