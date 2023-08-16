import { act, fireEvent, render, screen } from "@testing-library/react";
import { MainButton } from "@ui/main-button/main-button";
// import { MainInput } from "@ui/main-input/main-input";
// import { ChangeEvent } from "react";
import { DialogWindow } from "@ui/dialog-window/dialog-window";

test("Test UI:MainButton", async () => {
  let clicked = false;
  const onClick = () => {
    clicked = !clicked;
  };
  await act(() => {
    render(<MainButton onClick={onClick}>TEST</MainButton>);
  });
  fireEvent.click(screen.queryByText("TEST")!);
  expect(clicked).toEqual(true);
});

// test("Test UI:MainInput", async () => {
//   let result;
//   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
//     result = e.target.value;
//   };
//   await act(() => {
//     render(<MainInput data-testid="test" onChange={onChange} />);
//   });
//   const input = screen.getByTestId("test");
//   fireEvent.change(input, { target: { value: "hello" } });
//   expect(result).toBe("hello");
// });

test("Test UI:DialogWindow", async () => {
  await act(() => {
    render(<DialogWindow>Hello from DialogWindow</DialogWindow>);
  });
  expect(screen.getByText("Hello from DialogWindow")).toBeDefined();
});
