const presets = [
  [
    "env",
    {
      targets: {
        edge: "14",
        firefox: "39",
        chrome: "42",
        safari: "10.1"
      },
      useBuiltIns: "usage"
    },
  ],
];

module.exports = { presets };
