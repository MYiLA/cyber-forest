import { act, fireEvent, render, screen } from "@testing-library/react";
import { MainButton } from "@ui/main-button/main-button";
import { MainInput } from "@ui/main-input/main-input";
import { ChangeEvent } from "react";
import { DialogWindow } from "@ui/dialog-window/dialog-window";
import { Provider } from "react-redux";
import { store } from "./test-store";

// @ts-ignore
document.getElementById = () => ({
  textContent: null,
  id: "id",
});

test("Test UI:MainButton", async () => {
  let clicked = false;
  const onClick = () => {
    clicked = !clicked;
  };
  await act(async () => {
    render(<MainButton onClick={onClick}>TEST</MainButton>);
  });
  fireEvent.click(screen.queryByText("TEST")!);
  expect(clicked).toEqual(true);
});

test("Test UI:MainInput", async () => {
  let result;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    result = e.target.value;
  };
  await act(async () => {
    render(
      <Provider store={store}>
        <MainInput data-testid="test" onChange={onChange} />
      </Provider>
    );
  });
  const input = screen.getByTestId("test");
  fireEvent.change(input, { target: { value: "Hello" } });
  expect(result).toBe("Hello");
});

test("Test UI:DialogWindow", async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <DialogWindow>Hello from DialogWindow</DialogWindow>
      </Provider>
    );
  });
  expect(screen.getByText("Hello from DialogWindow")).toBeDefined();
});
