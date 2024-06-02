import Button from "react-bootstrap/esm/Button.js";
import Card from "react-bootstrap/Card";

import Icon from "@mdi/react";
import { mdiCart, mdiPencil, mdiTrashCanOutline, mdiCarSide } from "@mdi/js";

function ItemCard({ item, setShowItemForm, setShowConfirmDeleteDialog, setShowConfirmOrderDialog }) {

  return (
    
        <Card style={componentStyle()}>
          <Icon path={mdiCarSide} size={4} />
            <Card.Body>
              <Card.Title> {item.name}</Card.Title>
                <Card.Text>
                  <p>cena: {item.price + " €"}</p>
                  <p>Na skladě: {item.quantity}</p>
                </Card.Text>
                <Button onClick={() => setShowConfirmOrderDialog(item)} size={"sm"}>
                  <Icon path={mdiCart} size={0.7} />
                </Button>
                <Button onClick={() => setShowItemForm(item)} size={"sm"}>
                  <Icon path={mdiPencil} size={0.7} />
                </Button>
                <Button
                  onClick={() => setShowConfirmDeleteDialog(item)}
                  size={"sm"}
                  variant="danger"
                >
                  <Icon path={mdiTrashCanOutline} size={0.7} />
                </Button>
            </Card.Body>
        </Card>
  );
}

function componentStyle() {
  return {
    margin: "5px",
    padding: "5px",
    display: "flex 100px"
  };
}

export default ItemCard;
