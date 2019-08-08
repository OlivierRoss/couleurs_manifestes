const presets = [
  [
    "env",
    {
      targets: {
        edge: "14",
        firefox: "39",
        chrome: "42",
        safari: "9"
      },
      useBuiltIns: "usage"
    },
  ],
];

module.exports = { presets };
