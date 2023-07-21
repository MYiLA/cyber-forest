import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import PageGame from "@pages/page-game/page-game";
import { store } from "./test-store";

window.alert = () => null;
window.console.log = () => null;

// @ts-ignore
document.getElementById = () => ({
  textContent: null,
  id: "id",
});

describe("Test Game engine", () => {
  beforeEach(async () => {
    await act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PageGame />
          </BrowserRouter>
        </Provider>
      );
    });
  });

  test("Controls", () => {
    expect(screen.getByText("Киберлес")).toBeDefined();
    expect(screen.getByText("Хроника")).toBeDefined();
    expect(screen.getByText("Инвентарь")).toBeDefined();
    expect(screen.getByText("Чат")).toBeDefined();
    expect(screen.getByText("Гайд")).toBeDefined();
    expect(screen.getByText("Готово")).toBeDefined();
    expect(screen.getByText("Сдаться")).toBeDefined();
  });

  test("Current player", () => {
    expect(store.getState().game.currentPlayerType).toBe("Red");
  });

  test("Move", () => {
    const stockPrev = store.getState().players.Red!.Stock.length;
    fireEvent.click(screen.getByTestId("dice-test-1"));
    fireEvent.click(screen.getByTestId("dice-test-2"));
    const stockNext = store.getState().players.Red!.Stock.length;
    expect(stockNext).toBeLessThan(stockPrev);
  });

  test("Next player", () => {
    fireEvent.click(screen.getByTestId("ready"));
    expect(store.getState().game.currentPlayerType).toBe("Blue");
  });

  test("Loose", () => {
    fireEvent.click(screen.getByTestId("loose"));
    expect(screen.getByText("Вы проиграли")).toBeDefined();
  });
});
