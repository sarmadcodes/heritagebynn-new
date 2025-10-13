import { useModal } from "../contexts/ModalContext";
import { Modal } from "./Modal";
import { SizeGuideModal } from "./modals/SizeGuideModal";
import { ShippingInfoModal } from "./modals/ShippingInfoModal";
import { ReturnsModal } from "./modals/ReturnsModal";
import { CareInstructionModal } from "./modals/CareInstructionModal";

const modalConfigs = {
  sizeGuide: {
    title: "Size Guide",
    component: SizeGuideModal,
  },
  shipping: {
    title: "Shipping Information",
    component: ShippingInfoModal,
  },
  returns: {
    title: "Returns & Exchange",
    component: ReturnsModal,
  },
  care: {
    title: "Care Instructions",
    component: CareInstructionModal,
  },
} as const;

export const ModalContainer = () => {
  const { activeModal, closeModal } = useModal();

  if (!activeModal || !modalConfigs[activeModal]) {
    return null;
  }

  const { title, component: ModalComponent } = modalConfigs[activeModal];

  return (
    <Modal isOpen={true} onClose={closeModal} title={title}>
      <ModalComponent />
    </Modal>
  );
};
