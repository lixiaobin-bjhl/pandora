<template>
    <div id="sidebar">
        <div class="menu">
            <ul>
                <li
                    v-for="item, index in options"
                    :class="{'active': setActiveTab(item.url)}"
                    :key="index"
                    @click="forward(item)">
                    <icon 
                    :name="(item.icon || 'account')"
                    style="color: #fff"
                    scale="2"></icon>
                    <span>{{ item.text }}</span>
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
                    text: "校区管理",
                    url: "/campus",
                    icon: 'campus'
                },
                {
                    text: "教室管理",
                    url: "/classroom",
                    icon: 'classroom'
                },
                {
                    text: "课程管理",
                    url: "/course",
                    icon: "course"
                },
                {
                    text: "账号管理",
                    url: "/account",
                    icon: "account"
                },
                {
                    text: "教师管理",
                    url: "/teacher",
                    icon: "teacher"
                },
                {
                    text: "报装管理",
                    url: "/equipment",
                    icon: 'equipment'
                },
                {
                    text: "排课管理",
                    url: "/arrangement",
                    icon: 'arrangement' 
                },
                {
                    text: "课表",
                    url: "/timetable",
                    icon: 'timetable' 
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