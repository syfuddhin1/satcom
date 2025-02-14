import AddUserPage from "@/app/(user)/users/add/page";
import Modal from "@/components/ui/Modal";

export default function UserAddModal() {
  return (
    <Modal className="w-2/3">
      <AddUserPage />
    </Modal>
  );
}
