import { SectionDTO } from "./SectionDTO";

export  interface NewSectionState {
    sections: SectionDTO;
    image: File | null;
}