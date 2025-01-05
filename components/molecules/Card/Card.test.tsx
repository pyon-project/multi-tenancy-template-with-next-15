import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card Component", () => {
  it("renders the title, text, and call to action", () => {
    const mockCallToAction = <button>Click Me</button>;

    render(
      <Card
        imageUrl="https://picsum.photos/500/500"
        title="Test Title"
        text="Test Text"
        alt="Test Alt"
        callToAction={mockCallToAction}
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();

    expect(screen.getByText("Test Text")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Click Me" }),
    ).toBeInTheDocument();
  });

  it("renders the image when imageUrl and alt are provided", () => {
    render(
      <Card
        imageUrl="https://picsum.photos/500/500"
        alt="Test Alt"
        callToAction={<button>Click Me</button>}
      />,
    );

    const image = screen.getByAltText("Test Alt");
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(
        encodeURIComponent("https://picsum.photos/500/500"),
      ),
    );
  });
});
