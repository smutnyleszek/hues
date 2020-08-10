export const spaces: Map<TSpace, ISpaceDefinition> = new Map([
  [
    "hex",
    {
      parts: [
        {
          before: "#",
          partName: "red",
          partType: "hexadecimal",
          range: [0, 255],
        },
        {
          partName: "green",
          partType: "hexadecimal",
          range: [0, 255],
        },
        {
          partName: "blue",
          partType: "hexadecimal",
          range: [0, 255],
        },
      ],
    },
  ],
  [
    "rgb",
    {
      parts: [
        {
          after: ", ",
          before: "rgb(",
          partName: "red",
          partType: "integer",
          range: [0, 255],
        },
        {
          after: ", ",
          partName: "green",
          partType: "integer",
          range: [0, 255],
        },
        {
          after: ")",
          partName: "blue",
          partType: "integer",
          range: [0, 255],
        },
      ],
    },
  ],
  [
    "hsl",
    {
      parts: [
        {
          after: ", ",
          before: "hsl(",
          partName: "hue",
          partType: "integer",
          range: [0, 360],
        },
        {
          after: "%, ",
          partName: "saturation",
          partType: "integer",
          range: [0, 100],
        },
        {
          after: "%)",
          partName: "lightness",
          partType: "integer",
          range: [0, 100],
        },
      ],
    },
  ],
  [
    "hwb",
    {
      parts: [
        {
          after: ", ",
          before: "hwb(",
          partName: "hue",
          partType: "integer",
          range: [0, 360],
        },
        {
          after: "%, ",
          partName: "whiteness",
          partType: "integer",
          range: [0, 100],
        },
        {
          after: "%)",
          partName: "blackness",
          partType: "integer",
          range: [0, 100],
        },
      ],
    },
  ],
]);
