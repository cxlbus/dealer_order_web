

const base_info = {
    state: {
        is_mobile:false
    },
    getters : {
    },
    mutations: {
        is_mobile(state,dealertable) {
            state.is_mobile=dealertable.is_mobile
        },
    },
    actions: {
        is_mobile(context,dealertable) {
            context.commit('is_mobile',dealertable)
        },
    }
};



export default base_info
