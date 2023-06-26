# Modal

Описание: Компонент Modal, вдохновлен [Mui](https://mui.com/material-ui/react-modal/)

#### Пример использования
```tsx
import { Modal } from '@ui/modal'

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Open modal</button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div>
          <p>
            Text in a modal
          </p>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>
    </div>
  );
}
```
