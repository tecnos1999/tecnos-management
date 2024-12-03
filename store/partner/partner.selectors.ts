import { createSelector } from "@reduxjs/toolkit";
import { PartnerState } from "./partner.reducers";

interface RootState {
  partnerState: PartnerState;
}

export const selectPartnerState = (state: RootState): PartnerState =>
  state.partnerState;

export const selectPartners = createSelector(
  selectPartnerState,
  (partnerState) => partnerState.partners
);

export const selectRetrievePartnersState = createSelector(
  selectPartnerState,
  (partnerState) => partnerState.retrievePartnersState
);
