import { describe, expect, it } from "vitest";
import { classed, getVariantConfig } from "../src/classed";

it("Should apply compound variants", () => {
  const button = classed("button", {
    base: "bg-blue-500",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
      color: {
        red: "text-red-500",
        blue: "text-blue-500",
        green: "text-green-500",
      },
    },
    compoundVariants: [
      {
        size: "lg",
        color: "red",
        className: "bg-red-500",
      },
    ],
  });

  expect(button({ size: "lg", color: "red" })).toContain("bg-red-500");

  expect(button({ size: "lg", color: "blue" })).not.toContain("bg-red-500");
});

it("Should apply compound variants with default variants", () => {
  const button = classed("button", {
    base: "bg-blue-500",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
      color: {
        red: "text-red-500",
        blue: "text-blue-500",
        green: "text-green-500",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "red",
    },
    compoundVariants: [
      {
        size: "lg",
        color: "red",
        className: "bg-red-500",
      },
    ],
  });

  expect(button()).toContain("bg-red-500");

  const result = button({ size: "lg", color: "blue" });
  expect(result).not.toContain("bg-red-500");
});

it("Should apply compound variants with default variants and custom variants", () => {
  const button = classed("button", {
    base: "bg-blue-500",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
      color: {
        red: "text-red-500",
        blue: "text-blue-500",
        green: "text-green-500",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "red",
    },
    compoundVariants: [
      {
        size: "lg",
        color: "red",
        className: "bg-red-500",
      },
      {
        size: "sm",
        color: "blue",
        className: "bg-blue-500",
      },
    ],
  });

  expect(button({ size: "md" })).not.toContain("bg-red-500");

  expect(button({ size: "sm", color: "blue" })).toContain("bg-blue-500");
});

it("Should work with array compound variants", () => {
  const button = classed("button", {
    base: "bg-blue-500",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
      color: {
        red: "text-red-500",
        blue: "text-blue-500",
        green: "text-green-500",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "red",
    },
    compoundVariants: [
      {
        size: "lg",
        color: ["red", "blue"],
        className: "MATCH",
      },
    ],
  });

  expect(button({ size: "lg", color: "blue" })).toContain("MATCH");
});

it("Should work with array compound variants with default variants", () => {
  const button = classed("button", {
    base: "bg-blue-500",
    variants: {
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
      color: {
        red: "text-red-500",
        blue: "text-blue-500",
        green: "text-green-500",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "red",
    },
    compoundVariants: [
      {
        size: "lg",
        color: ["red", "blue"],
        className: "MATCH",
      },
    ],
  });

  expect(button()).toContain("MATCH");
});

describe("getVariants()", () => {
  it("Should return variants", () => {
    const button = classed("button", {
      base: "bg-blue-500",
      variants: {
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
        },
        color: {
          red: "text-red-500",
          blue: "text-blue-500",
          green: "text-green-500",
        },
      },
      defaultVariants: {
        size: "lg",
        color: "red",
      },
      compoundVariants: [
        {
          size: "lg",
          color: ["red", "blue"],
          className: "MATCH",
        },
      ],
    });

    const variants = getVariantConfig(button);

    expect(variants).toMatchObject({
      className: "button bg-blue-500",
      variants: {
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
        },
        color: {
          red: "text-red-500",
          blue: "text-blue-500",
          green: "text-green-500",
        },
      },
      defaultVariants: {
        size: "lg",
        color: "red",
      },
      compoundVariants: [
        {
          size: "lg",
          color: ["red", "blue"],
          className: "MATCH",
        },
      ],
    });

    expect(variants.variants.color.red).toBe("text-red-500");
  });
});
