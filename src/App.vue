<template>
    <div>
        <!-- ROUTER VIEW -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$Progress.finish();
        this.getAnnouncement();
    },
    created() {
        this.$Progress.start();

        this.$router.beforeEach((to, from, next) => {
            if (to.meta.progress !== undefined) {
                let meta = to.meta.progress;
                this.$Progress.parseMeta(meta);
            }
            this.$Progress.start();
            next();
        });

        this.$router.afterEach((to, from) => {
            this.$Progress.finish();
        });
    },
    methods: {
        getAnnouncement() {
          
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/sass/app.scss";
</style>