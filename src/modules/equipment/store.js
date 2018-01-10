
const state = {
    showEquipmentStatusListState: false,
    equipment: null
};

const mutations = {
    'SHOW_EQUIPMENT_STATUS_LIST' (state, equipment) {
        state.showEquipmentStatusListState = true;
        state.equipment = equipment;
    },
    'HIDE_EQUIPMENT_STATUS_LIST' (state) {
        state.showEquipmentStatusListState = false;
        state.equipment = null;
    }
};

export default {
    state,
    mutations
};