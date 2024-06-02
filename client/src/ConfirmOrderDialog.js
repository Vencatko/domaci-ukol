import { useContext, useState } from "react";
import { ItemListContext } from "./ItemListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";



import { CompanyContext } from "./CompanyContext.js";

function ConfirmOrderDialog({ setShowConfirmOrderDialog, item}) {
  const { state, handlerMap } = useContext(ItemListContext);
  const setShowAlert = useState(null);
  const isPending = state === "pending";
  const {loggedInCompany} = useContext(CompanyContext);

  return loggedInCompany ? (
    <Modal show={true} onHide={() => setShowConfirmOrderDialog(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          // formData.date = new Date(formData.date).toISOString();
          try {
            if (item.id) {
              formData.itemId = item.id;
              formData.companyId = loggedInCompany.id;
              await handlerMap.handleOrder(formData);
            }

            setShowConfirmOrderDialog(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
      <Modal.Header>
        <Modal.Title>Objednat položku</Modal.Title>
        <CloseButton onClick={() => setShowConfirmOrderDialog(false)} />
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Kvantita položky</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              // required
              defaultValue={0}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowConfirmOrderDialog(false)}
          disabled={isPending}
        >
          Zavřít
        </Button>
        <Button type="submit" variant="primary" disabled={isPending}>
          Vytvořit objednávku
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  ):null 
}

export default ConfirmOrderDialog;