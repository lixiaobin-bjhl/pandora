<template>
    <div id="sidebar">
        <div class="menu">
            <ul>
                <li
                    v-for="item, index in options"
                    :class="{'active': setActiveTab(item.url)}"
                    :key="index"
                    @click="forward(item)">
                    <i :class="item.name"></i><span>{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentTab: window.location.hash.slice(3),
            options: [
                {
                    text: "课程管理",
                    url: "course"
                },
                {
                    text: "账号管理",
                    url: "account"
                },
                {
                    text: "教师管理",
                    url: "teacher"
                },
                {
                    text: "报装管理",
                    url: "equipment"
                },
                {
                    text: "排课管理",
                    url: "timetable"
                }
            ]
        }
    },
    methods: {
        /**
         * 标注当前tab
         */
        setActiveTab(url) {
            return url.indexOf(this.currentTab) > -1;
        },
        /**
         * 前往对应模块
         */
        forward(item) {
            let url = item.url;
            this.currentTab = url;
            if (this.$router.push) {
                this.$router.push(url);
            }
        }
    }
};
</script>