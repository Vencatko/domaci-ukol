import { useContext, useState } from "react";
import { ItemListContext } from "./ItemListContext.js";

import Button from "react-bootstrap/esm/Button.js";
import Row from "react-bootstrap/Row";

import ItemCard from "./ItemCard.js";
import ItemForm from "./ItemForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function ItemList() {
  const { itemList } = useContext(ItemListContext);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const filteredItemList = itemList;

  return (
    <Container>
      <div style={{ display: "block", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowItemForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
          položka
        </Button>
        <Button variant="success" disabled>
          <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} />{" "}
          Nové položky
        </Button>
      </div>
      {!!showItemForm ? (
        <ItemForm item={showItemForm} setShowItemForm={setShowItemForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          item={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
        ) : null}
      <Row md={5}>
      {filteredItemList.map((item) => {
        return (
          <ItemCard
            key={item.id}
            item={item}
            setShowItemForm={setShowItemForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
      </Row>
    </Container>
  );
}

export default ItemList;
