
const state = {
    showEquipmentStatusListState: false,
    equipment: null,
    applyItem: null,
    isModified: false,
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
    'SHOW_APPLY_EQUIPMENT' (state, data) {
        state.showApplyEquipmentState = true;
        state.applyItem = data.applyItem;
        state.isModified = data.isModified;
    },
    'HIDE_APPLY_EQUIPMENT' (state) {
        state.showApplyEquipmentState = false;
        state.applyItem = null;
        state.isModified = false;
    }
};

export default {
    state,
    mutations
};