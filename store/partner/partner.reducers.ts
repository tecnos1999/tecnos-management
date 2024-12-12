import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../actionType/LoadingState";
import PartnerDTO from "@/module/partners/dto/PartnerDTO";

export interface PartnerState {
  partners: PartnerDTO[];
  retrievePartnersState: LoadingState;
}

export const initialState: PartnerState = {
  partners: [],
  retrievePartnersState: LoadingState.NONE,
};

const partnerSlice = createSlice({
  name: "Partner",
  initialState,
  reducers: {
    loadPartners(state, action: PayloadAction<PartnerDTO[]>) {
      state.partners = action.payload;
    },
    retrievePartnersSuccess(state) {
      state.retrievePartnersState = LoadingState.SUCCES;
    },
    retrievePartnersLoading(state) {
      state.retrievePartnersState = LoadingState.LOADING;
    },
    retrievePartnersError(state) {
      state.retrievePartnersState = LoadingState.ERROR;
    },
  },
});

export const {
  loadPartners,
  retrievePartnersSuccess,
  retrievePartnersLoading,
  retrievePartnersError,
} = partnerSlice.actions;

export default partnerSlice;
