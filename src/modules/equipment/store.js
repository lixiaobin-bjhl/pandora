
const state = {
    showEquipmentStatusListState: false,
    equipment: null,
    applyItem: null,
    isModified: false,
    showApplyEquipmentState: false,
    showApplyEquipmentAuditState: false
};

const mutations = {
    'SHOW_EQUIPMENT_STATUS_LIST' (state, applyItem) {
        state.showEquipmentStatusListState = true;
        state.applyItem = applyItem;
    },
    'HIDE_EQUIPMENT_STATUS_LIST' (state) {
        state.showEquipmentStatusListState = false;
        state.applyItem = null;
    },
    'SHOW_APPLY_EQUIPMENT_AUDIT' (state, applyItem) {
        state.showApplyEquipmentAuditState = true;
        state.applyItem = applyItem;
    },
    'HIDE_APPLY_EQUIPMENT_AUDIT' (state, applyItem) {
        state.showApplyEquipmentAuditState = false;
        state.applyItem = false;
    },
    'SHOW_APPLY_EQUIPMENT' (state, data = {}) {
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