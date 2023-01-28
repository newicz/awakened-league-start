export default {
    builds: new Array<Build>,
    activeBuild: new Object,

    setBuilds(builds: Array<Build>) {
        this.builds = builds
    },

    setActiveBuild(build: Build) {
        this.activeBuild = build
    }
}