import { Modal } from "@ui/modal";
import { FC, useState } from "react";
import { GuideBlock } from "./guide-block";
import { GuideProvider } from "./context";
import { Guides } from "./guides";
import styles from "./guide.module.scss";

type Props = {
  OpenComponent?: FC<{ onClick: () => void }>;
};

export function Guide({ OpenComponent }: Props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const component = OpenComponent ? (
    <OpenComponent onClick={handleOpen} />
  ) : (
    <button className={styles.how_to_play_button} onClick={handleOpen}>
      Как играть?
    </button>
  );

  return (
    <>
      {component}
      <Modal open={open} closeDelay={300} onClose={handleClose}>
        <GuideProvider>
          <GuideBlock open={open}>
            <Guides />
          </GuideBlock>
        </GuideProvider>
      </Modal>
    </>
  );
}
