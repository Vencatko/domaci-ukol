import { useContext, useState } from "react";
import { ItemListContext } from "./ItemListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { CompanyContext } from "./CompanyContext.js";

function ConfirmOrderDialog({ setShowConfirmOrderDialog, item , customer}) {
  const { state, handlerMap } = useContext(ItemListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowConfirmOrderDialog(false)}>
      <Modal.Header>
        <Modal.Title>Objednat položku</Modal.Title>
        <CloseButton onClick={() => setShowConfirmOrderDialog(false)} />
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <Alert
          show={!!showAlert}
          variant="danger"
          dismissible
          onClose={() => setShowAlert(null)}
        >
          <Alert.Heading>Nepodařilo se vytvořit objednávku</Alert.Heading>
          <pre>{showAlert}</pre>
        </Alert>
        {isPending ? (
          <div style={pendingStyle()}>
            <Icon path={mdiLoading} size={2} spin />
          </div>
        ) : null}
        Opravdu chcete objednat položku {item.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowConfirmOrderDialog(false)}
          disabled={isPending}
        >
          Zavřít
        </Button>
        <Button
          variant="Primary"
          disabled={isPending}
          onClick={async (e) => {
            try {
              await handlerMap.handleOrder({ 
                itemId: item.id,
                companyId: customer.id
              });
              setShowConfirmOrderDialog(false);
            } catch (e) {
              console.error(e);
              setShowAlert(e.message);
            }
          }}
        >
          Objednat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

export default ConfirmOrderDialog;