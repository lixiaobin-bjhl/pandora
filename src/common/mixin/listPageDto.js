
import getPageDto from '../function/getPageDto';

export default {
    data () {
        return {
            pageDto: getPageDto()
        };
    },
    methods: {
        /**
         * 翻页
         */
        changePage (pageNum) {
            this.pageDto.pageNum = pageNum;
            this.fetchList();
        },

        /**
         * 改变页面条数
         */
        changeSize (pageSize) {
            this.pageDto.pageSize = pageSize;

            if (this.pageDto.pageNum == 1) {
                this.fetchList();
            }
            else {
                this.pageDto.pageNum = 1;
            }
        }
    }
};