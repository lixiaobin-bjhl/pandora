<template>
    <div id="sidebar">
        <div class="menu">
            <ul>
                <li
                    v-for="item, index in options"
                    :class="{'active': currentPath.indexOf(item.url) > -1}"
                    :key="index"
                    v-if="$root.hasAuth(item.auth)"
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
    computed: {
        currentPath () {
            return this.$store.state.currentPath || window.location.hash.slice(3);
        }
    },
    data() {
        return {
            options: [
                {
                    text: "校区管理",
                    url: "/campus",
                    auth: 3,
                    icon: 'campus'
                },
                {
                    text: "教室管理",
                    auth: 3,
                    url: "/classroom",
                    icon: 'classroom'
                },
                {
                    text: "课程管理",
                    auth: [1, 3],
                    url: "/course",
                    icon: "course"
                },
                {
                    text: "账号管理",
                    url: "/account",
                    auth: 3,
                    icon: "account"
                },
                {
                    text: "教师管理",
                    url: "/teacher",
                    auth: 3,
                    icon: "teacher"
                },
                {
                    text: "报装管理",
                    url: "/equipment",
                    auth: [1, 3],
                    icon: 'equipment'
                },
                {
                    text: "排课管理",
                    url: "/arrangement",
                    auth: 3,
                    icon: 'arrangement' 
                },
                {
                    text: "课表",
                    auth: 3,                   
                    url: "/timetable",
                    icon: 'timetable' 
                }
            ]
        }
    },
    methods: {
        /**
         * 前往对应模块
         */
        forward(item) {
            let url = item.url;
            if (this.$router.push) {
                this.$router.push(url);
            }
        }
    }
};
</script>