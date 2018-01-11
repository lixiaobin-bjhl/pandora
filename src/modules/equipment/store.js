
const state = {
    showEquipmentStatusListState: false,
    equipment: null,
    showApplyEquipmentState: false
};

const mutations = {
    'SHOW_EQUIPMENT_STATUS_LIST' (state, equipment) {
        state.showEquipmentStatusListState = true;
        state.equipment = equipment;
    },
    'HIDE_EQUIPMENT_STATUS_LIST' (state) {
        state.showEquipmentStatusListState = false;
        state.equipment = null;
    },
    'SHOW_APPLY_EQUIPMENT' (state) {
        state.showApplyEquipmentState = true;
    },
    'HIDE_APPLY_EQUIPMENT' (state) {
        state.showApplyEquipmentState = false;
    }
};

export default {
    state,
    mutations
};