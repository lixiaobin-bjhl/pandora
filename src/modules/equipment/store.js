
const state = {
    showEquipmentStatusListState: false,
    equipment: null,
    applyItem: null,
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
    'SHOW_APPLY_EQUIPMENT' (state, applyItem) {
        state.showApplyEquipmentState = true;
        state.applyItem = applyItem;
    },
    'HIDE_APPLY_EQUIPMENT' (state) {
        state.showApplyEquipmentState = false;
        state.applyItem = null;
    }
};

export default {
    state,
    mutations
};