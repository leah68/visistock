export const state = () => ({
  value: {}
})

export const mutations = {
  update (state, data) {
    console.log(data)
    state.value[data.id_caracteristique] = data.text
  }
}
