import { cleanup, render, screen } from "@solidjs/testing-library";
import { Component } from "solid-js";
import { classed } from "../src";
import { expect, it } from "vitest";

it("Should inherit classNames from Classed Component in creator fn", () => {
  const A = classed(
    "div",
    "bg-radix-blue3 text-radix-blue11 py-2 px-2 rounded-sm"
  );

  const B = classed("a", A, {
    variants: {
      color: {
        red: "!bg-radix-violet3 !text-radix-violet11",
      },
    },
  });

  render(() => <B color="red" data-testid="anchor" />);

  expect(screen.getByTestId("anchor")).toHaveClass("bg-radix-blue3");

  expect(screen.getByTestId("anchor")).toHaveClass("!bg-radix-violet3");

  expect(screen.getByTestId("anchor").tagName).toBe("A");
});

it("Should inherit variants from Classed Component in creator fn", () => {
  const A = classed("div", {
    variants: {
      color: {
        blue: "bg-blue-100",
      },
    },
  });

  const B = classed("a", A, {
    variants: {
      size: {
        sm: "text-sm",
        lg: "text-lg",
      },
    },
  });

  render(() => <B color="blue" size="lg" data-testid="anchor" />);

  expect(screen.getByTestId("anchor")).toHaveClass("bg-blue-100");

  expect(screen.getByTestId("anchor")).toHaveClass("text-lg");
});

it("Should inherit Variants from main arg", () => {
  const A = classed("a", {
    variants: {
      color: {
        blue: "bg-blue-100",
      },
    },
  });

  const B = classed(A, {
    variants: {
      size: {
        sm: "text-sm",
        lg: "text-lg",
      },
    },
  });

  render(() => <B color="blue" size="lg" data-testid="anchor" />);

  expect(screen.getByTestId("anchor")).toHaveClass("bg-blue-100");

  expect(screen.getByTestId("anchor")).toHaveClass("text-lg");
});

it("Should respect the as prop", () => {
  const A = classed("a", {
    variants: {
      color: {
        blue: "bg-blue-100",
      },
    },
  });

  const B = classed(A, {
    variants: {
      size: {
        sm: "text-sm",
        lg: "text-lg",
      },
    },
  });

  render(() => <B color="blue" size="lg" as="div" data-testid="anchor" />);

  expect(screen.getByTestId("anchor")).toHaveClass("bg-blue-100");

  expect(screen.getByTestId("anchor")).toHaveClass("text-lg");

  expect(screen.getByTestId("anchor").tagName).toBe("DIV");
});

it("Should handle complex composition", () => {
  const A = classed("span", "text-red-500", {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
      },
    },
  });

  const B = classed(A, {
    variants: {
      color: {
        red: "text-red-500",
        blue: "text-blue-500",
      },
    },
    defaultVariants: {
      color: "red",
    },
  });

  const C = classed("button", "!text-white", {
    variants: {
      rounded: {
        sm: "rounded-sm",
      },
    },
    defaultVariants: {
      rounded: "sm",
    },
  });

  render(() => <B color="blue" size="sm" data-testid="b" />);

  expect(screen.getByTestId("b")).toHaveClass("text-blue-500");
  expect(screen.getByTestId("b").tagName).toBe("SPAN");

  cleanup();

  render(() => <B as={C} data-testid="c" />);
  expect(screen.getByTestId("c")).toHaveClass("text-red-500");
  expect(screen.getByTestId("c")).toHaveClass("rounded-sm");
  expect(screen.getByTestId("c").tagName).toBe("BUTTON");

  cleanup();

  render(() => <B as={C} color="blue" data-testid="d" />);
  expect(screen.getByTestId("d")).toHaveClass("text-blue-500");
  expect(screen.getByTestId("d")).toHaveClass("rounded-sm");
  expect(screen.getByTestId("d").tagName).toBe("BUTTON");
});

it("Should work with regular react component", () => {
  const Button = classed("button", "bg-red-500", {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
      },
    },
  });

  const Hello: Component<{ color?: any; children?: any }> = ({
    children,
    color,
    ...props
  }) => {
    return (
      <button style={{ color }} {...props}>
        {children}
      </button>
    );
  };

  const HelloButton = classed(Hello, Button);

  render(() => (
    <HelloButton color="red" size="sm" data-testid="hello-button" />
  ));

  expect(screen.getByTestId("hello-button")).toHaveClass("bg-red-500");
  expect(screen.getByTestId("hello-button")).toHaveClass("text-sm");

  render(() => (
    <Button as={Hello} color="red" size="sm" data-testid="hello-button1" />
  ));

  expect(screen.getByTestId("hello-button1")).toHaveClass("bg-red-500");
  expect(screen.getByTestId("hello-button1")).toHaveClass("text-sm");
});
