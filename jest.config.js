export default {
    transformIgnorePatterns: ["/node_modules/(?!(foo|bar)/)", "/bar/"],
    setupFilesAfterEnv: ["@alex_neo/jest-expect-message"],
};
