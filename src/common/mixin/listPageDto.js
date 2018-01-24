
import getPageDto from '../function/getPageDto';

export default {
    data () {
        return {
            pageInfo: getPageDto()
        };
    },
    methods: {
        /**
         * 刷新列表 
         */
        refresh () {
            this.pageInfo.pageNum = 1;
            this.fetchList();
        },
        /**
         * 翻页
         */
        changePage (pageNum) {
            this.pageInfo.pageNum = pageNum;
            this.fetchList();
        },

        /**
         * 改变页面条数
         */
        changeSize (pageSize) {
            this.pageInfo.pageSize = pageSize;

            if (this.pageInfo.pageNum == 1) {
                this.fetchList();
            }
            else {
                this.pageInfo.pageNum = 1;
            }
        }
    }
};